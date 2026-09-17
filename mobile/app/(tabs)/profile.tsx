import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { User, Settings, Wallet, CircleHelp, LogOut, ChevronRight } from "lucide-react-native";
import GhostFibers from "../../components/GhostFibers";
import WebReplicaHeader from "../../components/WebReplicaHeader";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  const handleLogout = () => {
    router.replace("/(auth)/login");
  };

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <GhostFibers
          lineColor="#A78BFA"
          glowColor="#E5D9F2"
          speed={0.1}
          scale={2}
          rotation={0}
          rotationSpeed={0.1}
          layers={3}
          waveAmplitude={0.01}
          waveFrequency={2}
          waveSpeed={0.1}
          layerSpeed={0.05}
          twist={0.1}
          twistFrequency={3}
          twistSpeed={1}
          lineFrequency={3}
          lineSpacing={2}
          lineSharpness={10}
          glowFalloff={5}
          glowIntensity={1}
          brightness={1}
          blueBoost={1}
        />
      </View>
      
      <WebReplicaHeader />

      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarWrap}>
            <User size={40} color="#7C3AED" />
          </View>
          <View style={{ flex: 1, marginLeft: 16 }}>
            <Text style={styles.name}>Jane Doe</Text>
            <Text style={styles.phone}>+91 98765 43210</Text>
          </View>
          <TouchableOpacity style={styles.editBtn}>
            <Text style={styles.editBtnText}>Edit</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.walletCard}>
          <View>
            <Text style={styles.walletLabel}>Wallet Balance</Text>
            <Text style={styles.walletAmount}>₹1,250.00</Text>
          </View>
          <TouchableOpacity style={styles.rechargeBtn}>
            <Text style={styles.rechargeBtnText}>Recharge</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.menuSection}>
          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#F5F3FF' }]}>
              <Settings size={20} color="#7C3AED" />
            </View>
            <Text style={styles.menuText}>Settings</Text>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={[styles.menuIcon, { backgroundColor: '#F5F3FF' }]}>
              <CircleHelp size={20} color="#7C3AED" />
            </View>
            <Text style={styles.menuText}>Help & Support</Text>
            <ChevronRight size={20} color="#9ca3af" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
            <View style={[styles.menuIcon, { backgroundColor: '#FEF2F2' }]}>
              <LogOut size={20} color="#EF4444" />
            </View>
            <Text style={[styles.menuText, { color: '#EF4444' }]}>Log Out</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, backgroundColor: 'rgba(255,255,255,0.9)', padding: 16, borderRadius: 20, borderWidth: 1, borderColor: '#f3f4f6' },
  avatarWrap: { width: 70, height: 70, borderRadius: 35, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
  name: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: '#1a1a1a', marginBottom: 4 },
  phone: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#6b7280' },
  editBtn: { backgroundColor: '#f3f4f6', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  editBtnText: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#111827' },
  
  walletCard: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#2d1b69', padding: 24, borderRadius: 20, marginBottom: 30 },
  walletLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#A78BFA', marginBottom: 4 },
  walletAmount: { fontFamily: 'Inter_700Bold', fontSize: 28, color: '#FCD34D' },
  rechargeBtn: { backgroundColor: '#FCD34D', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 12 },
  rechargeBtnText: { fontFamily: 'Inter_700Bold', fontSize: 14, color: '#1a1a1a' },

  menuSection: { backgroundColor: 'rgba(255,255,255,0.9)', borderRadius: 20, borderWidth: 1, borderColor: '#f3f4f6', overflow: 'hidden' },
  menuItem: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },
  menuIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  menuText: { flex: 1, fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#111827' },
});