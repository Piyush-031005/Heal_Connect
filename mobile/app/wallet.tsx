import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { walletApi } from '../lib/api';
import { ArrowLeft, Wallet, CreditCard, ChevronRight, CheckCircle2 } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { useCurrencyStore } from '../store/useCurrencyStore';

const RECHARGE_AMOUNTS = [10, 20, 50, 100, 200];
const PURPLE = "#8B5CF6";
const TEXT = "#1E1035";

export default function WalletScreen() {
  const router = useRouter();
  const [balance, setBalance] = useState<number>(0);
  const [currency, setCurrency] = useState<string>('GBP');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [recharging, setRecharging] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number>(20);

  const fetchWallet = async () => {
    try {
      const res = await walletApi.get();
      if (res.success && res.data?.wallet) {
        setBalance(res.data.wallet.balance);
        setCurrency(res.data.wallet.currency);
        setTransactions(res.data.wallet.transactions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const { format, currencyCode, initCurrency } = useCurrencyStore();

  useEffect(() => {
    initCurrency();
    fetchWallet();
  }, []);

  const handleRecharge = async () => {
    try {
      setRecharging(true);
      const res = await walletApi.rechargeStripe(selectedAmount);
      if (res.success && res.data?.url) {
        // Open Stripe Checkout in the mobile browser
        const result = await WebBrowser.openBrowserAsync(res.data.url);
        // Refresh wallet when user returns
        fetchWallet();
      } else {
        alert(res.message || 'Failed to initialize payment');
      }
    } catch (e: any) {
      alert(e.message || 'Error occurred');
    } finally {
      setRecharging(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={TEXT} />
        </TouchableOpacity>
        <Text style={styles.title}>My Wallet</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Balance Card */}
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>{currencyCode === 'GBP' ? `£${balance.toFixed(2)}` : format(balance)}</Text>
        </View>

        {/* Add Funds Section */}
        <View style={styles.rechargeSection}>
          <Text style={styles.sectionTitle}>Add Funds</Text>
          <Text style={styles.sectionSubtitle}>Select an amount to recharge your wallet via Stripe</Text>
          
          <View style={styles.amountGrid}>
            {RECHARGE_AMOUNTS.map((amt) => (
              <TouchableOpacity 
                key={amt} 
                style={[styles.amountBtn, selectedAmount === amt && styles.amountBtnSelected]}
                onPress={() => setSelectedAmount(amt)}
              >
                <Text style={[styles.amountText, selectedAmount === amt && styles.amountTextSelected]}>
                  £{amt} {currencyCode !== 'GBP' && <Text style={{fontSize: 12}}>~{format(amt)}</Text>}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.rechargeBtn} onPress={handleRecharge} disabled={recharging}>
            {recharging ? <ActivityIndicator color="#fff" /> : (
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <CreditCard size={20} color="#fff" style={{ marginRight: 8 }} />
                <Text style={styles.rechargeBtnText}>Proceed to Pay £{selectedAmount} {currencyCode !== 'GBP' ? `(~${format(selectedAmount)})` : ''}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.txSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {transactions.length === 0 ? (
            <Text style={styles.emptyText}>No recent transactions</Text>
          ) : (
            transactions.map((tx) => (
              <View key={tx.id} style={styles.txRow}>
                <View style={[styles.txIconWrap, tx.status === 'PENDING' && { opacity: 0.5 }]}>
                  {tx.type === 'RECHARGE' ? <CheckCircle2 color="#10B981" size={24}/> : <Wallet color="#6366f1" size={24}/>}
                </View>
                <View style={styles.txInfo}>
                  <Text style={[styles.txType, tx.status === 'PENDING' && { color: '#9ca3af' }]}>
                    {tx.type} {tx.status === 'PENDING' ? '(Pending)' : ''}
                  </Text>
                  <Text style={styles.txDate}>{new Date(tx.createdAt).toLocaleDateString()}</Text>
                </View>
                <Text style={[
                  styles.txAmount, 
                  tx.status === 'PENDING' ? { color: '#9ca3af' } : tx.type === 'RECHARGE' ? { color: '#10B981' } : { color: TEXT }
                ]}>
                  {tx.type === 'RECHARGE' ? '+' : '-'}{currencyCode === 'GBP' ? `£${tx.amount}` : format(tx.amount)}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    padding: 20, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee'
  },
  title: { fontSize: 18, fontWeight: 'bold', color: TEXT },
  content: { padding: 20 },
  balanceCard: {
    backgroundColor: PURPLE,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
    marginBottom: 30,
  },
  balanceLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 16, fontWeight: '600', marginBottom: 8 },
  balanceAmount: { color: '#fff', fontSize: 42, fontWeight: '900' },
  rechargeSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 30,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: TEXT, marginBottom: 4 },
  sectionSubtitle: { fontSize: 14, color: '#666', marginBottom: 20 },
  amountGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  amountBtn: {
    paddingVertical: 12, paddingHorizontal: 20,
    borderRadius: 12, borderWidth: 1, borderColor: '#ddd', backgroundColor: '#fff',
  },
  amountBtnSelected: { borderColor: PURPLE, backgroundColor: '#F3E8FF' },
  amountText: { fontSize: 16, fontWeight: '600', color: '#666' },
  amountTextSelected: { color: PURPLE, fontWeight: 'bold' },
  rechargeBtn: {
    backgroundColor: PURPLE, borderRadius: 12, height: 56, justifyContent: 'center', alignItems: 'center'
  },
  rechargeBtnText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  txSection: {},
  emptyText: { color: '#999', marginTop: 10, fontStyle: 'italic' },
  txRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', padding: 16, borderRadius: 12, marginBottom: 12,
  },
  txIconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3F4F6', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  txInfo: { flex: 1 },
  txType: { fontSize: 15, fontWeight: 'bold', color: TEXT },
  txDate: { fontSize: 13, color: '#888', marginTop: 2 },
  txAmount: { fontSize: 16, fontWeight: 'bold' },
});
