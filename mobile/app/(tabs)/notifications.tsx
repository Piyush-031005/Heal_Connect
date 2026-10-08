import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Bell, Wallet, CalendarHeart } from "lucide-react-native";
import WebReplicaHeader from "../../components/WebReplicaHeader";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />

      
      <WebReplicaHeader />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notifications</Text>
      </View>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 100 }}>
        <Bell size={48} color="#C2AEE8" style={{ marginBottom: 16 }} />
        <Text style={{ fontFamily: 'Inter_600SemiBold', fontSize: 18, color: '#4b5563', marginBottom: 8 }}>No new notifications</Text>
        <Text style={{ fontFamily: 'Inter_400Regular', fontSize: 14, color: '#9ca3af', textAlign: 'center', paddingHorizontal: 40 }}>
          When you get session updates or recharge alerts, they will appear here.
        </Text>
      </View>
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