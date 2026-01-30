-- Fix: testimonials and FAQs save not persisting (406) - RLS required admin role.
-- Allow any authenticated user to manage (same as projects, hero, how_we_work).

-- Testimonials
DROP POLICY IF EXISTS "Admins can manage testimonials" ON public.testimonials;

CREATE POLICY "Authenticated can manage testimonials"
  ON public.testimonials
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- FAQs
DROP POLICY IF EXISTS "Admins can manage FAQs" ON public.faqs;

CREATE POLICY "Authenticated can manage FAQs"
  ON public.faqs
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
