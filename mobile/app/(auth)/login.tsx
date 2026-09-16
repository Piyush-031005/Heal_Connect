import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { authApi, tokenStore } from '../../lib/api';
import GhostFibers from '../../components/GhostFibers';

type Role = 'user' | 'expert';

const PURPLE = '#7C3AED';
const LAVENDER = '#8B5CF6';
// Fully transparent background — fibers fill the whole screen
const BACKGROUND = 'transparent';
// Card is a frosted glassmorphism panel that fibers bleed through
const CARD_BG = 'rgba(255, 255, 255, 0.15)';
const CARD_BORDER = 'rgba(255, 255, 255, 0.35)';
const INPUT_BG = 'rgba(255, 255, 255, 0.65)';
const TEXT = '#1E1035';
const TEXT_LIGHT = '#ffffff';
const TEXT_MUTED = 'rgba(255,255,255,0.7)';

export default function LoginScreen() {
  const router = useRouter();
  const { initialize } = useAuth();
  
  const [role, setRole] = useState<Role>('user');
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    setError('');
    setLoading(true);
    try {
      let res;
      if (role === 'expert') {
        res = await authApi.practitionerLogin(email, password);
      } else {
        res = await authApi.login({ email, password });
      }

      if (res.success && res.data) {
        await tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        await tokenStore.setRole(role);
        await initialize();
        router.replace('/(tabs)');
      } else {
        setError(res.message || 'Failed to log in. Please check your credentials.');
      }
    } catch (err: any) {
      setError(err.message || 'Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    if (!email) { setError('Please enter your email address'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => { setLoading(false); setSuccess('Reset link sent to your email.'); }, 1500);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EDE9FE' }}>
      {/* Full-screen fibers — behind AND bleeding into the card */}
      <GhostFibers lineColor="#C084FC" glowColor="#9333EA" speed={0.3} scale={0.8} brightness={25.0} blueBoost={0.6} lightMode={true} layers={50} lineFrequency={60} lineSpacing={0.3} glowIntensity={25.0} />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center', paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Glassmorphism card — transparent enough for fibers to show through */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            padding: 32,
            borderRadius: 32,
            borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.5)',
            shadowColor: '#7C3AED',
            shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.25,
            shadowRadius: 40,
            elevation: 16,
            overflow: 'hidden',
          }}>

            {/* Inner fibers overlay for inside-the-card effect */}
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 32, overflow: 'hidden' }}>
              <GhostFibers lineColor="#DDD6FE" glowColor="#C084FC" speed={0.18} scale={0.6} brightness={25.0} blueBoost={0.3} lightMode={true} layers={50} lineFrequency={60} lineSpacing={0.3} glowIntensity={25.0} />
            </View>

            {/* Logo */}
            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center', marginBottom: 16, borderWidth: 2, borderColor: 'rgba(124, 58, 237, 0.3)' }}>
                <Image source={require('../../assets/images/main_logo.png')} style={{ width: 54, height: 54, resizeMode: 'contain', tintColor: PURPLE }} />
              </View>
              <Text style={{ fontSize: 30, fontWeight: '900', color: PURPLE, letterSpacing: -0.5 }}>ZenAuraa</Text>
              <Text style={{ fontSize: 14, color: '#6D28D9', marginTop: 4, fontWeight: '600', opacity: 0.8 }}>
                {mode === 'login' ? 'Welcome back — begin your journey' : 'Reset your password'}
              </Text>
            </View>

            {/* Role toggle */}
            {mode === 'login' && (
              <View style={{ flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 16, padding: 4, marginBottom: 24, borderWidth: 1, borderColor: 'rgba(255,255,255,0.4)' }}>
                {(['user', 'expert'] as Role[]).map((r) => (
                  <TouchableOpacity
                    key={r}
                    onPress={() => { setRole(r); setError(''); }}
                    style={{
                      flex: 1, paddingVertical: 11, borderRadius: 12, alignItems: 'center',
                      backgroundColor: role === r ? PURPLE : 'transparent',
                      shadowColor: role === r ? PURPLE : 'transparent',
                      shadowOffset: { width: 0, height: 4 },
                      shadowOpacity: role === r ? 0.5 : 0,
                      shadowRadius: 8, elevation: role === r ? 6 : 0,
                    }}
                  >
                    <Text style={{ fontWeight: '800', fontSize: 14, color: role === r ? '#fff' : '#5B21B6' }}>
                      {r === 'user' ? '👤 User' : '✨ Expert'}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Error / success */}
            {error !== '' && (
              <View style={{ backgroundColor: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.3)', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
                <Text style={{ color: '#DC2626', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>{error}</Text>
              </View>
            )}
            {success !== '' && (
              <View style={{ backgroundColor: 'rgba(16,185,129,0.15)', borderColor: 'rgba(16,185,129,0.3)', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
                <Text style={{ color: '#059669', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>{success}</Text>
              </View>
            )}

            {/* Login form */}
            {mode === 'login' && (
              <View style={{ gap: 16 }}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#4C1D95', marginBottom: 8, marginLeft: 4 }}>Email address</Text>
                  <TextInput
                    placeholder="you@example.com"
                    placeholderTextColor="rgba(109,40,217,0.4)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
                  />
                </View>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8, paddingHorizontal: 4 }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: '#4C1D95' }}>Password</Text>
                    <TouchableOpacity onPress={() => setMode('forgot')}>
                      <Text style={{ fontSize: 13, color: PURPLE, fontWeight: '700' }}>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput
                    placeholder="••••••••"
                    placeholderTextColor="rgba(109,40,217,0.4)"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 8, shadowColor: PURPLE, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 }}
                >
                  {loading ? <ActivityIndicator color="white" /> : (
                    <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16, letterSpacing: 0.5 }}>
                      {role === 'expert' ? 'Log in as Expert' : 'Log in'}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Forgot password */}
            {mode === 'forgot' && (
              <View style={{ gap: 16 }}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#4C1D95', marginBottom: 8, marginLeft: 4 }}>Email address</Text>
                  <TextInput
                    placeholder="you@example.com"
                    placeholderTextColor="rgba(109,40,217,0.4)"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    style={{ backgroundColor: 'rgba(255,255,255,0.75)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleForgotPassword}
                  disabled={loading}
                  style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', shadowColor: PURPLE, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 }}
                >
                  {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>Send Reset Link</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMode('login'); setError(''); setSuccess(''); }} style={{ alignItems: 'center', paddingVertical: 8 }}>
                  <Text style={{ color: PURPLE, fontWeight: '700', fontSize: 14 }}>← Back to login</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* OR + Google */}
            {mode === 'login' && (
              <>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 24 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(109,40,217,0.15)' }} />
                  <Text style={{ marginHorizontal: 16, color: '#6D28D9', fontSize: 12, fontWeight: '700', letterSpacing: 1, opacity: 0.7 }}>OR</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(109,40,217,0.15)' }} />
                </View>
                <TouchableOpacity style={{ backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1.5, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, height: 54, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                  <Text style={{ color: '#1E1035', fontWeight: '800', fontSize: 15 }}>Continue with Google</Text>
                </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 28 }}>
                  <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '500', opacity: 0.8 }}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                    <Text style={{ color: PURPLE, fontWeight: '900', fontSize: 14 }}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}