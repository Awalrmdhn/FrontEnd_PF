
export interface AnalyzeMetadata {
  documents_count: number;
  total_sentences: number;
  processing_time_ms: number;
  threshold: number;
}

export interface Match {
  source_doc: string;
  source_sentence_index: number;
  source_sentence: string; // Added field from new JSON
  target_doc: string;
  target_sentence_index: number;
  target_sentence: string; // Added field from new JSON
  similarity: number;
}

export interface GlobalSimilarity {
  docA: string;
  docB: string;
  score: number;
}

export interface AnalysisResult {
  metadata: AnalyzeMetadata;
  matches: Match[];
  global_similarity: GlobalSimilarity[];
}

export interface ApiError {
  error: string;
}
