export default function SummaryResult({ summary }) {
    return (
        <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-indigo-700 mb-3">AI Summary:</h2>
            <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed">
                {summary}
            </pre>
        </div>
    );
}