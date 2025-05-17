'use client';
import * as React from 'react';
import { Paperclip, Upload } from 'lucide-react';

const FileUploadComponent: React.FC = () => {
  const handleFileUploadButtonClick = () => {
    const el = document.createElement('input');
    el.setAttribute('type', 'file');
    el.setAttribute('accept', 'application/pdf');
    el.addEventListener('change', async (ev) => {
      if (el.files && el.files.length > 0) {
        const file = el.files.item(0);
        if (file) {
          const formData = new FormData();
          formData.append('pdf', file);

          await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          console.log('File uploaded');
        }
      }
    });
    el.click();
  };

  return (
    <div className="text-white shadow-2xl flex justify-center items-center rounded-lg  ">
      <div
        onClick={handleFileUploadButtonClick}
        className="flex justify-center items-center flex-row"
      >
        <Paperclip className="w-4 h-4 text-white hover:text-green-500" />
        <span className="text-xs text-zinc-400 hidden group-hover:inline transition-opacity">
            Attach
        </span>
      </div>
    </div>
  );
};

export default FileUploadComponent;