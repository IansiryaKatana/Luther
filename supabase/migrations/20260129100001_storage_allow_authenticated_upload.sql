-- Fix: Allow any authenticated user to upload to hero-media (and project-images, testimonial-avatars)
-- so uploads work even before the user has been granted admin in user_roles.
-- RLS was failing with "new row violates row-level security policy" because has_role(auth.uid(), 'admin') was false.

-- Hero media: drop admin-only policies and allow authenticated uploads
DROP POLICY IF EXISTS "Admins can upload hero media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update hero media" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete hero media" ON storage.objects;

CREATE POLICY "Authenticated can upload hero media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'hero-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update hero media"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'hero-media' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete hero media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'hero-media' AND auth.role() = 'authenticated');

-- Project images: same fix so project image uploads work
DROP POLICY IF EXISTS "Admins can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete project images" ON storage.objects;

CREATE POLICY "Authenticated can upload project images"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update project images"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete project images"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'project-images' AND auth.role() = 'authenticated');

-- Testimonial avatars: same fix
DROP POLICY IF EXISTS "Admins can upload testimonial avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update testimonial avatars" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete testimonial avatars" ON storage.objects;

CREATE POLICY "Authenticated can upload testimonial avatars"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'testimonial-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can update testimonial avatars"
  ON storage.objects FOR UPDATE
  USING (bucket_id = 'testimonial-avatars' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated can delete testimonial avatars"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'testimonial-avatars' AND auth.role() = 'authenticated');
