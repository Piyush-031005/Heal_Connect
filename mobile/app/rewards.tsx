import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Gift, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function RewardsScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F9F5FF', '#fffbf0', '#fff']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>My Rewards</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <LinearGradient colors={['#4f46e5', '#7c3aed']} style={styles.iconBg}>
              <Gift size={48} color="#fff" />
            </LinearGradient>
            <Sparkles size={24} color="#d97706" style={styles.sparkle1} />
            <Sparkles size={16} color="#4f46e5" style={styles.sparkle2} />
          </View>
          
          <Text style={styles.comingSoonTitle}>Coming Soon</Text>
          <Text style={styles.comingSoonDesc}>
            We're working on an exciting new rewards program! Soon you'll be able to earn points for consultations and redeem them for amazing gifts and discounts.
          </Text>
          
          <TouchableOpacity style={styles.returnBtn} onPress={() => router.back()}>
            <Text style={styles.returnBtnText}>Return to Profile</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { padding: 8, backgroundColor: '#fff', borderRadius: 20, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  title: { fontSize: 20, fontWeight: '800', color: '#1e1b4b', letterSpacing: -0.5 },
  
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 32, paddingBottom: 60 },
  iconContainer: { position: 'relative', marginBottom: 32 },
  iconBg: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 8 },
  sparkle1: { position: 'absolute', top: -10, right: -10 },
  sparkle2: { position: 'absolute', bottom: 10, left: -20 },
  
  comingSoonTitle: { fontSize: 28, fontWeight: '900', color: '#1e1b4b', letterSpacing: -0.5, marginBottom: 16 },
  comingSoonDesc: { fontSize: 16, color: '#64748b', textAlign: 'center', lineHeight: 24, marginBottom: 40 },
  
  returnBtn: { backgroundColor: '#4f46e5', paddingVertical: 16, paddingHorizontal: 32, borderRadius: 100, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 6 },
  returnBtnText: { color: '#fff', fontSize: 16, fontWeight: '700' }
});
