import random
import subprocess
import time
import os
import dotenv
import threading
import flask

dotenv.load_dotenv()
source_password = os.getenv("ICECAST_SOURCE_PASSWORD")
vm_public_ip = os.getenv("VM_PUBLIC_IP")

fifo_path = "/tmp/stream.fifo"
if not os.path.exists(fifo_path):
    os.mkfifo(fifo_path)

stems = ["Banjo.mp3", "Flute.mp3", "Drums.mp3", "Harmonica.mp3", "Whistling.mp3"]

# Shared state
current_stems = []
lock = threading.Lock()

def song_pipe():
    ffmpeg_cmd = [
        "ffmpeg",
        "-re",
        "-i", fifo_path,
        "-c:a", "libmp3lame",
        "-b:a", "192k",
        "-f", "mp3",
        f"icecast://source:{source_password}@{vm_public_ip}:8000/mystream"
    ]
    ffmpeg_proc = subprocess.Popen(ffmpeg_cmd)

    with open(fifo_path, "wb") as fifo:
        while True:
            selected_stems = random.sample(stems, k=random.randint(2, 3))
            
            # Save metadata
            with lock:
                current_stems=selected_stems

            mix_cmd = ["ffmpeg", "-y", "-hide_banner", "-loglevel", "error"]
            for stem in selected_stems:
                mix_cmd += ["-i", stem]

            filter_complex = ""
            for i in range(len(selected_stems)):
                filter_complex += f"[{i}:a]volume=0.7[a{i}];"
            amix_inputs = "".join(f"[a{i}]" for i in range(len(selected_stems)))
            filter_complex += f"{amix_inputs}amix=inputs={len(selected_stems)}:duration=shortest[aout]"

            mix_cmd += [
                "-filter_complex", filter_complex,
                "-map", "[aout]",
                "-f", "mp3",
                "pipe:1"
            ]

            proc = subprocess.Popen(mix_cmd, stdout=fifo)
            proc.wait()

            time.sleep(random.uniform(1, 3))

app = flask.Flask(__name__)

@app.route("/")
def home():
    return "Welcome to the Audio Server"

@app.route("/current_stems", methods=["GET"])
def get_current_stems():
    with lock:
        return {
            "status": "running",
            "current_stems": current_stems
        }

if __name__ == "__main__":
    threading.Thread(target=song_pipe, daemon=True).start()
    app.run(host="0.0.0.0", port=5000)
