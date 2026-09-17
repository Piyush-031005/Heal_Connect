import React from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { Clock, Phone, MessageCircle } from "lucide-react-native";
import GhostFibers from "../../components/GhostFibers";
import WebReplicaHeader from "../../components/WebReplicaHeader";

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />
<View style={StyleSheet.absoluteFillObject}>
        <GhostFibers
          lineColor="#6D28D9"
          glowColor="#8B5CF6"
          speed={0.2}
          scale={1.5}
          rotation={0}
          rotationSpeed={0.1}
          layers={6}
          waveAmplitude={0.015}
          waveFrequency={2}
          waveSpeed={0.2}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.5}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={8}
          glowIntensity={2}
          brightness={1.5}
          blueBoost={1.2}
          lightMode={true}
        />
      </View>
      
      <WebReplicaHeader />

      <View style={styles.header}>
        <Text style={styles.headerTitle}>Past Sessions</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16, paddingBottom: 100 }}>
        {[1, 2, 3].map((item) => (
          <View key={item} style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <View style={styles.avatar}>
                  <Image source={require("../../assets/images/expert_avatars.jpg")} style={{ width: 80, height: 80, marginLeft: -20, marginTop: -20 }} />
                </View>
                <View>
                  <Text style={styles.name}>Maya Sharma</Text>
                  <Text style={styles.role}>Astrologer</Text>
                </View>
              </View>
              <View style={styles.iconBadge}>
                {item % 2 === 0 ? <Phone size={14} color="#fff" /> : <MessageCircle size={14} color="#fff" />}
              </View>
            </View>
            
            <View style={styles.cardFooter}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                <Clock size={14} color="#6b7280" />
                <Text style={styles.dateText}>12 Aug 2026 • 15 mins</Text>
              </View>
              <Text style={styles.price}>₹400.00</Text>
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