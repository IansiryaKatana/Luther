-- Fix: how_we_work save not persisting because RLS required admin role.
-- Allow any authenticated user to manage (same as projects, hero_settings).

-- how_we_work_steps
DROP POLICY IF EXISTS "Admins can manage how_we_work_steps" ON public.how_we_work_steps;

CREATE POLICY "Authenticated can manage how_we_work_steps"
  ON public.how_we_work_steps
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- how_we_work_stats
DROP POLICY IF EXISTS "Admins can manage how_we_work_stats" ON public.how_we_work_stats;

CREATE POLICY "Authenticated can manage how_we_work_stats"
  ON public.how_we_work_stats
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- services_marquee
DROP POLICY IF EXISTS "Admins can manage services_marquee" ON public.services_marquee;

CREATE POLICY "Authenticated can manage services_marquee"
  ON public.services_marquee
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');
