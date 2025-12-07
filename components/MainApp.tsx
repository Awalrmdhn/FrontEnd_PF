
import React, { useState } from 'react';
import { ArrowLeft, Play, AlertCircle, CheckCircle2, Clock, FileStack, AlertTriangle, FileText, Settings2 } from 'lucide-react';
import FileUpload from './FileUpload';
import SimilarityChart from './SimilarityChart';
import { analyzeDocuments } from '../services/api';
import { AnalysisResult, ApiError } from '../types';

interface MainAppProps {
  onBack: () => void;
}

const MainApp: React.FC<MainAppProps> = ({ onBack }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // New State for Threshold
  const [threshold, setThreshold] = useState<number>(0.3);

  const handleAnalyze = async () => {
    if (files.length < 2) {
      setError("Please upload at least 2 documents to compare.");
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    setResult(null);

    try {
      // Pass threshold to API
      const data = await analyzeDocuments(files, threshold);
      setResult(data);
    } catch (err: any) {
      const apiError = err as ApiError;
      setError(apiError.error || "An unexpected error occurred.");
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAnalysis = () => {
    setResult(null);
    setFiles([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-full text-slate-600 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <span className="bg-indigo-600 text-white p-1 rounded">SC</span>
              SimCheck Pro
            </h1>
          </div>
          <div className="text-sm text-slate-500 hidden sm:block">
            Rust Powered Engine
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Input Section - Only show if no results yet */}
        {!result && (
          <div className="animate-fade-in-up space-y-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">Upload Documents</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Upload up to 5 documents (PDF, DOCX, TXT) to detect plagiarism and sentence-level similarity.
              </p>
            </div>

            <FileUpload 
              files={files} 
              onFilesChange={setFiles} 
              isProcessing={isProcessing} 
            />

            {/* Threshold Configuration */}
            <div className="max-w-xl mx-auto bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-slate-800 font-semibold">
                  <Settings2 size={20} className="text-indigo-600" />
                  <h3>Similarity Threshold</h3>
                </div>
                <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md text-sm font-bold font-mono">
                  {threshold.toFixed(2)}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={threshold}
                onChange={(e) => setThreshold(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                disabled={isProcessing}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-2">
                <span>0.1 (Strict)</span>
                <span>0.5 (Balanced)</span>
                <span>1.0 (Loose)</span>
              </div>
              <p className="text-xs text-slate-500 mt-3 text-center">
                Only sentences with similarity score above {threshold.toFixed(2)} will be reported.
              </p>
            </div>

            {error && (
              <div className="max-w-2xl mx-auto p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="text-red-500 mt-0.5 flex-shrink-0" size={20} />
                <p className="text-red-700">{error}</p>
              </div>
            )}

            <div className="flex justify-center pb-8">
              <button
                onClick={handleAnalyze}
                disabled={isProcessing || files.length === 0}
                className={`
                  flex items-center space-x-2 px-8 py-4 rounded-full text-lg font-semibold shadow-lg transition-all transform hover:-translate-y-1
                  ${isProcessing 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                    : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-indigo-200"
                  }
                `}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Play size={20} fill="currentColor" />
                    <span>Analyze Documents</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Results Dashboard */}
        {result && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                    <FileStack size={20} />
                  </div>
                  <span className="text-slate-500 font-medium text-sm">Documents</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{result.metadata.documents_count}</div>
              </div>
              
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                    <CheckCircle2 size={20} />
                  </div>
                  <span className="text-slate-500 font-medium text-sm">Total Sentences</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{result.metadata.total_sentences}</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                    <Clock size={20} />
                  </div>
                  <span className="text-slate-500 font-medium text-sm">Processing Time</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{result.metadata.processing_time_ms} ms</div>
              </div>

              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                 <div className="flex items-center space-x-3 mb-2">
                  <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                    <AlertTriangle size={20} />
                  </div>
                  <span className="text-slate-500 font-medium text-sm">Threshold</span>
                </div>
                <div className="text-2xl font-bold text-slate-900">{(result.metadata.threshold * 100).toFixed(0)}%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Global Similarity Column */}
              <div className="lg:col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Global Similarity Overview</h3>
                  <p className="text-sm text-slate-500 mb-6">Comparison score between document pairs based on TF-IDF Vectors.</p>
                  <SimilarityChart data={result.global_similarity} />
                  
                  <div className="mt-6 space-y-3">
                    {result.global_similarity.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-sm border-b border-slate-100 pb-2 last:border-0">
                         <div className="flex flex-col">
                           <span className="font-medium text-slate-700 truncate max-w-[120px]" title={item.docA}>{item.docA}</span>
                           <span className="text-slate-400 text-xs">vs</span>
                           <span className="font-medium text-slate-700 truncate max-w-[120px]" title={item.docB}>{item.docB}</span>
                         </div>
                         <div className={`font-bold px-2 py-1 rounded ${
                           item.score > 0.7 ? 'bg-red-100 text-red-700' : 
                           item.score > 0.4 ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                         }`}>
                           {(item.score * 100).toFixed(0)}%
                         </div>
                      </div>
                    ))}
                    {result.global_similarity.length === 0 && (
                      <p className="text-center text-slate-400 text-sm italic">No global similarity data available.</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Detailed Matches Column */}
              <div className="lg:col-span-2">
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                     <h3 className="text-lg font-bold text-slate-900">Detected Matches (Sentence Level)</h3>
                     <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-xs font-bold rounded-full">
                        {result.matches.length} Matches Found
                     </span>
                  </div>

                  <div className="space-y-4">
                    {result.matches.map((match, idx) => (
                      <div key={idx} className="border border-slate-200 rounded-lg p-4 hover:border-indigo-300 transition-colors bg-slate-50/50">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
                             <span>Match #{idx + 1}</span>
                             <span>•</span>
                             <span>Similarity: <span className="text-indigo-600">{(match.similarity * 100).toFixed(1)}%</span></span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Source */}
                          <div className="bg-white p-3 rounded border border-red-100 relative">
                             <div className="absolute top-2 right-2 text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded">
                               SOURCE
                             </div>
                             <p className="text-xs text-slate-500 font-semibold mb-2 truncate" title={match.source_doc}>
                               {match.source_doc}
                             </p>
                             <div className="text-sm text-slate-800 italic bg-yellow-100/50 p-2 rounded border border-yellow-100/30">
                               "{match.source_sentence}"
                             </div>
                             <div className="mt-2 text-[10px] text-slate-400 flex justify-end">
                               Index: {match.source_sentence_index}
                             </div>
                          </div>

                          {/* Target */}
                          <div className="bg-white p-3 rounded border border-blue-100 relative">
                             <div className="absolute top-2 right-2 text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded">
                               TARGET
                             </div>
                             <p className="text-xs text-slate-500 font-semibold mb-2 truncate" title={match.target_doc}>
                               {match.target_doc}
                             </p>
                             <div className="text-sm text-slate-800 italic bg-yellow-100/50 p-2 rounded border border-yellow-100/30">
                               "{match.target_sentence}"
                             </div>
                             <div className="mt-2 text-[10px] text-slate-400 flex justify-end">
                               Index: {match.target_sentence_index}
                             </div>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {result.matches.length === 0 && (
                      <div className="text-center py-12 text-slate-400">
                        <CheckCircle2 className="mx-auto mb-3 text-green-500" size={48} />
                        <p className="text-slate-600 font-medium">No significant similarities found.</p>
                        <p className="text-sm">Documents appear unique based on the {(result.metadata.threshold * 100).toFixed(0)}% threshold.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={resetAnalysis}
                className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
              >
                Start New Analysis
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
};

export default MainApp;
