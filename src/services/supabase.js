import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://cvcsekbxlxknpxlbgjez.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN2Y3Nla2J4bHhrbnB4bGJnamV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE2MDU2NTIsImV4cCI6MjA2NzE4MTY1Mn0.BadgRBrZ9IoRuToR1pMUbRRpqboNGilvocdzNXEZPj4";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
