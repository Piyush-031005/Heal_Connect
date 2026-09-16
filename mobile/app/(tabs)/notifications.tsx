import { SafeAreaView } from "react-native-safe-area-context";
import GhostFibers from "../../components/GhostFibers";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Bell, Star, Wallet } from "lucide-react-native";

export default function NotificationsScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A0B2E" }} edges={['top']}>
      <GhostFibers lineColor="#A78BFA" glowColor="#7C3AED" speed={0.15} scale={1.2} brightness={12.0} layers={30} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Alerts</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 12 }}>
        <View style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: "#F59E0B" }]}><Star size={16} color="#fff" /></View>
          <View style={styles.content}>
            <Text style={styles.title}>Special Offer 🔮</Text>
            <Text style={styles.desc}>Get 50% off on your first Tarot reading!</Text>
            <Text style={styles.time}>2 hours ago</Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={[styles.iconWrap, { backgroundColor: "#10B981" }]}><Wallet size={16} color="#fff" /></View>
          <View style={styles.content}>
            <Text style={styles.title}>Wallet Top-up Successful</Text>
            <Text style={styles.desc}>$50 has been added to your ZenAuraa wallet.</Text>
            <Text style={styles.time}>Yesterday</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#fff" },
  card: { flexDirection: "row", alignItems: "flex-start", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 16, padding: 16, borderWidth: 1, borderColor: "rgba(167,139,250,0.2)" },
  iconWrap: { width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", marginRight: 14 },
  content: { flex: 1 },
  title: { fontSize: 15, fontWeight: "700", color: "#fff", marginBottom: 4 },
  desc: { fontSize: 13, color: "#A78BFA", lineHeight: 18, marginBottom: 8 },
  time: { fontSize: 11, color: "rgba(167,139,250,0.6)" },
});
