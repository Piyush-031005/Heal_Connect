import { SafeAreaView } from "react-native-safe-area-context";
import GhostFibers from "../../components/GhostFibers";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import { Clock, Phone, MessageCircle } from "lucide-react-native";

const PURPLE = "#7C3AED";

export default function HistoryScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#1A0B2E" }} edges={['top']}>
      <GhostFibers lineColor="#A78BFA" glowColor="#7C3AED" speed={0.15} scale={1.2} brightness={12.0} layers={30} />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Past Sessions</Text>
      </View>

      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }}>
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
                <Clock size={14} color="#A78BFA" />
                <Text style={styles.dateText}>12 Aug 2026 • 15 mins</Text>
              </View>
              <Text style={styles.price}>$24.00</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: "#fff" },
  card: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "rgba(167,139,250,0.2)" },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  avatar: { width: 44, height: 44, borderRadius: 22, overflow: "hidden", backgroundColor: "#2D1B54" },
  name: { fontSize: 16, fontWeight: "700", color: "#fff" },
  role: { fontSize: 13, color: "#A78BFA" },
  iconBadge: { width: 32, height: 32, borderRadius: 16, backgroundColor: PURPLE, alignItems: "center", justifyContent: "center" },
  cardFooter: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingTop: 16, borderTopWidth: 1, borderTopColor: "rgba(255,255,255,0.1)" },
  dateText: { fontSize: 13, color: "#A78BFA" },
  price: { fontSize: 16, fontWeight: "700", color: "#FCD34D" },
});
