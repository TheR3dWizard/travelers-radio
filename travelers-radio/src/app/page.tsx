// app/page.js (Next.js 13+ with App Router) 
// or pages/index.js (Next.js with Pages Router)
"use client";

import {useEffect, useState} from 'react';

export default function Home() {

  const [Instruments, setInstruments] = useState<string[]>([]);

  useEffect(()=> {
    async function fetchInstruments(){
      try{
        const res = await fetch("http://13.91.248.254:5000/current_stems");
        const data = await res.json();
        setInstruments(data.current_stems);
      }catch(err){
        console.error("Error fetching instruments:", err);
      }
    }
    fetchInstruments();
    const interval = setInterval(fetchInstruments, 5000); // Fetch every 5 seconds
    return () => clearInterval(interval);
  }, [])

  return (
    <div className="min-h-screen flex justify-center items-center bg-cover bg-fixed bg-center p-5"
         style={{ backgroundImage: "url('/bg.png')" }}>
      <div className="bg-white rounded-lg shadow-md max-w-2xl w-full p-6">
        <h1 className="text-center text-4xl font-bold text-purple-800 mb-6">
          Travelers Radio
        </h1>

        <div className="flex flex-col gap-4">
          <h2 className="text-xl text-purple-700 text-center mb-4">
            Listen along to Travelers with everyone around the world
          </h2>

            <button
              onClick={() => {
              const audio = document.getElementById('travelers-audio') as HTMLAudioElement | null;
              if (audio) {
                if (audio.paused) {
                // Reset the stream to avoid lag
                audio.src = "http://13.91.248.254:8000/mystream";
                audio.load();
                audio.play();
                } else {
                audio.pause();
                }
              }
              }}
              className="block mx-auto w-16 h-16 rounded-full bg-purple-700 hover:bg-purple-800 text-white flex items-center justify-center text-2xl my-5 focus:outline-none"
              aria-label="Play/Pause"
            >
              {typeof window !== "undefined" && (document.getElementById('travelers-audio') as HTMLAudioElement | null)?.paused ? "▶" : "⏸"}
            </button>
            <audio
              id="travelers-audio"
              src="http://13.91.248.254:8000/mystream"
              style={{ display: 'none' }}
            />

          <dl className="my-5 p-3 bg-pink-200 rounded-md">
            <dt className="font-bold text-pink-900">Current Instruments:</dt>
            {Instruments.map((instrument, index) => (
              <dd key={index} className="ml-5 text-base">
                <strong>{instrument}</strong>
              </dd>
            ))}
          </dl>

          <h2 className="text-xl text-purple-700 text-center">
            <a href="/upload" className="text-yellow-600 hover:text-yellow-400 transition">
              Want to upload your cover?
            </a>
          </h2>

          <h2 className="text-xl text-purple-700 text-center">
            <a href="/contributors" className="text-yellow-600 hover:text-yellow-400 transition">
              See contributors
            </a>
          </h2>
        </div>

        <footer className="text-center mt-6 text-sm text-gray-600">
          Created by:{" "}
          <a
            href="https://github.com/TheR3dWizard"
            className="text-yellow-600 font-bold hover:text-yellow-400 transition"
          >
            Sreeraghavan R
          </a>
        </footer>
      </div>
    </div>
  );
}
