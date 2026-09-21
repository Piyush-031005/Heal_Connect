import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function isValidCustomUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  if (!url.startsWith('/') && !url.startsWith('http')) return false;
  
  // Exclude known avatar generator domains so we can regenerate them dynamically with the correct name
  const blocklist = [
    'dicebear',
    'robohash',
    'multiavatar',
    'githubusercontent',
    'svg',
    'ui-avatars.com'
  ];
  return !blocklist.some(domain => url.includes(domain));
}

export function getAvatarUrl(name?: string | null, photoUrl?: string | null): string {
  if (isValidCustomUrl(photoUrl)) return photoUrl as string;
  const nameForAvatar = name ? encodeURIComponent(name) : 'User';
  return `https://ui-avatars.com/api/?name=${nameForAvatar}&background=random&color=fff&size=150`;
}

export function getPractitionerAvatar(photoUrl: string | null | undefined, name: string): string {
  if (isValidCustomUrl(photoUrl)) return photoUrl as string;
  const nameForAvatar = name ? encodeURIComponent(name) : 'Practitioner';
  return `https://ui-avatars.com/api/?name=${nameForAvatar}&background=random&color=fff&size=150`;
}
