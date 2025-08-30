// src/services/auth.ts
import type { User } from '@supabase/supabase-js';
import { supabase } from '../lib/supabaseClient';

export type UserRole = 'candidate' | 'employer';

export async function signUpWithEmail(opts: {
  email: string;
  password: string;
  role: UserRole;
  fullName?: string;
  companyName?: string;
}) {
  const { email, password, role, fullName, companyName } = opts;
  const { data, error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
  const user = data.user as User;
  // Create profile row
  const { error: profErr } = await supabase.from('profiles').insert({
    id: user.id,
    role,
    full_name: fullName ?? null,
    company_name: role === 'employer' ? (companyName ?? null) : null,
  });
  if (profErr) throw profErr;
  return user;
}

export async function signInWithEmail(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data.user;
}

export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

export async function getCurrentUser() {
  const { data } = await supabase.auth.getUser();
  return data.user;
}

export async function getUserRole(userId: string): Promise<UserRole | null> {
  const { data, error } = await supabase.from('profiles').select('role').eq('id', userId).single();
  if (error) return null;
  return (data?.role ?? null) as UserRole | null;
}
