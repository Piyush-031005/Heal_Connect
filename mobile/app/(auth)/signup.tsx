import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, SafeAreaView, 
  KeyboardAvoidingView, Platform, ScrollView, Alert, ActivityIndicator
} from 'react-native';
import { useRouter } from 'expo-router';
import { Shield, Mail, Lock, User, Check, Eye, EyeOff, ShieldCheck } from 'lucide-react-native';

import { authApi, tokenStore } from '../../lib/api';
import * as SecureStore from 'expo-secure-store';

export default function SignupScreen() {
  const router = useRouter();
  
  const [role, setRole] = useState<'user' | 'expert'>('user');
  const [loginMethod, setLoginMethod] = useState<'password' | 'otp'>('password');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [dob, setDob] = useState('');
  
  const [countryCode, setCountryCode] = useState('+91');
  const [phone, setPhone] = useState('');
  
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateAge = (dobString: string) => {
    // Basic YYYY-MM-DD validation
    if (!/^\d{4}-\d{2}-\d{2}$/.test(dobString)) {
      return false;
    }
    const dobDate = new Date(dobString);
    const minBirthDate = new Date();
    minBirthDate.setFullYear(minBirthDate.getFullYear() - 18);
    return !isNaN(dobDate.getTime()) && dobDate <= minBirthDate;
  };

  const handleSignup = async () => {
    setError('');

    if (!acceptTerms || !acceptPrivacy) {
      setError('Please accept the Terms of Service and Privacy Notice.');
      return;
    }

    if (loginMethod === 'password') {
      if (!name || !email || !password || !dob) {
        setError('Please fill in all fields.');
        return;
      }
      if (!validateAge(dob)) {
        setError('You must be at least 18 years old to create an account. Format: YYYY-MM-DD');
        return;
      }
    } else {
      if (!phone || !countryCode) {
        setError('Please enter your phone number.');
        return;
      }
    }

    if (role === 'expert') {
      Alert.alert('Expert Signup', 'Expert signup requires document verification. Please complete registration on our web portal.');
      return;
    }

    setLoading(true);

    try {
      if (loginMethod === 'password') {
        const res = await authApi.register({
          name,
          email,
          password,
          dob,
          acceptTerms,
          acceptPrivacy,
          
        });

        if (!res.success || !res.data) {
          throw new Error((res as any).errors?.length ? (res as any).errors.map((e: any) => e.message).join(' Â· ') : res.message || 'Signup failed');
        }

        await tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        await SecureStore.setItemAsync('hc_role', 'user');

        router.replace('/(tabs)');
      } else {
        // OTP flow
        const cleanPhone = countryCode + phone.replace(/\s+/g, '');
        const res = await (authApi as any).requestLoginOtp(cleanPhone, 'user');
        
        if (!res.success) {
          throw new Error(res.message || 'Failed to send OTP');
        }
        
        Alert.alert('Success', 'OTP sent successfully! (OTP verification screen coming soon)');
        // router.push(`/verify-otp?phone=${encodeURIComponent(cleanPhone)}`);
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const CustomCheckbox = ({ value, onValueChange, label }: { value: boolean, onValueChange: (v: boolean) => void, label: string }) => (
    <TouchableOpacity 
      activeOpacity={0.8}
      onPress={() => onValueChange(!value)} 
      className="flex-row items-start mb-3 pr-4"
    >
      <View className={`w-5 h-5 rounded border mt-0.5 mr-2 items-center justify-center ${value ? 'bg-[#4f46e5] border-[#4f46e5]' : 'border-gray-300 bg-white'}`}>
        {value && <Check size={14} color="white" strokeWidth={3} />}
      </View>
      <Text className="text-gray-600 text-sm flex-1 leading-5">{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#faf9f6]">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView contentContainerStyle={{ flexGrow: 1, padding: 24, paddingBottom: 40 }}>
          
          <View className="items-center mb-6 mt-2">
            <View className="bg-indigo-100 p-4 rounded-3xl mb-4">
              <ShieldCheck size={40} color="#4f46e5" />
            </View>
            <Text className="text-3xl font-black text-[#1a1a1a] tracking-tight">Create an account</Text>
            <Text className="text-gray-500 mt-2 font-medium">Sign up and get your first session free.</Text>
          </View>

          <View className="bg-white rounded-3xl p-6 border border-indigo-50 shadow-xl shadow-indigo-100/50 w-full max-w-md self-center">
            
            {error ? (
              <View className="bg-red-50 border border-red-200 p-3 rounded-xl mb-4">
                <Text className="text-red-700 font-semibold text-sm">{error}</Text>
              </View>
            ) : null}

            {/* Role Toggle */}
            <View className="mb-5">
              <Text className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2 ml-1">Account Type</Text>
              <View className="flex-row bg-[#faf9f6] border border-indigo-100 p-1 rounded-2xl">
                <TouchableOpacity 
                  onPress={() => setRole('user')}
                  className={`flex-1 py-3 items-center justify-center rounded-xl ${role === 'user' ? 'bg-[#4f46e5] shadow-md shadow-indigo-500/30' : ''}`}
                >
                  <Text className={`font-bold ${role === 'user' ? 'text-white' : 'text-gray-600'}`}>User</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setRole('expert')}
                  className={`flex-1 py-3 items-center justify-center rounded-xl ${role === 'expert' ? 'bg-[#4f46e5] shadow-md shadow-indigo-500/30' : ''}`}
                >
                  <Text className={`font-bold ${role === 'expert' ? 'text-white' : 'text-gray-600'}`}>Expert</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Method Toggle */}
            <View className="mb-6 items-center">
              <View className="flex-row bg-gray-50 border border-gray-200 p-0.5 rounded-lg">
                <TouchableOpacity 
                  onPress={() => setLoginMethod('password')}
                  className={`px-6 py-2 rounded-md ${loginMethod === 'password' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Text className={`text-sm font-semibold ${loginMethod === 'password' ? 'text-[#1a1a1a]' : 'text-gray-500'}`}>Email</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={() => setLoginMethod('otp')}
                  className={`px-6 py-2 rounded-md ${loginMethod === 'otp' ? 'bg-white shadow-sm' : ''}`}
                >
                  <Text className={`text-sm font-semibold ${loginMethod === 'otp' ? 'text-[#1a1a1a]' : 'text-gray-500'}`}>Phone</Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className="space-y-4">
              
              {loginMethod === 'otp' ? (
                <>
                  <View>
                    <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Phone Number</Text>
                    <View className="flex-row gap-2">
                      <TextInput 
                        value={countryCode}
                        onChangeText={setCountryCode}
                        className="w-20 bg-[#faf9f6] px-4 h-14 rounded-xl border border-indigo-100 text-[#1a1a1a] font-medium"
                      />
                      <TextInput 
                        placeholder="9876543210"
                        placeholderTextColor="#9ca3af"
                        value={phone}
                        onChangeText={setPhone}
                        keyboardType="phone-pad"
                        className="flex-1 bg-[#faf9f6] px-4 h-14 rounded-xl border border-indigo-100 text-[#1a1a1a] font-medium"
                      />
                    </View>
                  </View>
                </>
              ) : (
                <>
                  <View>
                    <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Full Name</Text>
                    <View className="relative justify-center">
                      <View className="absolute left-4 z-10"><User size={20} color="#9ca3af" /></View>
                      <TextInput 
                        placeholder="John Doe"
                        placeholderTextColor="#9ca3af"
                        value={name}
                        onChangeText={setName}
                        className="w-full bg-[#faf9f6] pl-12 pr-4 h-14 rounded-xl border border-indigo-100 text-[#1a1a1a] font-medium"
                      />
                    </View>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Email</Text>
                    <View className="relative justify-center">
                      <View className="absolute left-4 z-10"><Mail size={20} color="#9ca3af" /></View>
                      <TextInput 
                        placeholder="you@example.com"
                        placeholderTextColor="#9ca3af"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        className="w-full bg-[#faf9f6] pl-12 pr-4 h-14 rounded-xl border border-indigo-100 text-[#1a1a1a] font-medium"
                      />
                    </View>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Password</Text>
                    <View className="relative justify-center">
                      <View className="absolute left-4 z-10"><Lock size={20} color="#9ca3af" /></View>
                      <TextInput 
                        placeholder="Create a strong password"
                        placeholderTextColor="#9ca3af"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPassword}
                        className="w-full bg-[#faf9f6] pl-12 pr-12 h-14 rounded-xl border border-indigo-100 text-[#1a1a1a] font-medium"
                      />
                      <TouchableOpacity 
                        className="absolute right-4 z-10"
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff size={20} color="#9ca3af" /> : <Eye size={20} color="#9ca3af" />}
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View>
                    <Text className="text-sm font-semibold text-[#1a1a1a] mb-1.5 ml-1">Date of Birth <Text className="font-normal text-gray-400">(must be 18+)</Text></Text>
                    <TextInput 
                      placeholder="YYYY-MM-DD"
                      placeholderTextColor="#9ca3af"
                      value={dob}
                      onChangeText={setDob}
                      className="w-full bg-[#faf9f6] px-4 h-14 rounded-xl border border-indigo-100 text-[#1a1a1a] font-medium"
                    />
                  </View>
                </>
              )}

              <View className="mt-2 mb-2">
                <CustomCheckbox 
                  value={acceptTerms} 
                  onValueChange={setAcceptTerms} 
                  label="I agree to the Terms of Service" 
                />
                <CustomCheckbox 
                  value={acceptPrivacy} 
                  onValueChange={setAcceptPrivacy} 
                  label="I've read and acknowledge the Privacy Notice" 
                />
              </View>

              <TouchableOpacity 
                onPress={handleSignup}
                disabled={loading || !acceptTerms || !acceptPrivacy}
                className={`w-full h-14 rounded-full items-center justify-center mt-2 ${
                  (!acceptTerms || !acceptPrivacy) ? 'bg-indigo-300' : 'bg-[#4f46e5] shadow-lg shadow-indigo-500/30'
                }`}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg">
                    {loginMethod === 'otp' ? 'Send OTP' : 'Create Account'}
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-[1px] bg-indigo-50" />
              <Text className="mx-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">Or continue with</Text>
              <View className="flex-1 h-[1px] bg-indigo-50" />
            </View>

            <View className="space-y-3">
              <TouchableOpacity className="w-full h-14 bg-white border border-gray-200 rounded-xl items-center justify-center flex-row">
                <Text className="text-[#1a1a1a] font-bold text-base">Continue with Google</Text>
              </TouchableOpacity>
              <TouchableOpacity className="w-full h-14 bg-white border border-gray-200 rounded-xl items-center justify-center flex-row">
                <Text className="text-[#1a1a1a] font-bold text-base">Continue with Apple</Text>
              </TouchableOpacity>
            </View>

            <View className="items-center mt-8">
              <Text className="text-gray-500 text-sm font-medium">
                Already have an account?{' '}
                <Text 
                  onPress={() => router.push('/(auth)/login')}
                  className="text-[#4f46e5] font-bold"
                >
                  Log in
                </Text>
              </Text>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
