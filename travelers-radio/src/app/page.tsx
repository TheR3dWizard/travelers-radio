// app/page.js (Next.js 13+ with App Router) 
// or pages/index.js (Next.js with Pages Router)

export default function Home() {
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

          <audio
            controls
            src="http://13.91.248.254:8000/mystream"
            className="block mx-auto w-full max-w-md my-5"
          />

          <dl className="my-5 p-3 bg-pink-200 rounded-md">
            <dt className="font-bold text-pink-900">Current Instruments:</dt>
            <dd className="ml-5 text-base"><strong>Piano</strong></dd>
            <dd className="ml-5 text-base"><strong>Drums</strong></dd>
            <dd className="ml-5 text-base"><strong>Electric Guitar</strong></dd>
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
