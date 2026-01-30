-- Hero media bucket for admin uploads (video + image) for hero section
INSERT INTO storage.buckets (id, name, public) 
VALUES ('hero-media', 'hero-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public can view hero media
CREATE POLICY "Anyone can view hero media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'hero-media');

-- Admins can upload hero media
CREATE POLICY "Admins can upload hero media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'hero-media' AND public.has_role(auth.uid(), 'admin'));

-- Admins can update hero media
CREATE POLICY "Admins can update hero media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'hero-media' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete hero media
CREATE POLICY "Admins can delete hero media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'hero-media' AND public.has_role(auth.uid(), 'admin'));
