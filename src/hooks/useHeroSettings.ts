import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HeroSettings {
  id: string;
  background_type: "video" | "image";
  video_url: string | null;
  image_url: string | null;
  poster_url: string | null;
  tagline: string | null;
  title: string | null;
  button_text: string | null;
  services: string[] | null;
  created_at: string;
  updated_at: string;
}

export const useHeroSettings = () => {
  return useQuery({
    queryKey: ["hero_settings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("hero_settings")
        .select("*")
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      return data as HeroSettings | null;
    },
    refetchOnWindowFocus: true,
  });
};

export const useUpdateHeroSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...settings }: Partial<HeroSettings> & { id: string }) => {
      const { data, error } = await supabase
        .from("hero_settings")
        .update(settings)
        .eq("id", id)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["hero_settings"] }),
  });
};

export const useCreateHeroSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (settings: Omit<HeroSettings, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("hero_settings")
        .insert(settings)
        .select()
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["hero_settings"] }),
  });
};
