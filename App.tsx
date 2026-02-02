
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import Dashboard from './components/Dashboard';
import Loader from './components/Loader';
import { parseAndAnalyzeCSV } from './services/csvParserService';
import type { EquipmentData, SummaryStatistics } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<EquipmentData[] | null>(null);
  const [summary, setSummary] = useState<SummaryStatistics | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    setFileName(file.name);

    try {
      const result = await parseAndAnalyzeCSV(file);

      console.log("CSV RESULT:", result);

      if (!result?.data?.length || !result?.summary) {
        throw new Error("CSV parsed but returned empty data.");
      }

      setData(result.data);
      setSummary(result.summary);
    } catch (err) {
      console.error(err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to process CSV file"
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    setData(null);
    setSummary(null);
    setError(null);
    setFileName('');
  };

  return (
    <div className="min-h-screen bg-background text-text-primary font-sans">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {isLoading && <Loader />}

        {!isLoading && error && (
          <div className="text-center p-8 bg-red-900/50 border border-red-500 rounded-lg max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-red-300 mb-4">
              Error Processing File
            </h2>
            <p className="text-red-200">{error}</p>
            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2 bg-primary hover:bg-secondary text-white font-semibold rounded-lg shadow-md transition-colors duration-300"
            >
              Try Again
            </button>
          </div>
        )}

        {!isLoading && !error && data && summary && (
          <Dashboard
            data={data}
            summary={summary}
            fileName={fileName}
            onReset={handleReset}
          />
        )}

        {!isLoading && !error && (!data || !summary) && (
          <FileUpload onFileSelect={handleFileSelect} />
        )}
      </main>

      <footer className="text-center py-4 text-sm text-text-secondary">
        Built with React, TypeScript, and Tailwind CSS
      </footer>
    </div>
  );
};

export default App;
