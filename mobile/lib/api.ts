import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  code?: string;
}

export interface AuthData {
  user: {
    id: string;
    email: string | null;
    name: string | null;
    phone: string | null;
  };
  accessToken: string;
  refreshToken: string;
}

export interface UserProfile {
  id: string;
  email: string | null;
  name: string | null;
  phone: string | null;
  photoUrl: string | null;
}

export interface PractitionerProfile {
  id: string;
  name: string;
  bio: string | null;
  specialties: string[];
  experienceYrs: number;
  perMinuteRate: number;
  photoUrl: string | null;
  isVerified: boolean;
  isOnline: boolean;
  avgRating?: number;
}

export const tokenStore = {
  async setTokens(access: string, refresh: string) {
    await SecureStore.setItemAsync('hc_access', access);
    await SecureStore.setItemAsync('hc_refresh', refresh);
  },
  async getAccess() {
    return await SecureStore.getItemAsync('hc_access');
  },
  async getRefresh() {
    return await SecureStore.getItemAsync('hc_refresh');
  },
  async clear() {
    await SecureStore.deleteItemAsync('hc_access');
    await SecureStore.deleteItemAsync('hc_refresh');
    await SecureStore.deleteItemAsync('hc_role');
  },
};

async function request<T>(path: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
  const { headers, ...restOptions } = options;
  const token = await tokenStore.getAccess();
  
  const defaultHeaders: any = {
    'Content-Type': 'application/json',
  };
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }

  try {
    const res = await fetch(`${API_URL}${path}`, {
      headers: { ...defaultHeaders, ...headers },
      ...restOptions,
    });

    if (res.status === 401 && !path.includes('/login')) {
      await tokenStore.clear();
      router.replace('/(auth)/login');
      return { success: false, message: 'Invalid or expired token' };
    }

    const data = await res.json() as ApiResponse<T>;
    return data;
  } catch (error: any) {
    return { success: false, message: error.message || 'Network error' };
  }
}

export const authApi = {
  login: (body: { email: string; password: string }) =>
    request<AuthData>('/api/auth/login', { method: 'POST', body: JSON.stringify(body) }),

  register: (body: { name: string; email: string; password: string; dob: string; acceptTerms: boolean; acceptPrivacy: boolean }) =>
    request<AuthData>('/api/auth/register', { method: 'POST', body: JSON.stringify(body) }),

  practitionerLogin: (email: string, password: string) =>
    request<{ practitioner: any; accessToken: string; refreshToken: string; role: string }>(
      '/api/auth/practitioner/login',
      { method: 'POST', body: JSON.stringify({ email, password }) }
    ),
};

export const usersApi = {
  getProfile: () =>
    request<{ user: UserProfile }>('/api/users/me'),
};

export const practitionersApi = {
  list: (params: { search?: string; specialty?: string; page?: number; limit?: number } = {}) => {
    const q = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => { if (v !== undefined && v !== '') q.set(k, String(v)); });
    return request<{ practitioners: PractitionerProfile[] }>(`/api/practitioners?${q}`);
  },

  get: (id: string) =>
    request<{ practitioner: PractitionerProfile }>(`/api/practitioners/${id}`),
};

export const sessionsApi = {
  userHistory: () =>
    request<{ sessions: any[] }>('/api/sessions/user/history'),
};
