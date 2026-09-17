import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Bell, Wallet, CalendarHeart } from "lucide-react-native";
import GhostFibers from "../../components/GhostFibers";
import WebReplicaHeader from "../../components/WebReplicaHeader";

export default function NotificationsScreen() {
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

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 100 }}>
        
        <View style={styles.notificationCard}>
          <View style={[styles.iconWrap, { backgroundColor: "#EEF2FF" }]}>
            <CalendarHeart size={20} color="#4F46E5" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifTitle}>Upcoming Session</Text>
            <Text style={styles.notifDesc}>Your session with Maya starts in 10 minutes.</Text>
            <Text style={styles.notifTime}>Just now</Text>
          </View>
        </View>

        <View style={[styles.notificationCard, { opacity: 0.7 }]}>
          <View style={[styles.iconWrap, { backgroundColor: "#FEF3C7" }]}>
            <Wallet size={20} color="#D97706" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifTitle}>Recharge Successful</Text>
            <Text style={styles.notifDesc}>₹500 has been added to your wallet.</Text>
            <Text style={styles.notifTime}>2 hours ago</Text>
          </View>
        </View>

        <View style={[styles.notificationCard, { opacity: 0.7 }]}>
          <View style={[styles.iconWrap, { backgroundColor: "#F5F3FF" }]}>
            <Bell size={20} color="#7C3AED" />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.notifTitle}>New Expert Available</Text>
            <Text style={styles.notifDesc}>Arun is now online for Tarot readings.</Text>
            <Text style={styles.notifTime}>Yesterday</Text>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: { padding: 20 },
  headerTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: "#1a1a1a" },
  notificationCard: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "#f3f4f6", alignItems: "center", gap: 16 },
  iconWrap: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  notifTitle: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: "#111827", marginBottom: 4 },
  notifDesc: { fontFamily: 'Inter_400Regular', fontSize: 13, color: "#4b5563", marginBottom: 6 },
  notifTime: { fontFamily: 'Inter_400Regular', fontSize: 11, color: "#9ca3af" },
});