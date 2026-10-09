import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Image, ActivityIndicator, Modal, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { authApi, tokenStore } from '../../lib/api';
import GhostFibers from '../../components/GhostFibers';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';

WebBrowser.maybeCompleteAuthSession();

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

const COUNTRIES = [
  { name: 'India', code: '+91', flag: '🇮🇳' },
  { name: 'United States', code: '+1', flag: '🇺🇸' },
  { name: 'United Kingdom', code: '+44', flag: '🇬🇧' },
  { name: 'Canada', code: '+1', flag: '🇨🇦' },
  { name: 'Australia', code: '+61', flag: '🇦🇺' },
  { name: 'Germany', code: '+49', flag: '🇩🇪' },
  { name: 'France', code: '+33', flag: '🇫🇷' },
  { name: 'United Arab Emirates', code: '+971', flag: '🇦🇪' },
  { name: 'Singapore', code: '+65', flag: '🇸🇬' },
  { name: 'South Africa', code: '+27', flag: '🇿🇦' },
  { name: 'Brazil', code: '+55', flag: '🇧🇷' },
  { name: 'Mexico', code: '+52', flag: '🇲🇽' },
];

export default function LoginScreen() {
  const router = useRouter();
  const { initialize } = useAuth();
  
  const [role, setRole] = useState<Role>('user');
  const [mode, setMode] = useState<'login' | 'forgot' | 'phone'>('login');
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
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

  const handlePhoneLogin = async () => {
    if (!phone) { setError('Please enter a phone number'); return; }
    setError('');
    setLoading(true);
    const fullPhone = phone.startsWith('+') ? phone : selectedCountry.code + phone.trim();
    try {
      if (role === 'expert') {
        const res = await authApi.practitionerSendOtp(fullPhone);
        if (res.success || (res as any).code === 200 || !res.message) {
          router.push(`/(auth)/verify-otp?phone=${encodeURIComponent(fullPhone)}&type=login&role=expert`);
        } else {
          setError(res.message || 'Failed to send OTP');
        }
      } else {
        const res = await authApi.sendOtp(fullPhone);
        if (res.success || (res as any).code === 200 || !res.message) {
          router.push(`/(auth)/verify-otp?phone=${encodeURIComponent(fullPhone)}&type=login&role=user`);
        } else {
          setError(res.message || 'Failed to send OTP');
        }
      }
    } catch (e: any) {
      setError(e.message || 'Error sending OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      const clientId = process.env.EXPO_PUBLIC_GOOGLE_CLIENT_ID || 'dummy';
      
      const redirectUri = AuthSession.makeRedirectUri();
      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=id_token&scope=${encodeURIComponent('openid email profile')}&state=${role === 'expert' ? 'expert_login' : 'user_login'}&nonce=expo123`;
      
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUri);
      
      if (result.type === 'success' && result.url) {
        const urlObj = new URL(result.url.replace('#', '?'));
        const idToken = urlObj.searchParams.get('id_token') || urlObj.searchParams.get('access_token');
        
        if (idToken) {
          const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL || ''}/api/auth/google`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ idToken, state: role === 'expert' ? 'expert_login' : 'user_login' })
          });
          const data = await res.json();
          if (data.success && data.data) {
            await tokenStore.setTokens(data.data.accessToken, data.data.refreshToken);
            await tokenStore.setRole(data.data.role || role);
            await initialize();
            router.replace('/(tabs)');
          } else {
            setError(data.message || 'Google login failed');
          }
        } else {
           setError('Failed to extract Google ID token');
        }
      }
    } catch (e: any) {
      setError('Google sign in error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EDE9FE' }}>
      {/* Full-screen fibers — behind AND bleeding into the card */}
      <GhostFibers
          lineColor="#6D28D9"
          glowColor="#8B5CF6"
          speed={0.2}
          scale={1.5}
          rotation={0}
          rotationSpeed={0.1}
          layers={6}
          waveAmplitude={0.015}
          waveFrequency={2}
          waveSpeed={0.2}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.5}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={8}
          glowIntensity={2}
          brightness={1.5}
          blueBoost={1.2}
          lightMode={true}
        />
      
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center', paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          {/* Glassmorphism card — transparent enough for fibers to show through */}
          <View style={{
            backgroundColor: 'rgba(255, 255, 255, 0.25)',
            padding: 24,
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
              <GhostFibers
          lineColor="#6D28D9"
          glowColor="#8B5CF6"
          speed={0.2}
          scale={1.5}
          rotation={0}
          rotationSpeed={0.1}
          layers={6}
          waveAmplitude={0.015}
          waveFrequency={2}
          waveSpeed={0.2}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.5}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={8}
          glowIntensity={2}
          brightness={1.5}
          blueBoost={1.2}
          lightMode={true}
        />
            </View>

            {/* Logo */}
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <View style={{ width: 70, height: 70, borderRadius: 35, backgroundColor: 'rgba(255,255,255,0.6)', alignItems: 'center', justifyContent: 'center', marginBottom: 12, borderWidth: 2, borderColor: 'rgba(124, 58, 237, 0.3)' }}>
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
                    style={{ backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
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
                    style={{ backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
                  />
                </View>
                <TouchableOpacity
                  onPress={handleLogin}
                  disabled={loading}
                  style={{ backgroundColor: PURPLE, borderRadius: 12, height: 52, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 8 }}
                >
                  {loading ? <ActivityIndicator color="white" /> : (
                    <>
                      <Text style={{ color: '#fff', fontWeight: '700', fontSize: 16, marginRight: 8 }}>
                        {role === 'expert' ? 'Log in as Expert' : 'Log in'}
                      </Text>
                      <Text style={{ color: '#fff', fontSize: 16 }}>→</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {/* Phone login */}
            {mode === 'phone' && (
              <View style={{ gap: 16 }}>
                <View>
                  <Text style={{ fontSize: 13, fontWeight: '700', color: '#4C1D95', marginBottom: 8, marginLeft: 4 }}>Phone Number</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    <TouchableOpacity 
                      onPress={() => setShowCountryPicker(true)}
                      style={{ 
                        backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, 
                        paddingHorizontal: 16, height: 54, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 6
                      }}>
                      <Text style={{ fontSize: 18 }}>{selectedCountry.flag}</Text>
                      <Text style={{ color: '#1E1035', fontSize: 15, fontWeight: '700' }}>{selectedCountry.code}</Text>
                      <Text style={{ color: '#6D28D9', fontSize: 10, marginLeft: 2 }}>▼</Text>
                    </TouchableOpacity>
                    <TextInput
                      placeholder="9876543210"
                      placeholderTextColor="rgba(109,40,217,0.4)"
                      value={phone}
                      onChangeText={setPhone}
                      keyboardType="phone-pad"
                      style={{ flex: 1, backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
                    />
                  </View>
                </View>
                <TouchableOpacity
                  onPress={handlePhoneLogin}
                  disabled={loading}
                  style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', shadowColor: PURPLE, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 }}
                >
                  {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>Send OTP</Text>}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMode('login'); setError(''); setSuccess(''); }} style={{ alignItems: 'center', paddingVertical: 8 }}>
                  <Text style={{ color: PURPLE, fontWeight: '700', fontSize: 14 }}>← Back to Email Login</Text>
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
                    style={{ backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 15, fontWeight: '500' }}
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
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 16 }}>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(124,58,237,0.2)' }} />
                  <Text style={{ marginHorizontal: 16, color: '#7C3AED', fontSize: 12, fontWeight: '700', letterSpacing: 1, opacity: 0.8 }}>OR CONTINUE WITH</Text>
                  <View style={{ flex: 1, height: 1, backgroundColor: 'rgba(124,58,237,0.2)' }} />
                </View>
                
                <View style={{ gap: 10 }}>
                  <TouchableOpacity onPress={() => { setMode('phone'); setError(''); setSuccess(''); }} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 12, height: 48, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: 18, marginRight: 12 }}>📞</Text>
                    <Text style={{ color: '#1E1035', fontWeight: '600', fontSize: 15 }}>Continue with Phone</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleGoogleSignIn} disabled={loading} style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 12, height: 48, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    {loading ? <ActivityIndicator color={PURPLE} /> : (
                      <>
                        <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/1024px-Google_%22G%22_logo.svg.png" }} style={{ width: 20, height: 20, marginRight: 12 }} />
                        <Text style={{ color: '#1E1035', fontWeight: '600', fontSize: 15 }}>Continue with Google</Text>
                      </>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity style={{ backgroundColor: 'transparent', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 12, height: 48, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                    <Image source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/1024px-Apple_logo_black.svg.png" }} style={{ width: 20, height: 20, marginRight: 12, resizeMode: 'contain' }} />
                    <Text style={{ color: '#1E1035', fontWeight: '600', fontSize: 15 }}>Continue with Apple</Text>
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 24 }}>
                  <Text style={{ color: '#6D28D9', fontSize: 14, fontWeight: '500', opacity: 0.8 }}>Don't have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/(auth)/signup')}>
                    <Text style={{ color: '#F59E0B', fontWeight: '800', fontSize: 14 }}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
            {/* Country Picker Modal */}
            <Modal visible={showCountryPicker} animationType="slide" transparent={true} onRequestClose={() => setShowCountryPicker(false)}>
              <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                <View style={{ backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, height: '70%' }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <Text style={{ fontSize: 20, fontWeight: '800', color: '#1E1035' }}>Select Country</Text>
                    <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                      <Text style={{ fontSize: 20, color: '#6b7280', padding: 8 }}>✕</Text>
                    </TouchableOpacity>
                  </View>
                  <FlatList
                    data={COUNTRIES}
                    keyExtractor={(item) => item.code + item.name}
                    renderItem={({ item }) => (
                      <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' }}
                        onPress={() => { setSelectedCountry(item); setShowCountryPicker(false); }}
                      >
                        <Text style={{ fontSize: 24, marginRight: 16 }}>{item.flag}</Text>
                        <Text style={{ flex: 1, fontSize: 16, color: '#1E1035', fontWeight: '500' }}>{item.name}</Text>
                        <Text style={{ fontSize: 16, color: '#6b7280', fontWeight: '600' }}>{item.code}</Text>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </Modal>



          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}