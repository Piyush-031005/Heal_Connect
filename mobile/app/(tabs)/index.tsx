import { SafeAreaView } from "react-native-safe-area-context";
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  StatusBar, Dimensions, ActivityIndicator, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Search, Bell, ChevronRight, Star, Sun, Moon, Eye, Hand, Wind, Heart, Music, Hash, Brain, Zap, Flame, Globe } from "lucide-react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, withRepeat, withSpring, Easing } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { practitionersApi } from "../../lib/api";
import Lightfall from "../../components/Lightfall";

const { width } = Dimensions.get("window");

const PURPLE = "#7C3AED";
const LAVENDER = "#EDE9FE";
const BG = "#F5F3FF";
const TEXT = "#1E1035";
const TEXT_MUTED = "#6B5E80";
const CARD = "#FFFFFF";
const GOLD = "#F59E0B";

const MODALITIES = [
  { id: "astrology", name: "Astrology", icon: Sun, color: "#F59E0B" },
  { id: "tarot", name: "Tarot", icon: Moon, color: "#8B5CF6" },
  { id: "face-reading", name: "Face Reading", icon: Eye, color: "#EC4899" },
  { id: "palmistry", name: "Palm Reading", icon: Hand, color: "#10B981" },
  { id: "breathwork", name: "Breathwork", icon: Wind, color: "#06B6D4" },
  { id: "chakra-healing", name: "Chakra", icon: Heart, color: "#EF4444" },
  { id: "sound-healing", name: "Sound", icon: Music, color: "#6366F1" },
  { id: "numerology", name: "Numerology", icon: Hash, color: "#F97316" },
];

const QUOTES = [
  { text: "The soul always knows what it needs to heal.", author: "Caroline Myss" },
  { text: "You are the ocean in a drop.", author: "Rumi" },
  { text: "Within you is a sanctuary to which you can retreat at any time.", author: "Hermann Hesse" },
];

