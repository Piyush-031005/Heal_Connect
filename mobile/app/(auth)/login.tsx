import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield } from 'lucide-react-native';
import * as SecureStore from 'expo-secure-store';

type Role = 'user' | 'expert';
type Mode = 'login' | 'forgot';
type LoginMethod = 'password' | 'otp';

export default function LoginScreen() {
  const router = useRouter();
  
  const [role, setRole] = useState<Role>('user');
  const [mode, setMode] = useState<Mode>('login');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('password');
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const apiUrl = process.env.EXPO_PUBLIC_API_URL;
      const endpoint = role === 'expert' ? '/api/v1/auth/practitioner/login' : '/api/v1/auth/login';
      
      const res = await fetch(`${apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Login failed');
      }
      
      // Store token
      await SecureStore.setItemAsync('hc_access', data.data.accessToken);
      if (data.data.refreshToken) {
        await SecureStore.setItemAsync('hc_refresh', data.data.refreshToken);
      }
      await SecureStore.setItemAsync('hc_role', role === 'expert' ? 'practitioner' : 'user');
      
      // Navigate to tabs
      router.replace('/(tabs)');
      
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    Alert.alert('Google Sign-In', 'Google Sign-In will be implemented shortly.');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffbf0]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          
          {/* Header Branding */}
          <View className="items-center mb-8 mt-4">
            <View className="bg-amber-100 p-4 rounded-3xl mb-4">
              <Shield size={40} color="#d97706" />
            </View>
            <Text className="text-3xl font-black text-[#1a1a1a] tracking-tight">ZenAuraa</Text>
            <Text className="text-gray-500 mt-2 font-medium">Log in to your account</Text>
          </View>

          {/* White Card container just like web */}
          <View className="bg-white rounded-3xl p-6 border border-yellow-100 shadow-sm w-full max-w-md self-center">
            
            {error ? (
              <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4">
                <Text className="text-red-700 font-semibold text-sm">{error}</Text>
              </View>
            ) : null}

            {mode === 'login' && (
              <>
                {/* Role Toggle */}
                <View className="mb-5">
                  <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 ml-1">Account Type</Text>
                  <View className="flex-row bg-[#fffbf0] border-2 border-amber-500/20 p-1 rounded-2xl">
                    <TouchableOpacity 
                      onPress={() => setRole('user')}
                      className={`flex-1 py-3 items-center justify-center rounded-xl ${role === 'user' ? 'bg-amber-500 shadow-sm' : ''}`}
                    >
                      <Text className={`font-bold ${role === 'user' ? 'text-white' : 'text-gray-600'}`}>
                        {role === 'user' ? '✦ ' : ''}User
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => setRole('expert')}
                      className={`flex-1 py-3 items-center justify-center rounded-xl ${role === 'expert' ? 'bg-amber-500 shadow-sm' : ''}`}
                    >
                      <Text className={`font-bold ${role === 'expert' ? 'text-white' : 'text-gray-600'}`}>
                        {role === 'expert' ? '✦ ' : ''}Expert
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Login Method Toggle */}
                <View className="mb-5">
                  <Text className="text-xs font-semibold text-gray-400 mb-2 ml-1">Login Method</Text>
                  <View className="flex-row bg-gray-50 border border-gray-200 p-0.5 rounded-lg self-start">
                    <TouchableOpacity 
                      onPress={() => { setLoginMethod('password'); setError(''); }}
                      className={`px-6 py-2 rounded-md ${loginMethod === 'password' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Text className={`text-sm font-medium ${loginMethod === 'password' ? 'text-gray-900' : 'text-gray-500'}`}>Email</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                      onPress={() => { setLoginMethod('otp'); setError(''); }}
                      className={`px-6 py-2 rounded-md ${loginMethod === 'otp' ? 'bg-white shadow-sm' : ''}`}
                    >
                      <Text className={`text-sm font-medium ${loginMethod === 'otp' ? 'text-gray-900' : 'text-gray-500'}`}>Phone</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </>
            )}

            {mode === 'login' && loginMethod === 'password' && (
              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Email</Text>
                  <TextInput 
                    placeholder="you@example.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full bg-[#fffbf0] px-5 h-14 rounded-full border border-yellow-200 text-[#1a1a1a] font-medium"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>

                <View>
                  <View className="flex-row justify-between items-center mb-1.5 ml-1">
                    <Text className="text-sm font-semibold text-[#1a1a1a]">Password</Text>
                    <TouchableOpacity onPress={() => setMode('forgot')}>
                      <Text className="text-sm text-amber-500 font-medium">Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                  <TextInput 
                    placeholder="••••••••"
                    placeholderTextColor="#9ca3af"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    className="w-full bg-[#fffbf0] px-5 h-14 rounded-full border border-yellow-200 text-[#1a1a1a] font-medium"
                  />
                </View>

                <TouchableOpacity 
                  onPress={handleLogin}
                  disabled={loading}
                  className="w-full bg-amber-500 mt-4 h-14 rounded-full shadow-md shadow-amber-500/30 items-center justify-center flex-row"
                >
                  {loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Text className="text-white font-bold text-lg">Sign In</Text>
                  )}
                </TouchableOpacity>
              </View>
            )}

            {mode === 'login' && loginMethod === 'otp' && (
              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Phone Number</Text>
                  <TextInput 
                    placeholder="+919876543210"
                    placeholderTextColor="#9ca3af"
                    value={phone}
                    onChangeText={setPhone}
                    className="w-full bg-[#fffbf0] px-5 h-14 rounded-full border border-yellow-200 text-[#1a1a1a] font-medium"
                    keyboardType="phone-pad"
                  />
                </View>
                <TouchableOpacity 
                  disabled={loading}
                  className="w-full bg-amber-500 mt-4 h-14 rounded-full shadow-md shadow-amber-500/30 items-center justify-center"
                >
                  <Text className="text-white font-bold text-lg">Send OTP</Text>
                </TouchableOpacity>
              </View>
            )}

            {mode === 'forgot' && (
              <View className="space-y-4">
                <View>
                  <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Email</Text>
                  <TextInput 
                    placeholder="you@example.com"
                    placeholderTextColor="#9ca3af"
                    value={email}
                    onChangeText={setEmail}
                    className="w-full bg-[#fffbf0] px-5 h-14 rounded-full border border-yellow-200 text-[#1a1a1a] font-medium"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
                <TouchableOpacity 
                  disabled={loading}
                  className="w-full bg-amber-500 mt-4 h-14 rounded-full shadow-md shadow-amber-500/30 items-center justify-center"
                >
                  <Text className="text-white font-bold text-lg">Send Reset Link</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setMode('login'); setError(''); }} className="items-center mt-2">
                  <Text className="text-amber-500 font-medium">← Back to login</Text>
                </TouchableOpacity>
              </View>
            )}

            {mode === 'login' && (
              <>
                <View className="flex-row items-center my-6">
                  <View className="flex-1 h-px bg-amber-100" />
                  <Text className="mx-4 text-gray-400 font-medium text-xs tracking-wider">OR CONTINUE WITH</Text>
                  <View className="flex-1 h-px bg-amber-100" />
                </View>

                <TouchableOpacity 
                  onPress={handleGoogleSignIn}
                  className="w-full bg-white h-14 rounded-full border border-gray-200 shadow-sm items-center flex-row justify-center"
                >
                  <Text className="text-[#1a1a1a] font-bold text-base">Continue with Google</Text>
                </TouchableOpacity>

                <View className="items-center mt-6">
                  <Text className="text-gray-500 text-sm">
                    Don't have an account?{' '}
                    <Text className="text-amber-500 font-semibold">Sign up</Text>
                  </Text>
                </View>
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
