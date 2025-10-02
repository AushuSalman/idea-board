import Link from "next/link";
import { Lightbulb, Users, Zap } from "lucide-react"; // icons

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-400 text-white flex flex-col">
      {/* Hero Section */}
      <header className="flex-1 flex flex-col items-center justify-center text-center px-6 py-6">
        <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg">
          🚀 Welcome to <span className="text-yellow-300">Idea Board</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl text-indigo-100">
          A place where your thoughts spark innovation. Share quick ideas,
          upvote the best, and see creativity thrive — no login, no fuss.
        </p>
        <Link href="/app">
          <span className="mt-8 inline-block px-8 py-3 bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold rounded-full shadow-lg hover:scale-105 transform transition-all cursor-pointer">
            Start Sharing Ideas →
          </span>
        </Link>
      </header>

      {/* Features Section */}
      <section className="m-[15px] bg-white/20 backdrop-blur-lg p-10 grid gap-8 md:grid-cols-3 text-black">
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <Lightbulb className="w-10 h-10 text-indigo-600 mb-4" />
          <h3 className="text-xl font-bold">Quick Ideas</h3>
          <p className="mt-2 text-gray-600">
            Share your spark in under 280 characters.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <Users className="w-10 h-10 text-pink-600 mb-4" />
          <h3 className="text-xl font-bold">Anonymous & Simple</h3>
          <p className="mt-2 text-gray-600">
            No login needed. Just your thoughts, fast and free.
          </p>
        </div>
        <div className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all">
          <Zap className="w-10 h-10 text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold">Upvote the Best</h3>
          <p className="mt-2 text-gray-600">
            Boost great ideas to the top with one click.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-sm text-indigo-100">
        ✨ Built with Next.js, Tailwind, and a spark of imagination
      </footer>
    </div>
  );
}