export default function HomeScreen() {
  const router = useRouter();
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quote] = useState(QUOTES[Math.floor(Math.random() * QUOTES.length)]);

  const heroOpacity = useSharedValue(0);
  const heroTranslateY = useSharedValue(30);
  const cardScale = useSharedValue(0.95);
  const pulseAnim = useSharedValue(1);

  useEffect(() => {
    heroOpacity.value = withTiming(1, { duration: 800 });
    heroTranslateY.value = withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) });
    cardScale.value = withDelay(300, withSpring(1, { damping: 15, stiffness: 100 }));
    pulseAnim.value = withRepeat(withTiming(1.04, { duration: 2500, easing: Easing.inOut(Easing.ease) }), -1, true);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await practitionersApi.list({ limit: 6 });
      if (res.success && res.data?.practitioners) setPractitioners(res.data.practitioners);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const animatedHero = useAnimatedStyle(() => ({ opacity: heroOpacity.value, transform: [{ translateY: heroTranslateY.value }] }));
  const animatedCard = useAnimatedStyle(() => ({ transform: [{ scale: cardScale.value }] }));
  const animatedPulse = useAnimatedStyle(() => ({ transform: [{ scale: pulseAnim.value }] }));

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

        {/* HERO SECTION with Lightfall */}
        <View style={styles.heroContainer}>
          <View style={StyleSheet.absoluteFillObject}>
            <Lightfall colors={["#A6C8FF","#5227FF","#FF9FFC"]} backgroundColor="#8e6dc6" speed={0.4} streakCount={2} streakWidth={1} streakLength={1} glow={1} density={0.5} twinkle={1} zoom={3} backgroundGlow={0.5} opacity={1} mouseInteraction={true} mouseStrength={0.5} mouseRadius={1} lightMode={true} />
          </View>
          <SafeAreaView>
            <Animated.View style={[styles.heroContent, animatedHero]}>
              <View style={styles.heroHeader}>
                <View>
                  <Text style={styles.heroGreeting}>Good morning ✨</Text>
                  <Text style={styles.heroTitle}>Find your guide{"\n"}to inner peace.</Text>
                </View>
                <TouchableOpacity style={styles.bellBtn}>
                  <Bell size={22} color="#fff" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.heroSearch} onPress={() => router.push("/(tabs)/explore")} activeOpacity={0.9}>
                <Search size={18} color={TEXT_MUTED} />
                <Text style={styles.heroSearchText}>Search practitioners…</Text>
              </TouchableOpacity>
              <View style={styles.heroStats}>
                {[["50K+","Members"],["4.9★","Rating"],["200+","Experts"]].map(([val, sub]) => (
                  <View key={val} style={styles.heroStatChip}>
                    <Text style={styles.heroStatVal}>{val}</Text>
                    <Text style={styles.heroStatSub}>{sub}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          </SafeAreaView>
        </View>

        {/* DAILY QUOTE */}
        <Animated.View style={[styles.quoteCard, animatedCard]}>
          <LinearGradient colors={["#7C3AED","#8B5CF6"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.quoteGradient}>
            <Text style={styles.quoteIcon}>✦</Text>
            <Text style={styles.quoteText}>"{quote.text}"</Text>
            <Text style={styles.quoteAuthor}>— {quote.author}</Text>
          </LinearGradient>
        </Animated.View>

        {/* LIVE PRACTITIONERS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Available Now</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore")} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={14} color={PURPLE} />
            </TouchableOpacity>
          </View>
          {loading ? (
            <View style={{ flexDirection:"row", alignItems:"center", gap:10, paddingVertical:20 }}>
              <ActivityIndicator size="small" color={PURPLE} />
              <Text style={{ color: TEXT_MUTED }}>Loading...</Text>
            </View>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap:12, paddingRight:8 }}>
              {practitioners.map((p: any) => (
                <TouchableOpacity key={p.id} style={styles.practCard} activeOpacity={0.85}>
                  {p.photoUrl ? (
                    <Image source={{ uri: p.photoUrl }} style={styles.practPhoto} />
                  ) : (
                    <View style={[styles.practPhoto, styles.practPhotoPlaceholder]}>
                      <Text style={{ fontSize:22, fontWeight:"700", color:PURPLE }}>{(p.name||"E")[0].toUpperCase()}</Text>
                    </View>
                  )}
                  <View style={[styles.onlineDot, { backgroundColor: p.isOnline ? "#10B981" : "#CBD5E1" }]} />
                  <Text style={styles.practName} numberOfLines={1}>{p.name}</Text>
                  <Text style={styles.practSpec} numberOfLines={1}>{p.specialties?.[0] || "Expert"}</Text>
                  <View style={{ flexDirection:"row", alignItems:"center", gap:3, marginTop:4 }}>
                    <Star size={11} color={GOLD} fill={GOLD} />
                    <Text style={{ fontSize:10, color:GOLD, fontWeight:"700" }}>{p.avgRating?.toFixed(1)||"—"}</Text>
                  </View>
                  <Text style={styles.practRate}>₹{p.perMinuteRate}/min</Text>
                </TouchableOpacity>
              ))}
              {practitioners.length === 0 && <Text style={{ color:TEXT_MUTED, paddingVertical:16 }}>No practitioners online</Text>}
            </ScrollView>
          )}
        </View>

        {/* MODALITIES GRID */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Explore Services</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore")} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={14} color={PURPLE} />
            </TouchableOpacity>
          </View>
          <View style={styles.modalityGrid}>
            {MODALITIES.map((m) => {
              const IconComp = m.icon;
              return (
                <TouchableOpacity key={m.id} style={styles.modalityCard} activeOpacity={0.8}>
                  <View style={[styles.modalityIcon, { backgroundColor: m.color + "1A" }]}>
                    <IconComp size={26} color={m.color} />
                  </View>
                  <Text style={styles.modalityName}>{m.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* CTA BANNER */}
        <Animated.View style={[styles.ctaBanner, animatedPulse]}>
          <LinearGradient colors={["#4F46E5","#7C3AED","#9333EA"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.ctaGradient}>
            <Text style={styles.ctaTitle}>🌟 First Session Free</Text>
            <Text style={styles.ctaSubtitle}>Start your healing journey today</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/explore")}>
              <Text style={styles.ctaButtonText}>Book a Session →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        {/* WHY ZENAURAA */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { marginBottom:14 }]}>Why ZenAuraa?</Text>
          <View style={{ flexDirection:"row", gap:10 }}>
            {[["🔒","100% Private","End-to-end encrypted"],["✅","Verified","Rigorous checks"],["⚡","Instant","Chat in seconds"]].map(([icon, t, d]) => (
              <View key={t} style={styles.featureCard}>
                <Text style={{ fontSize:24, marginBottom:6 }}>{icon}</Text>
                <Text style={{ fontSize:12, fontWeight:"800", color:TEXT, marginBottom:4 }}>{t}</Text>
                <Text style={{ fontSize:10, color:TEXT_MUTED, lineHeight:14 }}>{d}</Text>
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: { height: 300, overflow: "hidden" },
  heroContent: { paddingHorizontal: 20, paddingTop: Platform.OS === "android" ? 16 : 8, paddingBottom: 24 },
  heroHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 },
  heroGreeting: { fontSize: 14, color: "rgba(255,255,255,0.85)", fontWeight: "500", marginBottom: 4 },
  heroTitle: { fontSize: 26, fontWeight: "800", color: "#fff", lineHeight: 32 },
  bellBtn: { width: 42, height: 42, borderRadius: 21, backgroundColor: "rgba(255,255,255,0.2)", alignItems: "center", justifyContent: "center" },
  heroSearch: { flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.95)", borderRadius: 16, paddingHorizontal: 16, paddingVertical: 13, gap: 10, marginBottom: 16, shadowColor: "#000", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  heroSearchText: { fontSize: 14, color: TEXT_MUTED },
  heroStats: { flexDirection: "row", gap: 10 },
  heroStatChip: { backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, paddingVertical: 8, paddingHorizontal: 16, alignItems: "center" },
  heroStatVal: { fontSize: 16, fontWeight: "800", color: "#fff" },
  heroStatSub: { fontSize: 10, color: "rgba(255,255,255,0.8)" },
  quoteCard: { marginHorizontal: 16, marginTop: -18, marginBottom: 8, borderRadius: 20, shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 10 },
  quoteGradient: { borderRadius: 20, padding: 20 },
  quoteIcon: { fontSize: 24, marginBottom: 8 },
  quoteText: { fontSize: 14, color: "#fff", fontStyle: "italic", lineHeight: 21, marginBottom: 8, fontWeight: "500" },
  quoteAuthor: { fontSize: 12, color: "rgba(255,255,255,0.75)", fontWeight: "600" },
  section: { paddingHorizontal: 16, paddingTop: 24 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  sectionTitle: { fontSize: 18, fontWeight: "800", color: TEXT },
  seeAllBtn: { flexDirection: "row", alignItems: "center", gap: 2 },
  seeAllText: { fontSize: 13, color: PURPLE, fontWeight: "600" },
  practCard: { width: 110, backgroundColor: CARD, borderRadius: 18, padding: 12, alignItems: "center", shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 10, elevation: 4, position: "relative" },
  practPhoto: { width: 56, height: 56, borderRadius: 28, borderWidth: 2, borderColor: LAVENDER },
  practPhotoPlaceholder: { backgroundColor: LAVENDER, alignItems: "center", justifyContent: "center" },
  onlineDot: { position: "absolute", top: 50, right: 22, width: 12, height: 12, borderRadius: 6, borderWidth: 2, borderColor: "#fff" },
  practName: { fontSize: 12, fontWeight: "700", color: TEXT, textAlign: "center", marginTop: 8 },
  practSpec: { fontSize: 10, color: TEXT_MUTED, textAlign: "center", marginTop: 2 },
  practRate: { fontSize: 11, color: PURPLE, fontWeight: "700", marginTop: 4 },
  modalityGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  modalityCard: { width: (width - 52) / 4, backgroundColor: CARD, borderRadius: 16, padding: 12, alignItems: "center", shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
  modalityIcon: { width: 48, height: 48, borderRadius: 14, alignItems: "center", justifyContent: "center", marginBottom: 6 },
  modalityName: { fontSize: 9, fontWeight: "700", color: TEXT, textAlign: "center" },
  ctaBanner: { marginHorizontal: 16, marginTop: 24, borderRadius: 22, shadowColor: "#4F46E5", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.4, shadowRadius: 20, elevation: 12 },
  ctaGradient: { borderRadius: 22, padding: 24 },
  ctaTitle: { fontSize: 22, fontWeight: "800", color: "#fff", marginBottom: 6 },
  ctaSubtitle: { fontSize: 14, color: "rgba(255,255,255,0.85)", marginBottom: 16 },
  ctaButton: { backgroundColor: "#fff", borderRadius: 12, paddingHorizontal: 20, paddingVertical: 12, alignSelf: "flex-start" },
  ctaButtonText: { color: PURPLE, fontWeight: "800", fontSize: 14 },
  featureCard: { flex: 1, backgroundColor: CARD, borderRadius: 16, padding: 14, shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 6, elevation: 2 },
});