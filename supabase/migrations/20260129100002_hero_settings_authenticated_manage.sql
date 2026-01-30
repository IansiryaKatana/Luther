-- Fix: hero_settings save not persisting because RLS required admin role.
-- Allow any authenticated user to manage hero_settings (same as storage fix).

DROP POLICY IF EXISTS "Admins can manage hero_settings" ON public.hero_settings;

CREATE POLICY "Authenticated can manage hero_settings"
  ON public.hero_settings
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
