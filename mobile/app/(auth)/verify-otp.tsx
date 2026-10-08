import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../hooks/useAuth';
import { tokenStore } from '../../lib/api';
import GhostFibers from '../../components/GhostFibers';

const PURPLE = '#7C3AED';
const CARD_BG = 'rgba(255, 255, 255, 0.25)';
const API_URL = process.env.EXPO_PUBLIC_API_URL || '';

export default function VerifyOtpScreen() {
  const router = useRouter();
  const { phone, type, role } = useLocalSearchParams<{ phone: string, type: string, role: string }>();
  const { initialize } = useAuth();
  
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (!otp || otp.length < 4) {
      setError('Please enter a valid OTP');
      return;
    }
    setError('');
    setLoading(true);
    
    try {
      let endpoint = '';
      if (role === 'expert') {
        endpoint = '/api/auth/astrologer/verify-otp';
      } else {
        endpoint = '/api/auth/verify-otp';
      }

      const res = await fetch(`${API_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, otp, purpose: type }),
      });
      const data = await res.json();

      if (data.success && data.data) {
        await tokenStore.setTokens(data.data.accessToken, data.data.refreshToken);
        await tokenStore.setRole(role || 'user');
        await initialize();
        router.replace('/(tabs)');
      } else {
        setError(data.message || 'Verification failed. Invalid OTP.');
      }
    } catch (err: any) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#EDE9FE' }}>
      <GhostFibers
        lineColor="#6D28D9" glowColor="#8B5CF6" speed={0.2} scale={1.5} rotation={0} rotationSpeed={0.1}
        layers={6} waveAmplitude={0.015} waveFrequency={2} waveSpeed={0.2} layerSpeed={0.08}
        twist={0.1} twistFrequency={5} twistSpeed={1.5} lineFrequency={5} lineSpacing={2}
        lineSharpness={16} glowFalloff={8} glowIntensity={2} brightness={1.5} blueBoost={1.2} lightMode={true}
      />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20, justifyContent: 'center', paddingBottom: 40 }} showsVerticalScrollIndicator={false}>
          <View style={{
            backgroundColor: CARD_BG, padding: 32, borderRadius: 32, borderWidth: 1.5,
            borderColor: 'rgba(255, 255, 255, 0.5)', shadowColor: '#7C3AED', shadowOffset: { width: 0, height: 20 },
            shadowOpacity: 0.25, shadowRadius: 40, elevation: 16, overflow: 'hidden'
          }}>
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, borderRadius: 32, overflow: 'hidden' }}>
              <GhostFibers
                lineColor="#6D28D9" glowColor="#8B5CF6" speed={0.2} scale={1.5} rotation={0} rotationSpeed={0.1}
                layers={6} waveAmplitude={0.015} waveFrequency={2} waveSpeed={0.2} layerSpeed={0.08}
                twist={0.1} twistFrequency={5} twistSpeed={1.5} lineFrequency={5} lineSpacing={2}
                lineSharpness={16} glowFalloff={8} glowIntensity={2} brightness={1.5} blueBoost={1.2} lightMode={true}
              />
            </View>

            <View style={{ alignItems: 'center', marginBottom: 32 }}>
              <Text style={{ fontSize: 26, fontWeight: '900', color: PURPLE, letterSpacing: -0.5 }}>Verify Phone</Text>
              <Text style={{ fontSize: 14, color: '#6D28D9', marginTop: 8, fontWeight: '600', opacity: 0.8, textAlign: 'center' }}>
                Enter the OTP sent to {phone}
              </Text>
            </View>

            {error !== '' && (
              <View style={{ backgroundColor: 'rgba(239,68,68,0.15)', borderColor: 'rgba(239,68,68,0.3)', borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
                <Text style={{ color: '#DC2626', fontSize: 13, textAlign: 'center', fontWeight: '700' }}>{error}</Text>
              </View>
            )}

            <View style={{ gap: 16 }}>
              <View>
                <Text style={{ fontSize: 13, fontWeight: '700', color: '#4C1D95', marginBottom: 8, marginLeft: 4 }}>OTP Code</Text>
                <TextInput
                  placeholder="123456"
                  placeholderTextColor="rgba(109,40,217,0.4)"
                  value={otp}
                  onChangeText={setOtp}
                  keyboardType="number-pad"
                  style={{ backgroundColor: 'rgba(255,255,255,0.35)', borderWidth: 1, borderColor: 'rgba(124,58,237,0.2)', borderRadius: 14, paddingHorizontal: 18, height: 54, color: '#1E1035', fontSize: 18, fontWeight: '700', textAlign: 'center', letterSpacing: 4 }}
                />
              </View>

              <TouchableOpacity onPress={handleVerify} disabled={loading} style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: 'center', justifyContent: 'center', marginTop: 8, shadowColor: PURPLE, shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.6, shadowRadius: 20, elevation: 12 }}>
                {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: '#fff', fontWeight: '900', fontSize: 16 }}>Verify OTP</Text>}
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => router.back()} style={{ alignItems: 'center', paddingVertical: 8, marginTop: 8 }}>
                <Text style={{ color: PURPLE, fontWeight: '700', fontSize: 14 }}>← Change Phone Number</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
