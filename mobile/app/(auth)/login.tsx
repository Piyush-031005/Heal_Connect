import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { authApi, tokenStore } from '../../lib/api';
import * as SecureStore from 'expo-secure-store';

type Role = 'user' | 'expert';
type Mode = 'login' | 'forgot';

const PURPLE = '#7C3AED';
const PURPLE_DARK = '#5B21B6';
const PURPLE_LIGHT = '#EDE9FE';
const LAVENDER = '#A78BFA';
const BG = '#0F0B2A';
const CARD_BG = 'rgba(255,255,255,0.06)';
const BORDER = 'rgba(167₹39,250,0.3)';
const TEXT = '#F5F3FF';
const TEXT_MUTED = 'rgba(245,243,255,0.6)';

export default function LoginScreen() {
  const router = useRouter();

  const [role, setRole] = useState<Role>('user');
  const [mode, setMode] = useState<Mode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    if (!email || !password) { setError('Please fill in all fields'); return; }
    setError('');
    setLoading(true);
    try {
      if (role === 'expert') {
        const res = await authApi.practitionerLogin(email, password);
        if (!res.success || !res.data) { setError(res.message || 'Login failed'); return; }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        await SecureStore.setItemAsync('hc_role', 'practitioner');
        await SecureStore.setItemAsync('hc_practitioner_id', res.data.practitioner.id);
        router.replace('/(tabs)');
      } else {
        const res = await authApi.login({ email, password });
        if (!res.success || !res.data) { setError(res.message || 'Login failed'); return; }
        tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        await SecureStore.setItemAsync('hc_role', 'user');
        router.replace('/(tabs)');
      }
    } catch { setError('Something went wrong. Please try again.'); }
    finally { setLoading(false); }
  };

  const handleForgotPassword = async () => {
    if (!email) { setError('Enter your email first'); return; }
    setError('');
    setLoading(true);
    try {
      await authApi.forgotPassword(email);
      setSuccess('Reset link sent! Check your email.');
    } catch { setError('Failed to send reset email.'); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="light-content" backgroundColor={BG} />

      {/* Gradient glow orbs */}
      <View style={{ position: 'absolute', top: -80, left: -80, width: 300, height: 300, borderRadius: 150, backgroundColor: 'rgba(124,58,237,0.25)', opacity: 0.8 }} />
      <View style={{ position: 'absolute', top: 200, right: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(79,70,229,0.2)', opacity: 0.7 }} />

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 }} keyboardShouldPersistTaps="handled">

          {/* Logo area */}
          <View style={{ alignItems: 'center', marginBottom: 36 }}>
            <View style={{ width: 64, height: 64, borderRadius: 20, backgroundColor: PURPLE, alignItems: 'center', justifyContent: 'center', marginBottom: 16, shadowColor: PURPLE, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 10 }}>
              <Text style={{ fontSize: 28 }}>✦</Text>
            </View>
            <Text style={{ fontSize: 28, fontWeight: '800', color: TEXT, letterSpacing: -0.5 }}>ZenAuraa</Text>
            <Text style={{ fontSize: 14, color: TEXT_MUTED, marginTop: 4 }}>
              {mode === 'login' ? 'Welcome back, begin your journey' : 'Reset your password'}
            </Text>
          </View>

          {/* Role toggle */}
          {mode === 'login' && (
            <View style={{ flexDirection: 'row', backgroundColor: CARD_BG, borderRadius: 16, padding: 4, marginBottom: 24, borderWidth: 1, borderColor: BORDER }}>
              {(['user', 'expert'] as Role[]).map((r) => (
                <TouchableOpacity
                  key={r}
                  onPress={() => { setRole(r); setError(''); }}
                  style={{
                    flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: 'center',
                    backgroundColor: role === r ? PURPLE : 'transparent',
                    shadowColor: role === r ? PURPLE : 'transparent',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: role === r ? 0.5 : 0,
                    shadowRadius: 8, elevation: role === r ? 6 : 0,
                  }}
                >
                  <Text style={{ fontWeight: '700', fontSize: 14, color: role === r ? '#fff' : TEXT_MUTED }}>
                    {r === 'user' ? '⊙ User' : '✦ Expert'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Error / success */}
          {error !== '' && (
            <View style={{ backgroundColor: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.4)', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <Text style={{ color: '#FCA5A5', fontSize: 13, textAlign: 'center' }}>{error}</Text>
            </View>
          )}
          {success !== '' && (
            <View style={{ backgroundColor: 'rgba(52,211₹53,0.15)', borderColor: 'rgba(52,211₹53,0.4)', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <Text style={{ color: '#6EE7B7', fontSize: 13, textAlign: 'center' }}>{success}</Text>
            </View>
          )}

          {/* Login form */}
          {mode === 'login' && (
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ fontSize: 13, fontWeight: '600', color: TEXT_MUTED, marginBottom: 8, marginLeft: 4 }}>Email address</Text>
                <TextInput
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(167₹39,250,0.4)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 14, paddingHorizontal: 18, height: 56, color: TEXT, fontSize: 15 }}
                />
              </View>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 4 }}>
                  <Text style={{ fontSize: 13, fontWeight: '600', color: TEXT_MUTED }}>Password</Text>
                  <TouchableOpacity onPress={() => setMode('forgot')}>
                    <Text style={{ fontSize: 13, color: LAVENDER, fontWeight: '600' }}>Forgot password?</Text>
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder="••••••••"
                  placeholderTextColor="rgba(167₹39,250,0.4)"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 14, paddingHorizontal: 18, height: 56, color: TEXT, fontSize: 15 }}
                />
              </View>
              <TouchableOpacity
                onPress={handleLogin}
                disabled={loading}
                style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 8, shadowColor: PURPLE, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 16, elevation: 10 }}
              >
                {loading ? <ActivityIndicator color="white" /> : (
                  <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>
                    {role === 'expert' ? 'Log in as Expert →' : 'Log in →'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          )}

          {/* Forgot password form */}
          {mode === 'forgot' && (
            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ fontSize: 13, fontWeight: '600', color: TEXT_MUTED, marginBottom: 8, marginLeft: 4 }}>Email address</Text>
                <TextInput
                  placeholder="you@example.com"
                  placeholderTextColor="rgba(167₹39,250,0.4)"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 14, paddingHorizontal: 18, height: 56, color: TEXT, fontSize: 15 }}
                />
              </View>
              <TouchableOpacity
                onPress={handleForgotPassword}
                disabled={loading}
                style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', shadowColor: PURPLE, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.5, shadowRadius: 16, elevation: 10 }}
              >
                {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: '#fff', fontWeight: '800', fontSize: 16 }}>Send Reset Link</Text>}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setMode('login'); setError(''); setSuccess(''); }} style={{ alignItems: 'center', paddingVertical: 8 }}>
                <Text style={{ color: LAVENDER, fontWeight: '600', fontSize: 14 }}>← Back to login</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Divider + Google */}
          {mode === 'login' && (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
                <View style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
                <Text style={{ marginHorizontal: 16, color: TEXT_MUTED, fontSize: 12, fontWeight: '600', letterSpacing: 1 }}>OR CONTINUE WITH</Text>
                <View style={{ flex: 1, height: 1, backgroundColor: BORDER }} />
              </View>
              <TouchableOpacity style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ color: TEXT, fontWeight: '700', fontSize: 15 }}>🌐  Continue with Google</Text>
              </TouchableOpacity>
              <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 28 }}>
                <Text style={{ color: TEXT_MUTED, fontSize: 14 }}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                  <Text style={{ color: LAVENDER, fontWeight: '700', fontSize: 14 }}>Sign up</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
