const SUPABASE_URL = "https://sseuhhmwhvlbpnrldtnz.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_5B-sXQJKmWyE68BfEA1IJQ_QdcHVJyc";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);
