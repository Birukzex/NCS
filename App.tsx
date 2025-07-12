
import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import PatientDataForm from './components/PatientDataForm';
import SummaryPanel from './components/SummaryPanel';
import GeminiChat from './components/GeminiChat';
import PDFViewer from './components/PDFViewer';

const App: React.FC = () => {

  useEffect(() => {
    // This is where you would register the service worker for PWA functionality.
    // The build tool (like Vite with vite-plugin-pwa) must be configured to generate 'service-worker.js'.
    if ('serviceWorker' in navigator) {
      // In some sandboxed environments, relative paths can be misinterpreted.
      // Constructing a full, absolute URL from the current location ensures
      // the origin is correctly matched, which is a robust way to prevent this error.
      const swUrl = new URL('service-worker.js', window.location.href).href;

      navigator.serviceWorker.register(swUrl, { scope: './' })
        .then((registration) => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch((error) => {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 font-sans">
      <Header />
      <main className="p-4 sm:p-6 lg:p-8">
        <Routes>
          <Route path="/" element={
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <PatientDataForm />
              </div>
              <div className="xl:col-span-1">
                <SummaryPanel />
              </div>
            </div>
          } />
          <Route path="/guidebook" element={<PDFViewer />} />
          <Route path="/chat" element={<GeminiChat />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
};

export default App;
