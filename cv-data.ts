import { CVData } from '@/types/cv';
import { sampleCVData } from './sample-data';

// Default CV data structure - use sample data for demo
export const defaultCVData: CVData = sampleCVData;

// Load CV data from localStorage
export function loadCVData(): CVData {
  if (typeof window === 'undefined') {
    return defaultCVData;
  }
  
  const stored = localStorage.getItem('cv-data');
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return defaultCVData;
    }
  }
  
  return defaultCVData;
}

// Save CV data to localStorage
export function saveCVData(data: CVData): void {
  if (typeof window === 'undefined') {
    return;
  }
  
  localStorage.setItem('cv-data', JSON.stringify(data));
}
