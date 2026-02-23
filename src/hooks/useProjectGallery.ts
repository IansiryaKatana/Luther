import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export interface ProjectGalleryImage {
  id: string;
  project_id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export const useProjectGallery = (projectId: string | null) => {
  return useQuery({
    queryKey: ['project-gallery', projectId],
    queryFn: async () => {
      if (!projectId) return [];
      const { data, error } = await supabase
        .from('project_gallery')
        .select('*')
        .eq('project_id', projectId)
        .order('display_order', { ascending: true });
      if (error) throw error;
      return (data ?? []) as ProjectGalleryImage[];
    },
    enabled: !!projectId,
  });
};

export const useAddProjectGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      project_id,
      image_url,
      display_order,
    }: {
      project_id: string;
      image_url: string;
      display_order?: number;
    }) => {
      const { data, error } = await supabase
        .from('project_gallery')
        .insert({ project_id, image_url, display_order: display_order ?? 0 })
        .select()
        .single();
      if (error) throw error;
      return data as ProjectGalleryImage;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['project-gallery', vars.project_id] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });
};

export const useRemoveProjectGalleryImage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, project_id }: { id: string; project_id: string }) => {
      const { error } = await supabase.from('project_gallery').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['project-gallery', vars.project_id] });
    },
  });
};

export const useReorderProjectGallery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      project_id,
      orderedIds,
    }: {
      project_id: string;
      orderedIds: string[];
    }) => {
      const updates = orderedIds.map((id, index) =>
        supabase.from('project_gallery').update({ display_order: index }).eq('id', id)
      );
      await Promise.all(updates);
    },
    onSuccess: (_, vars) => {
      queryClient.invalidateQueries({ queryKey: ['project-gallery', vars.project_id] });
    },
  });
};
