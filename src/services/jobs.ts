// src/services/jobs.ts
import { supabase } from '../lib/supabaseClient';

export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';
export type LocationType = 'onsite' | 'remote' | 'hybrid';

export interface JobInput {
  title: string;
  company: string;
  location?: string;
  job_type?: JobType;
  location_type?: LocationType;
  salary_min?: number | null;
  salary_max?: number | null;
  currency?: string;
  description?: string;
  requirements?: string;
}

export async function createJob(employerId: string, data: JobInput) {
  const { error } = await supabase.from('jobs').insert({
    employer_id: employerId,
    ...data,
  });
  if (error) throw error;
}

export async function listJobs() {
  const { data, error } = await supabase
    .from('jobs')
    .select('id, title, company, location, job_type, location_type, salary_min, salary_max, currency, description, created_at, is_active')
    .eq('is_active', true)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data ?? [];
}
