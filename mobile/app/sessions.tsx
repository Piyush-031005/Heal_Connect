import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, PhoneCall, MessageCircle, Calendar, Clock, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const dummySessions = [
  { id: '1', expert: 'Dr. Sarah Wellness', type: 'call', date: 'Oct 12, 2026', time: '10:00 AM', status: 'Upcoming', duration: '30 min' },
  { id: '2', expert: 'Guru Ananda', type: 'chat', date: 'Oct 05, 2026', time: '02:30 PM', status: 'Completed', duration: '45 min' },
  { id: '3', expert: 'Jane Doe Therapist', type: 'call', date: 'Sep 28, 2026', time: '11:15 AM', status: 'Completed', duration: '15 min' },
];

export default function SessionsScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F9F5FF', '#fffbf0', '#fff']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>My Sessions</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {dummySessions.map((s, index) => (
            <TouchableOpacity key={s.id} style={styles.card} activeOpacity={0.7}>
              <View style={styles.cardHeader}>
                <View style={styles.expertInfo}>
                  <View style={[styles.iconWrap, { backgroundColor: s.type === 'call' ? '#e0e7ff' : '#fef3c7' }]}>
                    {s.type === 'call' ? <PhoneCall size={20} color="#4f46e5" /> : <MessageCircle size={20} color="#d97706" />}
                  </View>
                  <View style={{ marginLeft: 12 }}>
                    <Text style={styles.expertName}>{s.expert}</Text>
                    <View style={styles.statusRow}>
                      <View style={[styles.statusDot, { backgroundColor: s.status === 'Upcoming' ? '#10b981' : '#94a3b8' }]} />
                      <Text style={styles.statusText}>{s.status}</Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={20} color="#cbd5e1" />
              </View>

              <View style={styles.divider} />

              <View style={styles.cardFooter}>
                <View style={styles.detailItem}>
                  <Calendar size={14} color="#64748b" />
                  <Text style={styles.detailText}>{s.date}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Clock size={14} color="#64748b" />
                  <Text style={styles.detailText}>{s.time} ({s.duration})</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
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
  card: { backgroundColor: '#fff', borderRadius: 24, padding: 16, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  expertInfo: { flexDirection: 'row', alignItems: 'center' },
  iconWrap: { width: 48, height: 48, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  expertName: { fontSize: 16, fontWeight: '700', color: '#0f172a', marginBottom: 4 },
  statusRow: { flexDirection: 'row', alignItems: 'center' },
  statusDot: { width: 6, height: 6, borderRadius: 3, marginRight: 6 },
  statusText: { fontSize: 13, fontWeight: '600', color: '#64748b' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginBottom: 12 },
  cardFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  detailItem: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#f8fafc', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12 },
  detailText: { fontSize: 13, fontWeight: '600', color: '#475569', marginLeft: 6 }
});
