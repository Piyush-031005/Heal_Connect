import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Bell, ArrowLeft } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />

      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
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
  header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 16 },
  headerTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: "#1a1a1a" },
});
