import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getAvatarUrl(name?: string | null, photoUrl?: string | null): string {
  // Respect valid custom photo URLs
  if (
    photoUrl &&
    (photoUrl.startsWith('/') || photoUrl.startsWith('http')) &&
    !photoUrl.includes('dicebear') &&
    !photoUrl.includes('robohash') &&
    !photoUrl.includes('multiavatar') &&
    !photoUrl.includes('githubusercontent') &&
    !photoUrl.includes('svg')
  ) {
    return photoUrl;
  }

  const nameForAvatar = name ? encodeURIComponent(name) : 'User';
  return `https://ui-avatars.com/api/?name=${nameForAvatar}&background=random&color=fff&size=150`;
}

export function getPractitionerAvatar(photoUrl: string | null | undefined, name: string): string {
  if (photoUrl && (photoUrl.startsWith('/') || photoUrl.startsWith('http'))) return photoUrl;
  const nameForAvatar = name ? encodeURIComponent(name) : 'Practitioner';
  return `https://ui-avatars.com/api/?name=${nameForAvatar}&background=random&color=fff&size=150`;
}
