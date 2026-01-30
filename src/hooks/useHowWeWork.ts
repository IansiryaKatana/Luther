import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface HowWeWorkStep {
  id: string;
  phase: string;
  step_number: string;
  title: string;
  duration: string | null;
  points: string[];
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface HowWeWorkStat {
  id: string;
  stat_value: string;
  label: string;
  unit: string;
  is_highlighted: boolean | null;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceMarquee {
  id: string;
  service_name: string;
  display_order: number | null;
  created_at: string;
  updated_at: string;
}

// Steps hooks
export const useHowWeWorkSteps = () => {
  return useQuery({
    queryKey: ["how_we_work_steps"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("how_we_work_steps")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as HowWeWorkStep[];
    },
  });
};

export const useCreateHowWeWorkStep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (step: Omit<HowWeWorkStep, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("how_we_work_steps")
        .insert(step)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how_we_work_steps"] }),
  });
};

export const useUpdateHowWeWorkStep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...step }: Partial<HowWeWorkStep> & { id: string }) => {
      const { data, error } = await supabase
        .from("how_we_work_steps")
        .update(step)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how_we_work_steps"] }),
  });
};

export const useDeleteHowWeWorkStep = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("how_we_work_steps").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how_we_work_steps"] }),
  });
};

// Stats hooks
export const useHowWeWorkStats = () => {
  return useQuery({
    queryKey: ["how_we_work_stats"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("how_we_work_stats")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as HowWeWorkStat[];
    },
  });
};

export const useCreateHowWeWorkStat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (stat: Omit<HowWeWorkStat, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("how_we_work_stats")
        .insert(stat)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how_we_work_stats"] }),
  });
};

export const useUpdateHowWeWorkStat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...stat }: Partial<HowWeWorkStat> & { id: string }) => {
      const { data, error } = await supabase
        .from("how_we_work_stats")
        .update(stat)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how_we_work_stats"] }),
  });
};

export const useDeleteHowWeWorkStat = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("how_we_work_stats").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["how_we_work_stats"] }),
  });
};

// Services Marquee hooks
export const useServicesMarquee = () => {
  return useQuery({
    queryKey: ["services_marquee"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services_marquee")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as ServiceMarquee[];
    },
  });
};

export const useCreateServiceMarquee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (service: Omit<ServiceMarquee, "id" | "created_at" | "updated_at">) => {
      const { data, error } = await supabase
        .from("services_marquee")
        .insert(service)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services_marquee"] }),
  });
};

export const useUpdateServiceMarquee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...service }: Partial<ServiceMarquee> & { id: string }) => {
      const { data, error } = await supabase
        .from("services_marquee")
        .update(service)
        .eq("id", id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services_marquee"] }),
  });
};

export const useDeleteServiceMarquee = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services_marquee").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["services_marquee"] }),
  });
};
