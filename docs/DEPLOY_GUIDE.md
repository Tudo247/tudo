# Job Portal: Online DB + Auth + Post Job (Step-by-Step)

This guide wires your existing React (Vite + shadcn) frontend to **Supabase** (hosted Postgres + Auth) and shows how to deploy on **Vercel** with a fully online database. No local DB.

---
## 1) Create your online database (Supabase)
1. Go to supabase.com → New project.
2. Choose a region close to your users. Set a strong DB password.
3. In **Project Settings → API**, copy:
   - `Project URL`
   - `anon public` key
4. In **SQL Editor**, paste and run `supabase.sql` from the project root. This creates tables (`profiles`, `jobs`, `applications`) and RLS policies.

## 2) Wire the frontend to Supabase
1. Copy `.env.example` to `.env` and fill in values:
   ```bash
   VITE_SUPABASE_URL=your_url_here
   VITE_SUPABASE_ANON_KEY=your_anon_key_here
   ```
2. Install the Supabase client:
   ```bash
   npm i @supabase/supabase-js
   ```
   *(Already added to package.json for you.)*
3. The client is at `src/lib/supabaseClient.ts`. You can now import `supabase` anywhere.

## 3) Hook up Login (email/password)
Use the auth helpers in `src/services/auth.ts`.

Example (inside your `Login.tsx` submit handler):
```ts
import { signInWithEmail, signUpWithEmail } from '@/services/auth';

// Sign up (create profile with role)
await signUpWithEmail({
  email,
  password,
  role: isEmployer ? 'employer' : 'candidate',
  fullName,
  companyName: isEmployer ? company : undefined,
});

// or Sign in
await signInWithEmail(email, password);

// After success, load role and continue
const user = await getCurrentUser();
const role = await getUserRole(user!.id);
onLogin(role ?? 'candidate'); // existing App.tsx API
onNavigate('home');
```

### Persist session across refresh
In `App.tsx` (top level), add:
```ts
import { useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { getUserRole } from '@/services/auth';

useEffect(() => {
  let mounted = true;
  supabase.auth.getSession().then(async ({ data }) => {
    if (!mounted) return;
    if (data.session) {
      const uid = data.session.user.id;
      const role = await getUserRole(uid);
      setUserRole((role as any) ?? 'candidate');
      setIsLoggedIn(true);
    }
  });
  const { data: sub } = supabase.auth.onAuthStateChange(async (_event, session) => {
    if (!mounted) return;
    const loggedIn = !!session;
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const uid = session!.user.id;
      const role = await getUserRole(uid);
      setUserRole((role as any) ?? 'candidate');
    } else {
      setCurrentPage('login');
    }
  });
  return () => {
    mounted = false;
    sub.subscription.unsubscribe();
  };
}, []);
```

## 4) Post Job (employer)
Use the job helpers in `src/services/jobs.ts`.

Example (in `EmployerDashboard.tsx` submit):
```ts
import { createJob } from '@/services/jobs';
import { getCurrentUser } from '@/services/auth';

const user = await getCurrentUser();
if (!user) throw new Error('Please sign in');
await createJob(user.id, {
  title,
  company,          // or fetch from the employer profile
  location,
  job_type,         // 'full-time' | 'part-time' | 'contract' | 'internship'
  location_type,    // 'onsite' | 'remote' | 'hybrid'
  salary_min,
  salary_max,
  currency: 'USD',
  description,
  requirements,
});
```

## 5) List Jobs (candidate)
In `JobPortal.tsx`:
```ts
import { useEffect, useState } from 'react';
import { listJobs } from '@/services/jobs';

const [jobs, setJobs] = useState<any[]>([]);
useEffect(() => {
  listJobs().then(setJobs).catch(console.error);
}, []);
```
Then render `jobs` instead of the static array. Your existing cards/components will stay the same.

## 6) Responsive tweaks
- Wrap pages with a responsive container:
  ```html
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">...</div>
  ```
- Use grid for forms:
  ```html
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <!-- inputs -->
  </div>
  ```
- For buttons, make them full width on mobile:
  ```html
  <Button className="w-full sm:w-auto">Submit</Button>
  ```

## 7) Deploy to Vercel (with online DB)
1. Push your repo to GitHub/GitLab.
2. Go to vercel.com → New Project → Import your repo.
3. In **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Build command is already in `package.json` (Vite). Deploy.
5. Post-deploy, your site will talk directly to Supabase (online DB). No local DB needed.

## Optional: Social login
Enable providers in **Supabase → Authentication → Providers**, then call `supabase.auth.signInWithOAuth({ provider: 'google' })` from a button.

---
### Troubleshooting
- **403s on insert jobs** → ensure your user has a `profiles` row with `role='employer'` and you ran the **RLS policies**.
- **Session resets on refresh** → you missed the `useEffect` block to rehydrate session.
- **CORS** → Supabase is CORS-ready; make sure you use the project URL, not the studio URL.
