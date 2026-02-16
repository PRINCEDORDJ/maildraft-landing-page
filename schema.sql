-- Waitlist Table Schema for Supabase
-- This table stores lead generation data from the landing page.

CREATE TABLE IF NOT EXISTS public.waitlist (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    challenge TEXT,
    frequency TEXT,
    categories TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (public waitlist entry)
CREATE POLICY "Allow public insert" ON public.waitlist
    FOR INSERT 
    WITH CHECK (true);

-- Allow authenticated users (admin) to read the waitlist
CREATE POLICY "Allow admin read" ON public.waitlist
    FOR SELECT 
    USING (auth.role() = 'authenticated');

-- Indices for performance
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created_at ON public.waitlist(created_at);
