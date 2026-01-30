import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Testimonial {
  id: string;
  author_name: string;
  author_role: string | null;
  author_company: string | null;
  author_avatar: string | null;
  content: string;
  rating: number | null;
  featured: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export type TestimonialInsert = Omit<Testimonial, 'id' | 'created_at' | 'updated_at'>;
export type TestimonialUpdate = Partial<TestimonialInsert>;

export const useTestimonials = () => {
  return useQuery({
    queryKey: ['testimonials'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .order('display_order', { ascending: true });
      
      if (error) throw error;
      return data as Testimonial[];
    },
  });
};

export const useTestimonial = (id: string) => {
  return useQuery({
    queryKey: ['testimonials', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as Testimonial | null;
    },
    enabled: !!id,
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (testimonial: TestimonialInsert) => {
      const { data, error } = await supabase
        .from('testimonials')
        .insert(testimonial)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial created successfully');
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : (error as { message?: string })?.message ?? 'Failed to save';
      toast.error(msg);
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...testimonial }: TestimonialUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('testimonials')
        .update(testimonial)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial updated successfully');
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : (error as { message?: string })?.message ?? 'Failed to save';
      toast.error(msg);
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('testimonials')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['testimonials'] });
      toast.success('Testimonial deleted successfully');
    },
    onError: (error: unknown) => {
      const msg = error instanceof Error ? error.message : (error as { message?: string })?.message ?? 'Failed to save';
      toast.error(msg);
    },
  });
};
