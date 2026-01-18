'use client';

import { useEffect, useState } from 'react';
import { CVData } from '@/types/cv';
import { loadCVData } from '@/lib/cv-data';
import CVView from '@/components/cv-view';
import CVEditor from '@/components/cv-editor';

export default function Home() {
  const [cvData, setCVData] = useState<CVData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const data = loadCVData();
    setCVData(data);
  }, []);

  if (!isClient || !cvData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-foreground text-background rounded-md hover:opacity-90 transition-opacity"
        >
          {isEditing ? 'View CV' : 'Edit CV'}
        </button>
      </div>
      
      {isEditing ? (
        <CVEditor cvData={cvData} setCVData={setCVData} onClose={() => setIsEditing(false)} />
      ) : (
        <CVView cvData={cvData} />
      )}
    </main>
  );
}
