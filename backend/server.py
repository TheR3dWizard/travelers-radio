from flask import Flask, Response, send_file
import threading

app = Flask(__name__)
global audio_data
audio_data = None

def generate_audio():
    global audio_data
    while True:
        with open("../assets/Travelers.mp3", "rb") as audio_file:
            data = audio_file.read(1024)
            while data:
                # print("Reading data") #WORKS
                audio_data = data
                data = audio_file.read(1024)


@app.route('/stream')
def stream_audio():
    def generate():
        while True:
            with open("../assets/Travelers.mp3", "rb") as audio_file:
                data = audio_file.read(1024)
                while data:
                    yield data
                    data = audio_file.read(1024)
    def generatelive():
        global audio_data
        while True:
            if audio_data:
                print("Sending data")
                print(audio_data)
                yield audio_data
    return Response(generatelive(), mimetype="audio/mpeg")

if __name__ == '__main__':
    thread = threading.Thread(target=generate_audio)
    thread.daemon = True
    thread.start()
    app.run(host='0.0.0.0', port=12345)