import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Bell, Wallet } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { walletApi } from '../lib/api';

import { useCurrencyStore } from '../store/useCurrencyStore';

export default function WebReplicaHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [balance, setBalance] = React.useState<number>(0);
  const { format } = useCurrencyStore();

  React.useEffect(() => {
    walletApi.get().then(res => {
      if (res.success && res.data?.wallet) {
        setBalance(res.data.wallet.balance);
      }
    }).catch(() => {});
  }, []);

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 20) + 10 }]}>
      
      {/* Left: Hamburger Menu & Notifications */}
      <View style={styles.leftSection}>
        
        <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/notifications')}>
          <Bell size={20} color="#2d1b69" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
      </View>

      {/* Center: Logo */}
      <View style={styles.centerSection}>
        <Image 
          source={require('../assets/images/main_logo.png')} 
          style={styles.logoImage} 
        />
        <Text style={styles.logoText}>ZenAuraa</Text>
      </View>
      {/* Right: Actions */}
      <View style={styles.rightSection}>
        <TouchableOpacity onPress={() => router.push('/wallet')} style={{ flexDirection: "row", alignItems: "center", backgroundColor: "rgba(45, 27, 105, 0.1)", paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: "rgba(45, 27, 105, 0.2)", gap: 6 }}>
          <Wallet size={16} color="#2d1b69" />
          <Text style={{ fontFamily: "Inter_600SemiBold", fontSize: 13, color: "#2d1b69" }}>{format(balance)}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(45, 27, 105, 0.1)',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  iconButton: {
    padding: 4,
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 6,
  },
  logoText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 26,
    color: '#2d1b69',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  notificationButton: {
    padding: 4,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#F0E6F5',
  },
  freeInsightsPill: {
    backgroundColor: 'rgba(45, 27, 105, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 27, 105, 0.2)',
  },
  freeInsightsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#2d1b69',
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  langText: {
    fontSize: 10,
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  langCode: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#2d1b69',
    marginLeft: 2,
  }
});