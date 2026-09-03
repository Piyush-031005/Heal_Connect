import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Shield } from 'lucide-react-native';

import { authApi, tokenStore } from '../../lib/api';
import * as SecureStore from 'expo-secure-store';

export default function SignupScreen() {
  const router = useRouter();
  
  const [role, setRole] = useState<'user' | 'expert'>('user');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (role === 'expert') {
      Alert.alert('Expert Signup', 'Expert signup must be completed through the web portal to upload your documents and complete the verification process.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await authApi.register({
        name,
        email,
        password,
        dob: new Date().toISOString(), // Default DOB for now since form doesn't have it
        acceptTerms: true,
        acceptPrivacy: true,
      });

      if (!res.success || !res.data) {
        throw new Error(res.message || 'Signup failed');
      }

      await tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
      await SecureStore.setItemAsync('hc_role', 'user');

      router.replace('/(tabs)');
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#fffbf0]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', padding: 24 }}>
          
          <View className="items-center mb-8 mt-4">
            <View className="bg-amber-100 p-4 rounded-3xl mb-4">
              <Shield size={40} color="#d97706" />
            </View>
            <Text className="text-3xl font-black text-[#1a1a1a] tracking-tight">Join ZenAuraa</Text>
            <Text className="text-gray-500 mt-2 font-medium">Create your account</Text>
          </View>

          <View className="bg-white rounded-3xl p-6 border border-yellow-100 shadow-sm w-full max-w-md self-center">
            
            {error ? (
              <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4">
                <Text className="text-red-700 font-semibold text-sm">{error}</Text>
              </View>
            ) : null}

            <View className="mb-5">
              <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 ml-1">Account Type</Text>
              <View className="flex-row bg-[#fffbf0] border-2 border-amber-500/20 p-1 rounded-2xl">
                <TouchableOpacity 
                  onPress={() => setRole('user')}
                  className={`flex-1 py-3 items-center justify-center rounded-xl ${role === 'user' ? 'bg-amber-500 shadow-sm' : ''}`}
                >
                  <Text className={`font-bold ${role === 'user' ? 'text-white' : 'text-gray-600'}`}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setRole('expert')}
                  className={`flex-1 py-3 items-center justify-center rounded-xl ${role === 'expert' ? 'bg-amber-500 shadow-sm' : ''}`}
                >
                  <Text className={`font-bold ${role === 'expert' ? 'text-white' : 'text-gray-600'}`}>Expert</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Full Name</Text>
                <TextInput 
                  placeholder="John Doe"
                  placeholderTextColor="#9ca3af"
                  value={name}
                  onChangeText={setName}
                  className="w-full bg-[#fffbf0] px-5 h-14 rounded-full border border-yellow-200 text-[#1a1a1a] font-medium"
                />
              </View>

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
                <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Password</Text>
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
                onPress={handleSignup}
                disabled={loading}
                className="w-full bg-amber-500 mt-4 h-14 rounded-full shadow-md shadow-amber-500/30 items-center justify-center"
              >
                <Text className="text-white font-bold text-lg">Sign Up</Text>
              </TouchableOpacity>
            </View>

            <View className="items-center mt-6">
              <Text className="text-gray-500 text-sm">
                Already have an account?{' '}
                <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
                  <Text className="text-amber-500 font-semibold">Log in</Text>
                </TouchableOpacity>
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
