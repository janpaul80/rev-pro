import { redirect } from 'next/navigation';
export const dynamic = 'force-dynamic';

export default function SettingsRedirect() {
  redirect('/settings/account');
}
