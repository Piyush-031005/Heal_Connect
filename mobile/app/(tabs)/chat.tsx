import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <Sparkles size={64} color="#6D28D9" />
          </View>
          <Text style={styles.title}>ZenAuraa AI</Text>
          <Text style={styles.subtitle}>
            Your personalized spiritual AI guide is meditating and gathering cosmic knowledge.
          </Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>COMING SOON</Text>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  content: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 24,
    margin: 24,
    shadowColor: '#5F3BA9',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 5,
  },
  iconContainer: {
    width: 120, height: 120, borderRadius: 60,
    backgroundColor: '#F3E8FF',
    justifyContent: 'center', alignItems: 'center',
    marginBottom: 24,
  },
  title: { fontSize: 28, fontWeight: '900', color: '#1E1035', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#6B5E80', textAlign: 'center', lineHeight: 24, marginBottom: 32 },
  badge: {
    backgroundColor: '#6D28D9',
    paddingVertical: 8, paddingHorizontal: 16,
    borderRadius: 20,
  },
  badgeText: { color: '#fff', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
});