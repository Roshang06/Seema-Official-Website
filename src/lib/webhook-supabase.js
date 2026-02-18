import { createClient } from "@supabase/supabase-js";

/**
 * Webhook Supabase client - uses anon key for webhook operations
 * This client only has INSERT permissions on the orders table
 */
export const webhookSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);
