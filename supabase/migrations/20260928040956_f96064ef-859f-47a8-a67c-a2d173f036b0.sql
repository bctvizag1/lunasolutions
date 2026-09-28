CREATE TABLE public.counselling_enquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  phone text NOT NULL,
  whatsapp text,
  email text NOT NULL,
  qualification text,
  course text,
  created_at timestamptz NOT NULL DEFAULT now()
);

GRANT INSERT ON public.counselling_enquiries TO anon;
GRANT ALL ON public.counselling_enquiries TO service_role;

ALTER TABLE public.counselling_enquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an enquiry"
ON public.counselling_enquiries
FOR INSERT
TO anon
WITH CHECK (true);