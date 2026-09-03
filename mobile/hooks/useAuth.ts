import { create } from 'zustand';
import { usersApi, UserProfile, tokenStore } from '../lib/api';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

interface AuthState {
  user: UserProfile | null;
  role: 'user' | 'practitioner' | null;
  isLoading: boolean;
  isInitialized: boolean;
  
  initialize: () => Promise<void>;
  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuth = create<AuthState>((set, get) => ({
  user: null,
  role: null,
  isLoading: false,
  isInitialized: false,

  initialize: async () => {
    try {
      const token = await tokenStore.getAccess();
      if (!token) {
        set({ isInitialized: true });
        return;
      }

      const roleStr = await SecureStore.getItemAsync('hc_role');
      set({ role: roleStr as any });

      if (roleStr === 'user') {
        await get().fetchUser();
      } else {
        // We will fetch practitioner profile later
        set({ isInitialized: true });
      }
    } catch (error) {
      console.error('Failed to initialize auth', error);
      set({ isInitialized: true });
    }
  },

  fetchUser: async () => {
    set({ isLoading: true });
    try {
      const res = await usersApi.getProfile();
      if (res.success && res.data?.user) {
        set({ user: res.data.user });
      } else {
        // Token might be invalid
        await get().logout();
      }
    } catch (error) {
      console.error('Failed to fetch user', error);
    } finally {
      set({ isLoading: false, isInitialized: true });
    }
  },

  logout: async () => {
    await tokenStore.clear();
    set({ user: null, role: null });
    router.replace('/(auth)/login');
  }
}));
