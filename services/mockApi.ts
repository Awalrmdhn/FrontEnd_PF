import { AnalysisResult, ApiError } from '../types';

// Simulates the backend logic: Rust (Axum + Rayon) -> TF-IDF -> Cosine Similarity
export const analyzeDocuments = async (files: File[]): Promise<AnalysisResult> => {
  return new Promise((resolve, reject) => {
    // Simulate network delay and processing time
    setTimeout(() => {
      // 1. Validation Logic (Mocking Backend Errors)
      if (files.length > 5) {
        reject({ error: "Maximum 5 files allowed" } as ApiError);
        return;
      }

      const validExtensions = ['pdf', 'docx', 'txt'];
      const invalidFile = files.find(f => {
        const ext = f.name.split('.').pop()?.toLowerCase();
        return !ext || !validExtensions.includes(ext);
      });

      if (invalidFile) {
        reject({ error: "Only .pdf, .docx, .txt are supported" } as ApiError);
        return;
      }

      // 2. Mock Response Generation based on PDF Spec
      const mockResponse: AnalysisResult = {
        metadata: {
          documents_count: files.length,
          total_sentences: 150 + Math.floor(Math.random() * 200),
          processing_time_ms: 150 + Math.floor(Math.random() * 300), // Simulating Rust speed
          threshold: 0.70
        },
        matches: [
          {
            source_doc: files[0]?.name || "research_paper.pdf",
            source_sentence_index: 14,
            target_doc: files[1]?.name || "reference_1.docx",
            target_sentence_index: 9,
            similarity: 0.91,
            source_text_snippet: "The backend utilizes Rust with Axum and Rayon for high-performance parallel processing of document vectors.",
            target_text_snippet: "Backend system uses Rust (Axum + Rayon) for parallel processing."
          },
          {
            source_doc: files[0]?.name || "research_paper.pdf",
            source_sentence_index: 33,
            target_doc: files[files.length - 1]?.name || "reference_final.txt",
            target_sentence_index: 4,
            similarity: 0.87,
            source_text_snippet: "Cosine similarity is calculated between TF-IDF vectors to determine the closeness of sentences.",
            target_text_snippet: "We calculate Cosine Similarity between vectors to find sentence closeness."
          },
          {
            source_doc: files[1]?.name || "reference_1.docx",
            source_sentence_index: 2,
            target_doc: files[0]?.name || "research_paper.pdf",
            target_sentence_index: 5,
            similarity: 0.72,
            source_text_snippet: "The system filters results that are below the specific threshold of 0.70.",
            target_text_snippet: "Results are filtered if the similarity score is less than the 0.70 threshold."
          }
        ],
        global_similarity: []
      };

      // Generate mock global similarities based on file pairs
      for (let i = 0; i < files.length; i++) {
        for (let j = i + 1; j < files.length; j++) {
          mockResponse.global_similarity.push({
            docA: files[i].name,
            docB: files[j].name,
            score: Number((0.4 + Math.random() * 0.5).toFixed(2))
          });
        }
      }

      resolve(mockResponse);
    }, 2000); // 2 second delay to simulate upload + processing
  });
};