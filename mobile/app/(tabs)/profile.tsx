import { SafeAreaView } from "react-native-safe-area-context";
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  StatusBar, Alert, ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import {
  Settings, Calendar, Heart, Wallet, Bell, HelpCircle,
  ChevronRight, LogOut, User, Clock, Star, Shield,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { usersApi, tokenStore } from "../../lib/api";
import * as SecureStore from "expo-secure-store";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";

const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#8B5CF6";
const BG = "#F5F3FF";
const TEXT = "#1E1035";
const TEXT_MUTED = "#6B5E80";
const CARD = "#FFFFFF";
const LAVENDER = "#EDE9FE";

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const headerOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslate = useSharedValue(30);

  useEffect(() => {
    headerOpacity.value = withTiming(1, { duration: 600 });
    contentOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    contentTranslate.value = withDelay(200, withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) }));
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const res = await usersApi.getProfile();
      if (res.success && res.data?.user) setUser(res.data.user);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleLogout = async () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out", style: "destructive",
        onPress: async () => {
          await tokenStore.clear();
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const animatedHeader = useAnimatedStyle(() => ({ opacity: headerOpacity.value }));
  const animatedContent = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslate.value }],
  }));

  const menuSections = [
    {
      title: "Account",
      items: [
        { icon: Calendar, label: "My Sessions", desc: "View session history", color: PURPLE },
        { icon: Heart, label: "Saved Experts", desc: "Your favourite practitioners", color: "#EC4899" },
        { icon: Wallet, label: "My Wallet", desc: "Balance & transactions", color: "#10B981" },
      ],
    },
    {
      title: "App",
      items: [
        { icon: Bell, label: "Notifications", desc: "Manage your alerts", color: "#F59E0B" },
        { icon: Shield, label: "Privacy", desc: "Data & security", color: "#6366F1" },
        { icon: HelpCircle, label: "Help & Support", desc: "Get assistance", color: "#06B6D4" },
        { icon: Settings, label: "Settings", desc: "App preferences", color: TEXT_MUTED },
      ],
    },
  ];

  if (loading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: BG, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={PURPLE} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* PROFILE HEADER */}
        <Animated.View style={animatedHeader}>
          <LinearGradient
            colors={["#7C3AED", "#9333EA", "#A855F7"]}
            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
            style={styles.profileGradient}
          >
            {/* Avatar */}
            {user?.photoUrl ? (
              <Image source={{ uri: user.photoUrl }} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>{(user?.name || user?.email || "U")[0].toUpperCase()}</Text>
              </View>
            )}
            <Text style={styles.userName}>{user?.name || "ZenAuraa User"}</Text>
            <Text style={styles.userEmail}>{user?.email || user?.phone || ""}</Text>
            <View style={styles.statsRow}>
              {[["0","Sessions"],["0","Reviews"],["₹0","Balance"]].map(([val, label]) => (
                <View key={label} style={styles.statItem}>
                  <Text style={styles.statVal}>{val}</Text>
                  <Text style={styles.statLabel}>{label}</Text>
                </View>
              ))}
            </View>
          </LinearGradient>
        </Animated.View>

        {/* MENU SECTIONS */}
        <Animated.View style={[{ paddingHorizontal: 16, paddingTop: 20 }, animatedContent]}>
          {menuSections.map((section) => (
            <View key={section.title} style={{ marginBottom: 24 }}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.menuCard}>
                {section.items.map((item, idx) => {
                  const IconComp = item.icon;
                  return (
                    <TouchableOpacity key={item.label} style={[styles.menuItem, idx < section.items.length - 1 && styles.menuItemBorder]} activeOpacity={0.7}>
                      <View style={[styles.menuIconBg, { backgroundColor: item.color + "15" }]}>
                        <IconComp size={20} color={item.color} />
                      </View>
                      <View style={styles.menuItemContent}>
                        <Text style={styles.menuItemLabel}>{item.label}</Text>
                        <Text style={styles.menuItemDesc}>{item.desc}</Text>
                      </View>
                      <ChevronRight size={16} color={TEXT_MUTED} />
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          ))}

          {/* SIGN OUT */}
          <TouchableOpacity style={styles.signOutBtn} onPress={handleLogout} activeOpacity={0.8}>
            <LogOut size={18} color="#EF4444" />
            <Text style={styles.signOutText}>Sign Out</Text>
          </TouchableOpacity>

          {/* VERSION */}
          <Text style={styles.versionText}>ZenAuraa v1.0.0 · Powered by Tara Infotech</Text>
        </Animated.View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  profileGradient: { padding: 24, paddingTop: 32, paddingBottom: 40, alignItems: "center" },
  avatar: { width: 88, height: 88, borderRadius: 44, borderWidth: 3, borderColor: "rgba(255,255,255,0.5)", marginBottom: 12 },
  avatarPlaceholder: { width: 88, height: 88, borderRadius: 44, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center", marginBottom: 12, borderWidth: 3, borderColor: "rgba(255,255,255,0.4)" },
  avatarInitial: { fontSize: 36, fontWeight: "800", color: "#fff" },
  userName: { fontSize: 22, fontWeight: "800", color: "#fff", marginBottom: 4 },
  userEmail: { fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 20 },
  statsRow: { flexDirection: "row", gap: 24 },
  statItem: { alignItems: "center" },
  statVal: { fontSize: 20, fontWeight: "800", color: "#fff" },
  statLabel: { fontSize: 11, color: "rgba(255,255,255,0.75)" },
  sectionTitle: { fontSize: 12, fontWeight: "700", color: TEXT_MUTED, letterSpacing: 1, textTransform: "uppercase", marginBottom: 10, marginLeft: 4 },
  menuCard: { backgroundColor: CARD, borderRadius: 20, shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, overflow: "hidden", borderWidth: 1, borderColor: "rgba(124,58,237,0.06)" },
  menuItem: { flexDirection: "row", alignItems: "center", padding: 16, gap: 14 },
  menuItemBorder: { borderBottomWidth: 1, borderBottomColor: "#F5F3FF" },
  menuIconBg: { width: 40, height: 40, borderRadius: 12, alignItems: "center", justifyContent: "center" },
  menuItemContent: { flex: 1 },
  menuItemLabel: { fontSize: 15, fontWeight: "700", color: TEXT },
  menuItemDesc: { fontSize: 12, color: TEXT_MUTED, marginTop: 1 },
  signOutBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10, backgroundColor: "#FEF2F2", borderRadius: 16, padding: 16, marginBottom: 24, borderWidth: 1, borderColor: "#FECACA" },
  signOutText: { fontSize: 15, fontWeight: "700", color: "#EF4444" },
  versionText: { textAlign: "center", fontSize: 11, color: TEXT_MUTED, marginBottom: 8 },
});