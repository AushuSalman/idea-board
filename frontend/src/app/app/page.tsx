"use client";
import { useEffect, useState } from "react";
import { MoreVertical, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

// Detect API dynamically based on window.location
let API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

if (typeof window !== "undefined") {
  const hostname = window.location.hostname; // e.g. "localhost" or "192.168.1.50"
  API = `http://${hostname}:4000`;
}


interface Idea {
  id: number;
  text: string;
  upvotes: number;
  createdAt: string;
}

function IdeaCard({
  idea,
  onUpvote,
  onDelete,
}: {
  idea: Idea;
  onUpvote: (id: number) => void;
  onDelete: (id: number) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative bg-gray-900/80 backdrop-blur-lg p-5 rounded-xl shadow-lg border border-gray-700 hover:border-indigo-500 transition-all duration-300">
      <p className="text-gray-100 text-lg leading-relaxed">{idea.text}</p>

      {/* 3 dots menu */}
      <div className="absolute top-3 right-3">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-gray-400 hover:text-white"
        >
          <MoreVertical className="w-5 h-5" />
        </button>

        {menuOpen && (
          <div className="absolute right-0 mt-2 w-28 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-10">
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this idea?")) {
                  onDelete(idea.id);
                }
                setMenuOpen(false);
              }}
              className="flex items-center gap-2 px-3 py-2 text-red-400 hover:bg-gray-700 w-full text-sm"
            >
              <Trash2 className="w-4 h-4" /> Delete
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <small className="text-gray-400">
          {new Date(idea.createdAt).toLocaleString()}
        </small>
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-medium shadow hover:scale-105 transform transition-all"
            onClick={() => onUpvote(idea.id)}
          >
            ⚡ Upvote
          </button>
          <span className="font-bold text-cyan-400">{idea.upvotes}</span>
        </div>
      </div>
    </div>
  );
}

export default function AppPage() {
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchIdeas = async () => {
    const res = await fetch(`${API}/ideas`);
    const data = await res.json();
    setIdeas(data);
  };

  useEffect(() => {
    fetchIdeas();
    const interval = setInterval(fetchIdeas, 5000); // Auto-refresh
    return () => clearInterval(interval);
  }, []);

  const submitIdea = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || text.length > 280) {
      toast.error("❌ Idea must be 1–280 characters");
      return;
    }
    setLoading(true);
    await fetch(`${API}/ideas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text }),
    });
    setText("");
    await fetchIdeas();
    toast.success("✅ Idea Posted!");
    setLoading(false);
  };

  const upvote = async (id: number) => {
    await fetch(`${API}/ideas/${id}/upvote`, { method: "PATCH" });
    setIdeas((prev) =>
      prev.map((i) => (i.id === id ? { ...i, upvotes: i.upvotes + 1 } : i))
    );
    toast("⚡ Upvoted!", { icon: "👍" });
  };

  const deleteIdea = async (id: number) => {
    await fetch(`${API}/ideas/${id}`, { method: "DELETE" });
    await fetchIdeas();
    toast.success("🗑️ Idea Deleted!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 p-6 text-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8">💡 The Idea Board</h1>

        <form
          onSubmit={submitIdea}
          className="mb-10 bg-gray-900/90 p-6 rounded-xl shadow-lg border border-gray-700"
        >
          <textarea
            maxLength={280}
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="✨ Drop your genius idea here..."
            className="w-full p-4 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 text-gray-100 placeholder-gray-500 resize-none"
            rows={3}
          />
          <div className="flex items-center justify-between mt-3">
            <small className="text-sm text-gray-400">{text.length}/280</small>
            <button
              type="submit"
              className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-white font-semibold shadow hover:scale-105 transform transition-all"
              disabled={loading}
            >
              {loading ? "Posting..." : "🚀 Post Idea"}
            </button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ideas.map((idea) => (
            <IdeaCard
              key={idea.id}
              idea={idea}
              onUpvote={upvote}
              onDelete={deleteIdea}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
