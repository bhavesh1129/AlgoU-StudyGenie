import { useState } from "react";
import axios from "axios";
import Loader from "./components/Loader";
import SummaryResult from "./components/SummaryResult";

function App() {
  // State management for form inputs and results
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /**
   * Handles form submission
   * Sends either PDF file or text to backend for summarization
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");
    setError("");

    try {
      // Prepare form data with either file or text
      const formData = new FormData();
      if (file) {
        formData.append("file", file);
      } else {
        formData.append("text", text);
      }

      // Send request to backend API
      const res = await axios.post("http://localhost:5001/api/summarize", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Display the summary
      setSummary(res.data.summary);
    } catch (error) {
      // Show error message to user
      const errorMessage = error.response?.data?.error || error.message || "Something went wrong while summarizing!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="bg-white/80 shadow-xl rounded-2xl p-8 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
          📄 AlgoU StudyGenie
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Upload a PDF or paste your notes to get an instant AI-powered summary ✨
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            className="block w-full text-sm text-gray-600 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none p-2"
          />

          <p className="text-center text-gray-500">— or —</p>

          <textarea
            placeholder="Paste your text here..."
            rows="6"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Summarizing..." : "Generate Summary"}
          </button>
        </form>

        {loading && <Loader />}

        {error && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 text-sm font-semibold">Error:</p>
            <p className="text-red-600 text-sm mt-1">{error}</p>
          </div>
        )}

        {summary && <SummaryResult summary={summary} />}
      </div>
    </div>
  );
}

export default App;
