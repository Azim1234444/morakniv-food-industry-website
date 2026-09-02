const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export type SupabaseConfig = {
  url: string;
  anonKey: string;
};

export function getSupabaseConfig(): SupabaseConfig | null {
  if (!supabaseUrl || !supabaseAnonKey) return null;

  try {
    new URL(supabaseUrl);
  } catch {
    return null;
  }

  return { url: supabaseUrl, anonKey: supabaseAnonKey };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseConfig() !== null;
}
