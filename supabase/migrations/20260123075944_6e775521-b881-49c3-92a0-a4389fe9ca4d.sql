-- Create how_we_work_steps table for process steps
CREATE TABLE public.how_we_work_steps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phase TEXT NOT NULL,
  step_number TEXT NOT NULL,
  title TEXT NOT NULL,
  duration TEXT,
  points TEXT[] NOT NULL DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create how_we_work_stats table for stats
CREATE TABLE public.how_we_work_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  stat_value TEXT NOT NULL,
  label TEXT NOT NULL,
  unit TEXT NOT NULL,
  is_highlighted BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create services_marquee table for marquee items
CREATE TABLE public.services_marquee (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_name TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hero_settings table for hero background
CREATE TABLE public.hero_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  background_type TEXT NOT NULL DEFAULT 'video' CHECK (background_type IN ('video', 'image')),
  video_url TEXT,
  image_url TEXT,
  poster_url TEXT,
  tagline TEXT DEFAULT 'International marketing',
  title TEXT DEFAULT 'Luther',
  button_text TEXT DEFAULT 'Start your project',
  services TEXT[] DEFAULT ARRAY['Branding and identity', 'Social media strategy', 'Events & marketing', 'Photography & videography'],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.how_we_work_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.how_we_work_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services_marquee ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hero_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for how_we_work_steps
CREATE POLICY "Anyone can view how_we_work_steps" ON public.how_we_work_steps FOR SELECT USING (true);
CREATE POLICY "Admins can manage how_we_work_steps" ON public.how_we_work_steps FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for how_we_work_stats
CREATE POLICY "Anyone can view how_we_work_stats" ON public.how_we_work_stats FOR SELECT USING (true);
CREATE POLICY "Admins can manage how_we_work_stats" ON public.how_we_work_stats FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for services_marquee
CREATE POLICY "Anyone can view services_marquee" ON public.services_marquee FOR SELECT USING (true);
CREATE POLICY "Admins can manage services_marquee" ON public.services_marquee FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for hero_settings
CREATE POLICY "Anyone can view hero_settings" ON public.hero_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage hero_settings" ON public.hero_settings FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Add triggers for updated_at
CREATE TRIGGER update_how_we_work_steps_updated_at BEFORE UPDATE ON public.how_we_work_steps FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_how_we_work_stats_updated_at BEFORE UPDATE ON public.how_we_work_stats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_services_marquee_updated_at BEFORE UPDATE ON public.services_marquee FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_hero_settings_updated_at BEFORE UPDATE ON public.hero_settings FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();