import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, LayoutAnimation, Platform, UIManager } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const faqs = [
  { id: '1', q: 'How do I book a session?', a: 'You can book a session by navigating to the Explore tab, selecting a practitioner, and choosing an available time slot that works for you.' },
  { id: '2', q: 'What payment methods are accepted?', a: 'We accept all major credit cards, Apple Pay, Google Pay, and our own Zenauraa Rewards points.' },
  { id: '3', q: 'How do I cancel a session?', a: 'Go to the Sessions tab, select your upcoming session, and tap Cancel. Please note our 24-hour cancellation policy.' },
  { id: '4', q: 'Are my sessions confidential?', a: 'Yes, all video, audio, and chat sessions are end-to-end encrypted and completely confidential.' },
  { id: '5', q: 'How do rewards points work?', a: 'You earn points for every session you attend. You can redeem these points for discounts on future bookings or gift them to friends.' }
];

export default function FAQScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedId(expandedId === id ? null : id);
  };
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F9F5FF', '#fffbf0', '#fff']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>FAQ</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>Frequently Asked Questions</Text>
          <Text style={styles.desc}>Find answers to common questions about using Zenauraa.</Text>

          <View style={styles.list}>
            {faqs.map(item => {
              const isExpanded = expandedId === item.id;
              return (
                <TouchableOpacity 
                  key={item.id} 
                  style={[styles.faqCard, isExpanded && styles.faqCardExpanded]} 
                  activeOpacity={0.7}
                  onPress={() => toggleExpand(item.id)}
                >
                  <View style={styles.qRow}>
                    <Text style={[styles.qText, isExpanded && { color: '#4f46e5' }]}>{item.q}</Text>
                    {isExpanded ? <ChevronUp size={20} color="#4f46e5" /> : <ChevronDown size={20} color="#94a3b8" />}
                  </View>
                  {isExpanded && (
                    <Text style={styles.aText}>{item.a}</Text>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
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
  scrollContent: { padding: 16, paddingBottom: 40 },
  subtitle: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 8 },
  desc: { fontSize: 15, color: '#64748b', marginBottom: 24, lineHeight: 22 },
  list: { gap: 12 },
  faqCard: { backgroundColor: '#fff', borderRadius: 20, padding: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 2 },
  faqCardExpanded: { borderColor: '#e0e7ff', backgroundColor: '#fafaff' },
  qRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  qText: { fontSize: 15, fontWeight: '600', color: '#1e293b', flex: 1, paddingRight: 16, lineHeight: 20 },
  aText: { fontSize: 14, color: '#475569', marginTop: 12, lineHeight: 22 }
});
