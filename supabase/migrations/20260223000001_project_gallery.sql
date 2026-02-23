-- Project gallery: multiple images per project for detail page
CREATE TABLE IF NOT EXISTS public.project_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_project_gallery_project_id ON public.project_gallery(project_id);
CREATE INDEX IF NOT EXISTS idx_project_gallery_display_order ON public.project_gallery(project_id, display_order);

ALTER TABLE public.project_gallery ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can manage project_gallery"
  ON public.project_gallery
  FOR ALL
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Public read for project gallery (so detail page can show images)
CREATE POLICY "Public can read project_gallery"
  ON public.project_gallery
  FOR SELECT
  USING (true);

COMMENT ON TABLE public.project_gallery IS 'Gallery images for project detail page; order by display_order.';
