import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  status: string | null;
  created_at: string;
  updated_at: string;
}

export type ContactSubmissionInsert = Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>;
export type ContactSubmissionUpdate = Partial<Pick<ContactSubmission, 'status'>>;

export const useContactSubmissions = () => {
  return useQuery({
    queryKey: ['contact_submissions'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });
};

export const useContactSubmission = (id: string) => {
  return useQuery({
    queryKey: ['contact_submissions', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      
      if (error) throw error;
      return data as ContactSubmission | null;
    },
    enabled: !!id,
  });
};

export const useCreateContactSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (submission: ContactSubmissionInsert) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .insert(submission)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      toast.success('Message sent successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useUpdateContactSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, ...update }: ContactSubmissionUpdate & { id: string }) => {
      const { data, error } = await supabase
        .from('contact_submissions')
        .update(update)
        .eq('id', id)
        .select()
        .single();
      
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      toast.success('Status updated');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};

export const useDeleteContactSubmission = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['contact_submissions'] });
      toast.success('Submission deleted');
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
};
