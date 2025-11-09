import { useState } from "react";
import Markdown from "react-markdown";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSummary("");

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else if (text.trim()) {
      formData.append("text", text);
    } else {
      alert("Please upload a file or paste text.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/summarizer", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSummary(response.data.summary);
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-100 via-white to-pink-100 p-6">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-2xl border border-gray-100 transition-transform duration-300 hover:scale-[1.01]">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-2 tracking-tight">
          AlgoU StudyGenie 🧞‍♂️
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Upload a PDF or paste text below — get a concise, AI-generated summary ✨
        </p>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="file-upload"
              className="cursor-pointer bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-600 font-medium py-3 px-6 rounded-lg transition-all duration-200 shadow-sm"
            >
              {file ? file.name : "Choose PDF File"}
            </label>
            <input
              id="file-upload"
              type="file"
              accept="application/pdf"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          {/* OR Divider */}
          <div className="relative flex items-center justify-center">
            <span className="text-gray-400 font-medium bg-white px-3 z-10">OR</span>
            <div className="absolute w-full h-[1px] bg-gray-200"></div>
          </div>

          {/* Textarea */}
          <textarea
            placeholder="Paste your text here..."
            className="w-full border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 rounded-xl p-4 text-gray-700 placeholder-gray-400 transition-all duration-200 resize-none"
            rows="8"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full font-semibold py-3 rounded-xl shadow-md transition-all duration-200 
              ${loading
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                Generating...
              </div>
            ) : (
              "Generate Summary"
            )}
          </button>
        </form>

        {/* Summary Section */}
        {summary && (
          <div className="mt-8 bg-linear-to-br from-indigo-50 to-white border border-indigo-100 rounded-xl p-6 shadow-inner animate-fadeIn">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-3">📘 Summary</h2>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <Markdown>{summary}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
