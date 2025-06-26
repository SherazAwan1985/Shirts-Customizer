// components/FileUploadBox.js
import React, { useState, useRef } from 'react';

const FileUploadBox = ({ onFileSelect, accept = 'image/*', label = 'Upload File' }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;

    setSelectedFile(file);
    setPreviewURL(URL.createObjectURL(file));
    onFileSelect && onFileSelect(file);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleDragOver = (e) => e.preventDefault();

  return (
    <div
      className="border-dashed border-2 h-full border-gray-400 rounded-md p-6 text-center cursor-pointer hover:border-blue-500 transition"
      onClick={() => fileInputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleFileChange}
        ref={fileInputRef}
        className="hidden"
      />

      {!previewURL ? (
        <div className="flex flex-col items-center h-full flex-center justify-center">
        <p className="text-sm text-gray-500">{label}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center h-full justify-center flex-center">
          <img
            src={previewURL}
            alt="Preview"
            className="w-32 h-32 object-cover rounded mb-2 border border-gray-300"
          />
          <p className="text-sm text-gray-700">{selectedFile?.name}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadBox;
