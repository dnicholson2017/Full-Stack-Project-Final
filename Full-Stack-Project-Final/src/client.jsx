import { createClient } from "@supabase/supabase-js";

const URL = 'https://dtdtukaybygownrcshzp.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR0ZHR1a2F5Ynlnb3ducmNzaHpwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2OTI5NzgsImV4cCI6MjAyODI2ODk3OH0.0B8b2dOKPbieKhOTBZZF90k0Og5xg4Bub5Kx55S27-U';

export const supabase = createClient(URL, API_KEY);