-- Add featured image and rich content for project detail pages
ALTER TABLE public.projects
  ADD COLUMN IF NOT EXISTS featured_image_url TEXT,
  ADD COLUMN IF NOT EXISTS content TEXT;

COMMENT ON COLUMN public.projects.featured_image_url IS 'Hero/featured image for the project detail page. Falls back to image_url if null.';
COMMENT ON COLUMN public.projects.content IS 'Rich HTML content for the project detail page body (from WYSIWYG editor).';
