import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://ptakgadlsitwkrgpgwhe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB0YWtnYWRsc2l0d2tyZ3Bnd2hlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NjQ0MzUsImV4cCI6MjAzNzQ0MDQzNX0.9eRCdNNJJ3qSqiTXlWSgoH7ZCYfVtM5xyDZy7LZgIqI';

const options = {
    auth: {
        localStorage: true,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
};

export const PLAYERS = 'players';
export const RESERVE_LIST = 'reserve_list';

export const supabase = createClient(supabaseUrl,
    supabaseKey, options);