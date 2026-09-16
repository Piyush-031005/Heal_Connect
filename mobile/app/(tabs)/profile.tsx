import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from "react-native";
import { Settings, LogOut, ChevronRight, HelpCircle, Shield, CreditCard, Heart } from "lucide-react-native";
import Iridescence from "../../components/Iridescence";

const { width } = Dimensions.get("window");
const PURPLE = "#7C3AED";
const LAVENDER = "#EDE9FE";

const MENU_ITEMS = [
  { icon: CreditCard, label: "Wallet & Payments", color: "#10B981" },
  { icon: Heart, label: "Favorite Experts", color: "#F43F5E" },
  { icon: Shield, label: "Privacy & Security", color: "#3B82F6" },
  { icon: HelpCircle, label: "Help & Support", color: "#F59E0B" },
  { icon: Settings, label: "Settings", color: "#8B5CF6" },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0726" }} edges={['top']}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        
        {/* PREMIUM IRIDESCENT HEADER */}
        <View style={styles.headerWrap}>
          <Iridescence color={[0.49, 0.23, 0.93]} speed={0.4} amplitude={0.2} />
          <View style={styles.headerContent}>
            <View style={styles.avatarWrap}>
              <Image source={require("../../assets/images/expert_avatars.jpg")} style={styles.avatar} />
              <View style={styles.editBadge}>
                <Settings size={14} color="#fff" />
              </View>
            </View>
            <Text style={styles.userName}>Piyush Punera</Text>
            <Text style={styles.userPhone}>+91 9876543210</Text>
          </View>
        </View>

        {/* STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Experts</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>$45</Text>
            <Text style={styles.statLabel}>Balance</Text>
          </View>
        </View>

        {/* MENU */}
        <View style={styles.menuContainer}>
          {MENU_ITEMS.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem} activeOpacity={0.8}>
              <View style={[styles.menuIconWrap, { backgroundColor: item.color + "20" }]}>
                <item.icon size={20} color={item.color} />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <ChevronRight size={18} color="rgba(255,255,255,0.3)" />
            </TouchableOpacity>
          ))}
        </View>

        {/* LOGOUT */}
        <TouchableOpacity style={styles.logoutBtn} activeOpacity={0.8}>
          <LogOut size={20} color="#F87171" />
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerWrap: { height: 260, position: "relative", overflow: "hidden", borderBottomLeftRadius: 40, borderBottomRightRadius: 40 },
  headerContent: { ...StyleSheet.absoluteFillObject, alignItems: "center", justifyContent: "center", backgroundColor: "rgba(15,7,38,0.3)" },
  avatarWrap: { width: 100, height: 100, borderRadius: 50, backgroundColor: "#fff", padding: 4, position: "relative", marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20 },
  avatar: { width: "100%", height: "100%", borderRadius: 46 },
  editBadge: { position: "absolute", bottom: 0, right: 0, width: 32, height: 32, borderRadius: 16, backgroundColor: PURPLE, alignItems: "center", justifyContent: "center", borderWidth: 3, borderColor: "#fff" },
  userName: { fontSize: 24, fontWeight: "800", color: "#fff", marginBottom: 4 },
  userPhone: { fontSize: 14, color: "rgba(255,255,255,0.8)", fontWeight: "500" },
  
  statsContainer: { flexDirection: "row", backgroundColor: "rgba(255,255,255,0.05)", marginHorizontal: 20, marginTop: -30, borderRadius: 20, paddingVertical: 20, borderWidth: 1, borderColor: "rgba(167,139,250,0.2)" },
  statBox: { flex: 1, alignItems: "center" },
  statValue: { fontSize: 20, fontWeight: "800", color: "#fff", marginBottom: 4 },
  statLabel: { fontSize: 12, color: "#A78BFA", textTransform: "uppercase", letterSpacing: 1 },
  statDivider: { width: 1, height: "100%", backgroundColor: "rgba(167,139,250,0.2)" },

  menuContainer: { paddingHorizontal: 20, marginTop: 30, gap: 12 },
  menuItem: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.03)", padding: 16, borderRadius: 16, borderWidth: 1, borderColor: "rgba(255,255,255,0.05)" },
  menuIconWrap: { width: 40, height: 40, borderRadius: 20, alignItems: "center", justifyContent: "center", marginRight: 16 },
  menuLabel: { flex: 1, fontSize: 16, fontWeight: "600", color: "#fff" },

  logoutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, marginHorizontal: 20, marginTop: 30, paddingVertical: 16, borderRadius: 16, backgroundColor: "rgba(248,113,113,0.1)", borderWidth: 1, borderColor: "rgba(248,113,113,0.3)" },
  logoutText: { fontSize: 16, fontWeight: "700", color: "#F87171" }
});
