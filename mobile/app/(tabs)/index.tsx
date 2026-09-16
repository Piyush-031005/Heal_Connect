import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions,
  Platform, StyleSheet, TextInput, Linking
} from "react-native";
import { useRouter } from "expo-router";
import {
  Search, Bell, Star, MessageCircle, Phone, ArrowRight, Calendar, Sun, Hash, BookOpen, ShoppingBag
} from "lucide-react-native";
import Lightfall from "../../components/Lightfall";
import GhostFibers from "../../components/GhostFibers";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const PURPLE   = "#7C3AED";
const LAVENDER = "#A78BFA";
const BG       = "#F5F3FF";
const TEXT     = "#1E1B4B";
const YELLOW   = "#F59E0B";

const EXPERTS = [
  { name: "piyush", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹100/min", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Abhishek Giri", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹0/min", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Pooja", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹0/min", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { name: "Deepak's Expert", role: "Tarot • Astrology", rating: "4.5", exp: "New Expert", price: "₹100/min", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
];

const MODALITIES = [
  { id: "astrology", name: "Astrology", image: "https://zenauraa.com/final_ensights/astrology.png" },
  { id: "tarot", name: "Tarot", image: "https://zenauraa.com/final_ensights/tarot.png" },
  { id: "face", name: "Face Reading", image: "https://zenauraa.com/final_ensights/face-reading.png" },
  { id: "palm", name: "Palm Reading", image: "https://zenauraa.com/final_ensights/palm-reading.png" },
  { id: "numerology", name: "Numerology", image: "https://zenauraa.com/final_ensights/numerology.png" },
  { id: "vastu", name: "Vastu", image: "https://zenauraa.com/final_ensights/vastu.png" },
];

const ZODIACS = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"];

export default function HomeTab() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <GhostFibers
        lineColor="#C4B5FD" glowColor="#A78BFA" speed={0.2} scale={0.9}
        brightness={25.0} blueBoost={0.8} lightMode={true} layers={50}
        lineFrequency={60} lineSpacing={0.3} glowIntensity={25.0}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>
        
        {/* HERO SECTION */}
        <View style={styles.heroContainer}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "#6B46C1" }]} />
          <Lightfall colors={["#DDD6FE", "#FDE68A", "#F9A8D4"]} backgroundColor="#6B46C1" speed={0.4} opacity={0.75} zoom={1.8} density={0.5} />
          
          <SafeAreaView style={StyleSheet.absoluteFill} edges={['top']}>
            <View style={styles.heroHeader}>
              <View style={{ width: 40 }} />
              {/* Centered and Bigger Logo */}
              <View style={styles.logoBubble}>
                <Image source={require("../../assets/images/main_logo.png")} style={{ width: 80, height: 80, resizeMode: "contain", tintColor: "#fff" }} />
              </View>
              <TouchableOpacity style={styles.iconBtn} onPress={() => router.push("/(tabs)/notifications")}><Bell size={20} color="#fff" /></TouchableOpacity>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>ZenAuraa</Text>
              <Text style={styles.heroSubtitle}>Find trusted guidance for every stage of life.</Text>

              <TouchableOpacity style={styles.heroBtnPurple} onPress={() => router.push("/(tabs)/explore")}>
                <Text style={styles.heroBtnPurpleText}>Ask me Anything</Text>
                <ArrowRight size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        {/* SEARCH BAR BELOW HERO */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={18} color={PURPLE} />
            <TextInput placeholder="Search experts or topics..." placeholderTextColor="#9CA3AF" style={styles.searchInput} />
          </View>
        </View>

        {/* QUICK ACCESS SERVICES */}
        <View style={styles.servicesContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            <TouchableOpacity style={styles.servicePill}><Calendar size={18} color={PURPLE} /><Text style={styles.serviceText}>Calendar</Text></TouchableOpacity>
            <TouchableOpacity style={styles.servicePill}><Sun size={18} color={PURPLE} /><Text style={styles.serviceText}>Horoscope</Text></TouchableOpacity>
            <TouchableOpacity style={styles.servicePill}><Hash size={18} color={PURPLE} /><Text style={styles.serviceText}>Numerology</Text></TouchableOpacity>
          </ScrollView>
        </View>

                {/* BANNER */}
        <View style={{ backgroundColor: "#5B21B6", padding: 20, borderRadius: 16, marginHorizontal: 20, marginTop: 24, marginBottom: 12, alignItems: "center" }}>
          <Text style={{ color: "#fff", fontSize: 22, fontWeight: "800", marginBottom: 6 }}>Your First Session Free</Text>
          <Text style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: "500", marginBottom: 18 }}>Talk to an expert and get instant clarity</Text>
          <TouchableOpacity onPress={() => router.push("/(tabs)/explore")} style={{ backgroundColor: "#F59E0B", paddingHorizontal: 24, paddingVertical: 12, borderRadius: 24, width: "100%", alignItems: "center" }}>
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 16 }}>Explore Experts →</Text>
          </TouchableOpacity>
        </View>

        {/* EXPERTS SECTION */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { maxWidth: width - 100 }]} numberOfLines={2}>Connect with top guides.</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore")}><Text style={styles.seeAllText}>View All</Text></TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {EXPERTS.map((expert, i) => (
              <TouchableOpacity key={i} style={styles.expertCardSmall} activeOpacity={0.88}>
                <View style={styles.expertAvatarWrapSmall}>
                  <Image source={{ uri: expert.img }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                </View>
                <Text style={styles.expertNameSmall} numberOfLines={1}>{expert.name}</Text>
                <Text style={styles.expertRoleSmall} numberOfLines={1}>{expert.role}</Text>
                
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", width: "100%", marginTop: 4 }}>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Star size={11} fill={YELLOW} color={YELLOW} />
                    <Text style={{ fontSize: 11, fontWeight: "800", color: TEXT }}>{expert.rating}</Text>
                  </View>
                  <Text style={{ fontSize: 11, fontWeight: "800", color: "#6B46C1" }}>{expert.price}</Text>
                </View>
                
                <View style={{ flexDirection: "row", gap: 6, marginTop: 10, width: "100%" }}>
                  <TouchableOpacity style={styles.expertActionBtnSmall} onPress={() => router.push("/(tabs)/history")}>
                    <MessageCircle size={11} color={PURPLE} /><Text style={styles.expertActionTextSmall}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.expertActionBtnSmall}>
                    <Phone size={11} color={PURPLE} /><Text style={styles.expertActionTextSmall}>Call</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* FREE SESSIONS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Free Live Sessions</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {EXPERTS.map((expert, i) => (
              <TouchableOpacity key={`free-${i}`} style={styles.freeCard} activeOpacity={0.88}>
                <View style={styles.freeAvatarWrap}>
                  <Image source={{ uri: expert.img }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                  <View style={styles.freeBadge}><Text style={styles.freeBadgeText}>FREE</Text></View>
                </View>
                <Text style={styles.expertNameSmall}>{expert.name}</Text>
                <Text style={styles.expertRoleSmall}>Free Astrologer</Text>
                <TouchableOpacity style={styles.freeActionBtn}>
                  <Phone size={12} color="#fff" />
                  <Text style={styles.freeActionText}>Free Call</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* DAILY HOROSCOPE (New AstroTalk Feature) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Daily Horoscope</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {ZODIACS.map((zodiac, i) => (
              <TouchableOpacity key={i} style={styles.zodiacCard}>
                <View style={styles.zodiacIconWrap}>
                  <Text style={{ fontSize: 24 }}>✨</Text>
                </View>
                <Text style={styles.zodiacName}>{zodiac}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ASTROMALL / SHOP (New AstroTalk Feature) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>AstroMall & Shop</Text>
            <Text style={styles.seeAllText}>View All</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} style={styles.shopCard}>
                <View style={styles.shopImgWrap}>
                  <ShoppingBag size={24} color="#A78BFA" />
                </View>
                <Text style={styles.shopTitle}>Crystal Gemstone</Text>
                <Text style={styles.shopPrice}>$45.00</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* LATEST ARTICLES (New AstroTalk Feature) */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Latest Articles</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {[1, 2, 3].map((i) => (
              <TouchableOpacity key={i} style={styles.articleCard}>
                <View style={styles.articleImgWrap}><BookOpen size={24} color="#fff" /></View>
                <View style={styles.articleContent}>
                  <Text style={styles.articleTitle} numberOfLines={2}>How Saturn's Transit Affects Your Zodiac Sign in 2026</Text>
                  <Text style={styles.articleDate}>2 mins read</Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* EXPLORE CATEGORIES (6 items + View All) */}
        <View style={{ backgroundColor: "rgba(45,27,84,0.95)", paddingVertical: 24, marginTop: 24 }}>
          <Text style={{ fontSize: 20, fontWeight: "700", color: "#F8F7FA", textAlign: "center", marginBottom: 16 }}>Explore by Category</Text>
          <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: 12, paddingHorizontal: 20 }}>
            {MODALITIES.map((mod) => (
              <TouchableOpacity key={mod.id} style={styles.modalityCardSmall}>
                <Image source={{ uri: mod.image }} style={{ width: 40, height: 40, marginBottom: 8 }} resizeMode="contain" />
                <Text style={styles.modalityNameSmall}>{mod.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.viewAllBtn} onPress={() => router.push("/(tabs)/explore")}>
            <Text style={styles.viewAllBtnText}>View All Categories</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: { height: 350, overflow: "hidden", borderBottomLeftRadius: 30, borderBottomRightRadius: 30 },
  heroHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingTop: 10 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  logoBubble: { alignItems: "center", justifyContent: "center" },
  heroContent: { paddingHorizontal: 24, paddingTop: 30, alignItems: "center" },
  heroTitle: { fontSize: 32, fontWeight: "900", color: "#fff", textAlign: "center", marginBottom: 8 },
  heroSubtitle: { fontSize: 13, color: "rgba(255,255,255,0.85)", textAlign: "center" },
  heroBtnPurple: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#6B46C1", borderRadius: 28, paddingHorizontal: 24, paddingVertical: 14, marginTop: 20 },
  heroBtnPurpleText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  
  searchContainer: { paddingHorizontal: 20, marginTop: -24, zIndex: 10 },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: "#fff", borderRadius: 24, paddingHorizontal: 16, height: 48, shadowColor: PURPLE, shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.15, shadowRadius: 12, elevation: 6, gap: 10 },
  searchInput: { flex: 1, fontSize: 14, color: TEXT, fontWeight: "500", height: "100%" },
  
  servicesContainer: { marginTop: 24, marginBottom: 10 },
  servicePill: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", paddingHorizontal: 14, paddingVertical: 10, borderRadius: 20, shadowColor: PURPLE, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 6, elevation: 2 },
  serviceText: { fontSize: 12, fontWeight: "700", color: TEXT },
  
  section: { paddingTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 16, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: TEXT },
  seeAllText: { fontSize: 12, color: PURPLE, fontWeight: "700" },
  
  expertCardSmall: { width: width * 0.44, borderRadius: 20, backgroundColor: "#EDE9FE", borderWidth: 1, borderColor: "#C4B5FD", padding: 12, alignItems: "center" },
  expertAvatarWrapSmall: { width: 56, height: 56, borderRadius: 28, overflow: "hidden", borderWidth: 2, borderColor: "#A78BFA", marginBottom: 8 },
  expertNameSmall: { fontSize: 13, fontWeight: "800", color: PURPLE, textAlign: "center" },
  expertRoleSmall: { fontSize: 10, color: "#6D28D9", fontWeight: "600", textAlign: "center", marginTop: 2 },
  expertActionBtnSmall: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, backgroundColor: "#DDD6FE", borderRadius: 10, paddingVertical: 6, borderWidth: 1, borderColor: "#C4B5FD" },
  expertActionTextSmall: { fontSize: 10, fontWeight: "800", color: PURPLE },

  freeCard: { width: width * 0.38, borderRadius: 20, backgroundColor: "#FFF7ED", borderWidth: 1, borderColor: "#FDE68A", padding: 12, alignItems: "center" },
  freeAvatarWrap: { width: 64, height: 64, borderRadius: 32, overflow: "hidden", position: "relative", marginBottom: 8 },
  freeBadge: { position: "absolute", bottom: 0, alignSelf: "center", backgroundColor: "#EF4444", paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  freeBadgeText: { fontSize: 8, fontWeight: "900", color: "#fff" },
  freeActionBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 4, backgroundColor: "#10B981", borderRadius: 12, paddingVertical: 8, paddingHorizontal: 12, marginTop: 10, width: "100%" },
  freeActionText: { fontSize: 11, fontWeight: "800", color: "#fff" },

  zodiacCard: { width: 80, alignItems: "center" },
  zodiacIconWrap: { width: 64, height: 64, borderRadius: 32, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", alignItems: "center", justifyContent: "center", marginBottom: 8, shadowColor: PURPLE, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 6 },
  zodiacName: { fontSize: 12, fontWeight: "600", color: TEXT },

  shopCard: { width: 140, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", padding: 12, shadowColor: PURPLE, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 6 },
  shopImgWrap: { height: 100, backgroundColor: "#F3F4F6", borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 10 },
  shopTitle: { fontSize: 12, fontWeight: "700", color: TEXT, marginBottom: 4 },
  shopPrice: { fontSize: 14, fontWeight: "800", color: PURPLE },

  articleCard: { width: width * 0.7, borderRadius: 16, backgroundColor: "#fff", borderWidth: 1, borderColor: "#E5E7EB", overflow: "hidden", flexDirection: "row" },
  articleImgWrap: { width: 80, backgroundColor: "#A78BFA", alignItems: "center", justifyContent: "center" },
  articleContent: { flex: 1, padding: 12 },
  articleTitle: { fontSize: 13, fontWeight: "700", color: TEXT, marginBottom: 8, lineHeight: 18 },
  articleDate: { fontSize: 11, color: "#9CA3AF", fontWeight: "500" },

  modalityCardSmall: { width: (width - 60) / 3, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 16, padding: 12, alignItems: "center" },
  modalityNameSmall: { fontSize: 11, fontWeight: "700", color: "#F8F7FA", textAlign: "center" },
  viewAllBtn: { marginHorizontal: 20, marginTop: 16, backgroundColor: "rgba(255,255,255,0.15)", borderRadius: 20, paddingVertical: 14, alignItems: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  viewAllBtnText: { color: "#fff", fontWeight: "700", fontSize: 14 },
});
