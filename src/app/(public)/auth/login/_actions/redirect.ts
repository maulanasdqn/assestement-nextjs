'use server';

import { redirect } from 'next/navigation';

export const navigateTo = (url: string | null) => {
  return redirect(url || '/dashboard');
};
