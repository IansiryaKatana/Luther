-- Allow authenticated users to manage projects (avoids 406 when updating).
-- Mirrors hero_settings fix: RLS required admin role, user may not have it.

DROP POLICY IF EXISTS "Admins can manage projects" ON public.projects;

CREATE POLICY "Authenticated can manage projects"
  ON public.projects
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
