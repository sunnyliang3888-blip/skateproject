import { useEffect, useState } from 'react';

import { SectionScreen } from '@/components/section-screen';
import { supabase } from '@/lib/supabase';

export default function MyScreen() {
  const [accountEmail, setAccountEmail] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setAccountEmail(session?.user.email ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  return <SectionScreen content={{
    eyebrow: 'YOUR RUNNING STORY', title: 'My', description: 'Every mile, every small win, all yours.',
    showLogin: !accountEmail,
    accountEmail: accountEmail ?? undefined,
    onSignOut: async () => { await supabase.auth.signOut(); },
    featureLabel: 'YOUR OCTOBER', featureTitle: 'Showing up, consistently.', featureDetail: 'You have moved 12 days this month. That is something to be proud of.', featureValue: '42.6 km · 12 active days',
    rows: [
      { title: 'Personal bests', detail: 'Your fastest efforts', value: '4 records', symbol: '✦' },
      { title: 'Training history', detail: 'Runs, walks & workouts', value: 'View', symbol: '↗' },
      { title: 'Goals & preferences', detail: 'Make the app yours', value: 'Edit', symbol: '⚙' },
    ],
  }} />;
}
