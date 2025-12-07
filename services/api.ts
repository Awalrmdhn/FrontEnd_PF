
import { AnalysisResult, ApiError } from '../types';

const API_URL = 'http://localhost:3000/api/analyze';

export const analyzeDocuments = async (files: File[], threshold: number): Promise<AnalysisResult> => {
  const formData = new FormData();

  // Request format as per spec: files[] -> max 5 documents
  files.forEach((file) => {
    formData.append('files[]', file);
  });

  // Append threshold
  formData.append('threshold', threshold.toString());

  try {
    console.log(`Sending request to ${API_URL} with ${files.length} files and threshold ${threshold}...`);
    
    const response = await fetch(API_URL, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      const errorData = data as ApiError;
      throw new Error(errorData.error || `Server Error ${response.status}: ${response.statusText}`);
    }

    return data as AnalysisResult;
  } catch (error: any) {
    console.error("API Connection Error:", error);
    
    let errorMessage = error.message || "Failed to connect to server.";

    // Helper for common connection issues (e.g., Backend not running or blocked)
    if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        errorMessage = "Could not connect to http://localhost:3000. Please ensure the backend server is running.";
    }
    
    throw { 
      error: errorMessage
    } as ApiError;
  }
};
