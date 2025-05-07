import { useState } from 'react';
import './index.css';

function App() {
  const [grade, setGrade] = useState('');
  const [outcome, setOutcome] = useState('');
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setOutput('');
    const res = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ grade, outcome })
    });
    const data = await res.json();
    setOutput(data.result);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-4">🎵 The Rhyme Roadmap</h1>
      <p className="mb-6 text-center max-w-xl text-gray-700">
        Turn your academic learning into powerful, meaningful song concepts. Start by entering your grade level and learning outcome!
      </p>
      <div className="flex flex-col gap-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Grade Level (e.g., 9th grade)"
          className="p-2 border rounded"
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
        <input
          type="text"
          placeholder="Learning Outcome (e.g., explain the causes of WWII)"
          className="p-2 border rounded"
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
        />
        <button
          onClick={handleGenerate}
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          {loading ? 'Generating...' : 'Generate Roadmap'}
        </button>
        {output && (
          <div className="bg-white border rounded p-4 mt-4 whitespace-pre-wrap">
            {output}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
