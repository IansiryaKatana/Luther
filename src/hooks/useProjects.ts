import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Project {
  id: string;
  title: string;
  description: string | null;
  category: string | null;
  image_url: string | null;
  logo_url: string | null;
  featured_image_url: string | null;
  content: string | null;
  date: string | null;
  duration: string | null;
  featured: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export type ProjectInsert = Omit<Project, 'id' | 'created_at' | 'updated_at'>;
export type ProjectUpdate = Partial<ProjectInsert>;

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Project[];
    },
  });
};

export const useProject = (id: string) => {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!id,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (project: ProjectInsert) => {
      const { data, error } = await supabase
        .from('projects')
        .insert(project)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error('Failed to create project');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...project }: ProjectUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(project)
        .eq('id', id)
        .select()
        .maybeSingle();
      
      if (error) throw error;
      if (!data) throw new Error('Project not found or you don\'t have permission to update it');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDuplicateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sourceId: string) => {
      const { data: source, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', sourceId)
        .single();

      if (fetchError || !source) throw fetchError || new Error('Project not found');
      const project = source as Project;

      const { data: newProject, error: insertError } = await supabase
        .from('projects')
        .insert({
          title: `Copy of ${project.title}`,
          description: project.description,
          category: project.category,
          image_url: project.image_url,
          logo_url: project.logo_url,
          featured_image_url: project.featured_image_url,
          content: project.content,
          date: project.date,
          duration: project.duration,
          featured: false,
          display_order: (project.display_order ?? 0) + 1,
        })
        .select()
        .single();

      if (insertError || !newProject) throw insertError || new Error('Failed to create duplicate');

      const { data: gallery } = await supabase
        .from('project_gallery')
        .select('image_url, display_order')
        .eq('project_id', sourceId)
        .order('display_order', { ascending: true });

      if (gallery?.length) {
        await supabase.from('project_gallery').insert(
          gallery.map((row, i) => ({
            project_id: (newProject as Project).id,
            image_url: row.image_url,
            display_order: row.display_order ?? i,
          }))
        );
      }

      return newProject as Project;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project duplicated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
