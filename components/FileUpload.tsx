
import React, { useState, useCallback } from 'react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      if (e.dataTransfer.files[0].type === 'text/csv' || e.dataTransfer.files[0].name.endsWith('.csv')) {
        onFileSelect(e.dataTransfer.files[0]);
      } else {
        alert("Please upload a valid .csv file.");
      }
    }
  }, [onFileSelect]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto text-center">
      <div 
        onDragEnter={handleDrag}
        onDragOver={handleDrag}
        onDragLeave={handleDrag}
        onDrop={handleDrop}
        className={`p-10 border-2 border-dashed rounded-xl transition-colors duration-300 ${isDragging ? 'border-accent bg-card/50' : 'border-gray-600 hover:border-gray-500'}`}
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          accept=".csv"
          onChange={handleChange}
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="flex flex-col items-center">
             <svg className="w-16 h-16 mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
            <p className="mb-2 text-lg font-semibold text-text-secondary">
              <span className="text-secondary font-bold">Click to upload</span> or drag and drop
            </p>
            <p className="text-sm text-gray-500">CSV file required</p>
          </div>
        </label>
      </div>
       <div className="mt-6 text-center">
          <p className="text-text-secondary">
              Don't have a file?{' '}
              <a
                  href="/sample_data.csv"
                  download="sample_data.csv"
                  className="font-semibold text-secondary hover:text-accent transition-colors duration-200"
              >
                  Download a sample CSV
              </a>
              .
          </p>
      </div>
    </div>
  );
};

export default FileUpload;
