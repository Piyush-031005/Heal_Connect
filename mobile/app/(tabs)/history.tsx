import React, { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, Image, ActivityIndicator } from "react-native";
import { Clock, Phone, MessageCircle } from "lucide-react-native";
import WebReplicaHeader from "../../components/WebReplicaHeader";
import { sessionsApi } from "../../lib/api";

export default function HistoryScreen() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sessionsApi.userHistory().then((res) => {
      if (res.success && res.data?.sessions) {
        setSessions(res.data.sessions);
      }
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);
  return (
    <View style={styles.container}>
      
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />

      
      <WebReplicaHeader />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Past Sessions</Text>
      </View>

      <ScrollView style={{ zIndex: 2, elevation: 2 }} contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 100 }}>
        {loading ? (
          <ActivityIndicator size="large" color="#5F3BA9" style={{ marginTop: 40 }} />
        ) : sessions.length === 0 ? (
          <Text style={{ textAlign: 'center', color: '#6b7280', marginTop: 40 }}>No past sessions found.</Text>
        ) : sessions.map((item) => (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={styles.avatar}>
                  <Image source={{ uri: item.practitioner?.photoUrl || "https://i.pravatar.cc/150?img=47" }} style={{ width: 80, height: 80, marginLeft: -20, marginTop: -20 }} />
                </View>
                <View>
                  <Text style={styles.name}>{item.practitioner?.name || 'Expert'}</Text>
                  <Text style={styles.role}>{item.practitioner?.specialties?.[0] || 'Astrologer'}</Text>
                </View>
              </View>
              <View style={styles.iconBadge}>
                {item.type === 'call' ? <Phone size={14} color="#fff" /> : <MessageCircle size={14} color="#fff" />}
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.dateText}>
                  {new Date(item.startTime || item.createdAt).toLocaleDateString()} • {Math.round((item.durationSeconds || 0) / 60)} mins
                </Text>
              </View>
              <Text style={styles.price}>₹{item.cost?.toFixed(2) || '0.00'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: { padding: 20 },
  headerTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: "#1a1a1a" },
  card: { backgroundColor: "rgba(255,255,255,0.9)", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "#f3f4f6" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden", backgroundColor: "#f9fafb" },
  name: { fontFamily: 'Inter_700Bold', fontSize: 16, color: "#111827" },
  role: { fontFamily: 'Inter_400Regular', fontSize: 13, color: "#6b7280" },
  iconBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: "#7C3AED", alignItems: "center", justifyContent: "center" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTopWidth: 1, borderTopColor: "#e5e7eb" },
  dateText: { fontFamily: 'Inter_400Regular', fontSize: 13, color: "#6b7280" },
  price: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: "#7C3AED" },
});