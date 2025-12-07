import React from 'react';
import { ShieldCheck, Zap, Search, ArrowRight, Layers, FileSearch } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30 flex flex-col">
      {/* Navigation */}
      <nav className="w-full py-6 px-4 sm:px-8 max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 text-white p-1.5 rounded-lg">
            <ShieldCheck size={24} />
          </div>
          <span className="text-xl font-bold text-slate-900 tracking-tight">SimCheck Pro</span>
        </div>
        <button className="text-slate-600 hover:text-indigo-600 font-medium text-sm transition-colors">
          Documentation
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 border border-indigo-200 text-indigo-700 text-xs font-semibold uppercase tracking-wide mb-4">
            <Zap size={12} className="fill-current" />
            <span>Powered by Rust + Rayon</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Intelligent Document <br />
            <span className="text-indigo-600">Similarity Detection</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Detect plagiarism and Analyze document overlaps with sentence-level precision. 
            Built for speed and accuracy using advanced TF-IDF vectorization.
          </p>

          <div className="pt-4">
            <button 
              onClick={onStart}
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
            >
              Start Analysis
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-4 text-sm text-slate-400">
              No registration required • Up to 5 documents
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-16 text-left">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-4">
                <Search size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Sentence-Level</h3>
              <p className="text-slate-600 text-sm">
                Goes beyond simple keyword matching. Analyzes context and structure to find paraphrased content.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-4">
                <Layers size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Global Comparison</h3>
              <p className="text-slate-600 text-sm">
                Get a matrix view of similarity scores across all uploaded documents instantly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-purple-600 mb-4">
                <FileSearch size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Smart Highlights</h3>
              <p className="text-slate-600 text-sm">
                Visual side-by-side comparison highlighting exactly which parts match between documents.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-slate-400 text-sm">
        © 2024 SimCheck Pro. Based on Axum + Rayon Backend Architecture.
      </footer>
    </div>
  );
};

export default LandingPage;