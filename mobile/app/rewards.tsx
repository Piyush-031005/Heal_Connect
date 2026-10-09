import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Wallet2, TrendingUp, Gift, ChevronRight, Zap } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const dummyTransactions = [
  { id: '1', title: 'Consultation Bonus', points: '+50', date: 'Oct 12, 2026', type: 'earn' },
  { id: '2', title: 'Session Booking', points: '-150', date: 'Oct 05, 2026', type: 'spend' },
  { id: '3', title: 'Welcome Bonus', points: '+200', date: 'Sep 28, 2026', type: 'earn' },
];

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

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Balance Card */}
          <LinearGradient colors={['#4f46e5', '#7c3aed']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.balanceCard}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Wallet2 size={20} color="rgba(255,255,255,0.7)" />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
              <Text style={styles.balanceAmount}>2,450</Text>
              <Text style={styles.balanceCurrency}> pts</Text>
            </View>
            <TouchableOpacity style={styles.redeemBtn}>
              <Text style={styles.redeemText}>Redeem Now</Text>
              <ChevronRight size={16} color="#4f46e5" />
            </TouchableOpacity>
          </LinearGradient>

          {/* Quick Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <View style={[styles.iconWrap, { backgroundColor: '#e0e7ff' }]}>
                <TrendingUp size={20} color="#4f46e5" />
              </View>
              <Text style={styles.statLabel}>Total Earned</Text>
              <Text style={styles.statValue}>4,100 pts</Text>
            </View>
            <View style={styles.statBox}>
              <View style={[styles.iconWrap, { backgroundColor: '#fef3c7' }]}>
                <Gift size={20} color="#d97706" />
              </View>
              <Text style={styles.statLabel}>Rewards Claimed</Text>
              <Text style={styles.statValue}>3 Gifts</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>Recent Activity</Text>
          
          <View style={styles.transactionsWrap}>
            {dummyTransactions.map((tx, index) => (
              <View key={tx.id}>
                <View style={styles.txRow}>
                  <View style={styles.txLeft}>
                    <View style={[styles.txIcon, { backgroundColor: tx.type === 'earn' ? '#dcfce7' : '#fee2e2' }]}>
                      <Zap size={16} color={tx.type === 'earn' ? '#10b981' : '#ef4444'} />
                    </View>
                    <View>
                      <Text style={styles.txTitle}>{tx.title}</Text>
                      <Text style={styles.txDate}>{tx.date}</Text>
                    </View>
                  </View>
                  <Text style={[styles.txPoints, { color: tx.type === 'earn' ? '#10b981' : '#ef4444' }]}>{tx.points}</Text>
                </View>
                {index < dummyTransactions.length - 1 && <View style={styles.divider} />}
              </View>
            ))}
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
  balanceCard: { borderRadius: 32, padding: 24, marginBottom: 20, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 12 }, shadowOpacity: 0.3, shadowRadius: 24, elevation: 8 },
  balanceHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '600' },
  balanceAmount: { color: '#fff', fontSize: 48, fontWeight: '800', letterSpacing: -2 },
  balanceCurrency: { color: 'rgba(255,255,255,0.8)', fontSize: 20, fontWeight: '700', marginLeft: 4 },
  redeemBtn: { backgroundColor: '#fff', alignSelf: 'flex-start', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, flexDirection: 'row', alignItems: 'center', marginTop: 24 },
  redeemText: { color: '#4f46e5', fontWeight: '700', fontSize: 14, marginRight: 4 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 },
  statBox: { backgroundColor: '#fff', width: (width - 48) / 2, padding: 16, borderRadius: 24, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },
  iconWrap: { width: 40, height: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  statLabel: { fontSize: 13, color: '#64748b', fontWeight: '600', marginBottom: 4 },
  statValue: { fontSize: 18, color: '#0f172a', fontWeight: '800' },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1e1b4b', marginBottom: 16, marginLeft: 4 },
  transactionsWrap: { backgroundColor: '#fff', borderRadius: 24, padding: 20, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },
  txRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  txLeft: { flexDirection: 'row', alignItems: 'center' },
  txIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  txTitle: { fontSize: 15, fontWeight: '600', color: '#0f172a', marginBottom: 2 },
  txDate: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  txPoints: { fontSize: 16, fontWeight: '700' },
  divider: { height: 1, backgroundColor: '#f1f5f9', marginVertical: 16 }
});
