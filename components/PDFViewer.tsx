
import React from 'react';

const PDFViewer: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 h-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">NCS.pdf</h1>
      <iframe
        src="/NCS.pdf"
        title="NCS Guide PDF"
        width="100%"
        height="800px"
        style={{ border: 'none', maxWidth: '900px' }}
      />
    </div>
  );
};

export default PDFViewer;
