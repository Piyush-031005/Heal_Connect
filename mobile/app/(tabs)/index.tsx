import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions,
  Platform, StyleSheet
} from "react-native";
import { useRouter } from "expo-router";
import {
  Search, Bell, ChevronRight, Star, MessageCircle, Phone,
  ArrowRight, Check, Smartphone
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Lightfall from "../../components/Lightfall";
import GhostFibers from "../../components/GhostFibers";

const { width } = Dimensions.get("window");

const PURPLE   = "#7C3AED";
const LAVENDER = "#A78BFA";
const BG       = "#F5F3FF";
const DARK_BG  = "#2D1B54";
const TEXT     = "#1E1B4B";
const TEXT_MUTED = "#6B5E80";
const YELLOW   = "#F59E0B";

const EXPERTS = [
  { name: "Maya Sharma",   role: "Vedic Astrologer", rating: "4.9", reviews: "128k+", langs: "English, Hindi",     exp: "15+ Yrs", price: "$120", available: true,  badge: "Celebrity",  img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { name: "Arun Nair",     role: "Tarot & Crystals",  rating: "5.0", reviews: "342k+", langs: "English, Malayalam", exp: "20+ Yrs", price: "$150", available: true,  badge: "Top Choice", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Dr. Elena Rossi", role: "Energy Healer",  rating: "4.8", reviews: "89k+",  langs: "English, Italian",  exp: "8+ Yrs",  price: "$90",  available: false, badge: "Celebrity",  img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Chen Wei",      role: "Numerologist",     rating: "5.0", reviews: "412k+", langs: "English, Mandarin", exp: "30+ Yrs", price: "$80",  available: true,  badge: "Top Choice", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
  { name: "Luna Vega",     role: "Tarot Reader",     rating: "4.9", reviews: "11k+",  langs: "English, Spanish",  exp: "6+ Yrs",  price: "$100", available: true,  badge: "",           img: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop" },
];

const MODALITIES = [
  { id: "astrology",      name: "Astrology",         desc: "Gain cosmic insights and life path guidance.",              image: "https://zenauraa.com/final_ensights/astrology.png" },
  { id: "tarot",         name: "Tarot",              desc: "Unveil hidden truths through symbolic cards.",             image: "https://zenauraa.com/final_ensights/tarot.png" },
  { id: "face-reading",  name: "Face Reading",       desc: "Understand personality and health markers.",              image: "https://zenauraa.com/final_ensights/face-reading.png" },
  { id: "palm-reading",  name: "Palm Reading",       desc: "Discover destiny written in your hands.",                 image: "https://zenauraa.com/final_ensights/palm-reading.png" },
  { id: "sound-healing", name: "Sound Healing",      desc: "Harmonize your body with therapeutic frequencies.",       image: "https://zenauraa.com/final_ensights/sound-healing.png" },
  { id: "meditation",    name: "Meditation",         desc: "Cultivate mindfulness and inner peace.",                  image: "https://zenauraa.com/final_ensights/meditation.png" },
  { id: "spiritual",     name: "Spiritual Guidance", desc: "Connect with higher purpose and wisdom.",                 image: "https://zenauraa.com/final_ensights/spiritual-guidance.png" },
  { id: "chakra-healing",name: "Chakra Healing",     desc: "Restore balance and clear energy blockages.",             image: "https://zenauraa.com/final_ensights/chakra-healing.png" },
  { id: "breathwork",    name: "Breathwork",         desc: "Align mind, body, and spirit through mindful breathing.", image: "https://zenauraa.com/final_ensights/breathwork.png" },
  { id: "dreams",        name: "Dream Prediction",   desc: "Unlock the power of your subconscious dreams.",          image: "https://zenauraa.com/final_ensights/dream-interpretation.png" },
  { id: "space-harmony", name: "Space Harmony",      desc: "Harmonize your living and working spaces.",              image: "https://zenauraa.com/final_ensights/space-harmony.png" },
  { id: "numerology",    name: "Numerology",         desc: "Uncover the hidden vibrations of numbers.",              image: "https://zenauraa.com/final_ensights/numerology.png" },
];

const TESTIMONIALS = [
  { name: "Amar Thakur",  loc: "Pune · India",     text: "This app helped me to get a job in my dream company. I was stressed about not getting a career opportunity after my graduation. One prediction from an astrologer gave me a ray of hope." },
  { name: "Sneha Patel",  loc: "Mumbai · India",   text: "I was going through a tough phase in my marriage. The tarot reading session gave me clarity and helped me understand my partner better. Highly recommend!" },
  { name: "Rahul Verma",  loc: "Delhi · India",    text: "The Kundli matching feature helped me find the perfect match for my son. The astrologers were very detailed and professional." },
  { name: "Priya Sharma", loc: "Bangalore · India", text: "My career horoscope reading was spot on. I got the guidance I needed to make a major career transition." },
];

const PATHS = [
  { label: "KNOW",    title: "Know Yourself",      desc: "Discover your cosmic blueprint through birth chart, numerology, and personality mapping.", features: ["Birth chart reading", "Numerology analysis", "Payment & Sign Analysis"], color: "#B79AE6" },
  { label: "EXPLORE", title: "Explore Your World", desc: "Navigate love, career, and life transitions through tarot, zodiac readings, and guided sessions.", features: ["Tarot Card Reading", "Zodiac Compatibility", "Detailed Forecasts"], color: "#7EDEA0", popular: true },
  { label: "CONNECT", title: "Connect With Guides", desc: "Meet verified practitioners matched to your exact needs, available 24/7 worldwide.", features: ["Astrologer Matching", "Live Chat & Sessions", "Ongoing Journey Support"], color: "#63BFE4" },
];

export default function HomeTab() {
  const router = useRouter();
  const [activePath, setActivePath] = useState(null);

  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <GhostFibers
        lineColor="#C4B5FD"
        glowColor="#A78BFA"
        speed={0.2}
        scale={0.9}
        brightness={10.0}
        blueBoost={0.5}
        lightMode={true}
        layers={30}
        lineFrequency={30}
        lineSpacing={0.9}
        glowIntensity={10.0}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 120 }}>

        {/* HERO */}
        <View style={styles.heroContainer}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: "#6B46C1" }]} />
          <Lightfall
            colors={["#DDD6FE", "#FDE68A", "#F9A8D4"]}
            backgroundColor="#6B46C1"
            speed={0.4}
            opacity={0.75}
            zoom={1.8}
            density={0.5}
            twinkle={1.0}
            glow={0.8}
          />
          <View style={StyleSheet.absoluteFill}>
            <View style={styles.heroHeader}>
              <TouchableOpacity style={styles.iconBtn}><Search size={20} color="#fff" /></TouchableOpacity>
              <View style={styles.logoBubble}>
                <Image source={require("../../assets/images/main_logo.png")} style={{ width: 70, height: 70, resizeMode: "contain", tintColor: "#fff" }} />
              </View>
              <TouchableOpacity style={styles.iconBtn}><Bell size={20} color="#fff" /></TouchableOpacity>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>ZenAuraa</Text>
              <Text style={styles.heroSubtitle}>Find trusted guidance for every stage of life.{"\n"}Connect with verified experts instantly.</Text>

              <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
                <TouchableOpacity style={styles.heroBtnYellow} onPress={() => router.push("/(tabs)/chat")}>
                  <MessageCircle size={15} color="#1e1b4b" /><Text style={styles.heroBtnYellowText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.heroBtnYellow}>
                  <Phone size={15} color="#1e1b4b" /><Text style={styles.heroBtnYellowText}>Call</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.heroBtnPurple} onPress={() => router.push("/(tabs)/explore")}>
                <Text style={styles.heroBtnPurpleText}>Ask me Anything</Text>
                <ArrowRight size={16} color="#fff" />
              </TouchableOpacity>

              <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginTop: 20 }}>
                <View style={{ flexDirection: "row" }}>
                  {[0, 1, 2, 3].map((i) => (
                    <View key={i} style={{ width: 36, height: 36, borderRadius: 18, overflow: "hidden", borderWidth: 2, borderColor: "rgba(255,255,255,0.5)", marginLeft: i === 0 ? 0 : -10, backgroundColor: "#EDE9FE", zIndex: 4 - i }}>
                      <Image
                        source={require("../../assets/images/expert_avatars.jpg")}
                        style={{ width: 72, height: 72, position: "absolute", left: (i % 2 === 0) ? 0 : -36, top: (i < 2) ? 0 : -36 }}
                        resizeMode="cover"
                      />
                    </View>
                  ))}
                </View>
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                    <Text style={{ fontSize: 16, fontWeight: "900", color: "#fff" }}>4.9</Text>
                    <Star size={14} fill="#FBBF24" color="#FBBF24" />
                  </View>
                  <Text style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>Based on 10,000+ reviews</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* EXPERTS */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <View style={{ width: 24, height: 2, backgroundColor: PURPLE }} />
                <Text style={{ fontSize: 10, fontWeight: "900", color: PURPLE, letterSpacing: 2, textTransform: "uppercase" }}>Featured Experts</Text>
              </View>
              <Text style={styles.sectionTitle}>Connect with{"\n"}top-rated guides.</Text>
            </View>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore")} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>View All</Text>
              <ArrowRight size={14} color={PURPLE} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {EXPERTS.map((expert, i) => (
              <TouchableOpacity key={i} style={styles.expertCard} activeOpacity={0.88}>
                {expert.badge ? <View style={styles.expertBadge}><Text style={styles.expertBadgeText}>{expert.badge}</Text></View> : null}
                <View style={{ flexDirection: "row", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <View style={styles.expertAvatarWrap}>
                    <Image source={{ uri: expert.img }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                    {expert.available && <View style={styles.onlineDot} />}
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.expertName}>{expert.name}</Text>
                    <View style={styles.rolePill}><Text style={styles.roleText}>{expert.role}</Text></View>
                  </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: 12 }}>
                  <Star size={13} fill={YELLOW} color={YELLOW} />
                  <Text style={{ fontSize: 13, fontWeight: "900", color: TEXT }}>{expert.rating}</Text>
                  <Text style={{ fontSize: 11, color: PURPLE }}>({expert.reviews} orders)</Text>
                </View>
                <View style={styles.expertDetails}>
                  {[["Languages", expert.langs], ["Experience", expert.exp]].map(([l, v]) => (
                    <View key={l} style={styles.detailRow}>
                      <Text style={styles.detailLabel}>{l}</Text>
                      <Text style={styles.detailValue}>{v}</Text>
                    </View>
                  ))}
                  <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Price</Text>
                    <Text style={[styles.detailValue, { color: PURPLE, fontWeight: "800" }]}>{expert.price} / min</Text>
                  </View>
                </View>
                <View style={{ flexDirection: "row", gap: 8, marginTop: 14 }}>
                  <TouchableOpacity style={styles.expertActionBtn} onPress={() => router.push("/(tabs)/chat")}>
                    <MessageCircle size={13} color={PURPLE} /><Text style={styles.expertActionText}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.expertActionBtn}>
                    <Phone size={13} color={PURPLE} /><Text style={styles.expertActionText}>Call</Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* EXPLORE BY CATEGORY */}
        <View style={{ backgroundColor: "rgba(45,27,84,0.95)", paddingVertical: 32, paddingTop: 28, marginTop: 24 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 20, alignItems: "center" }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <View style={{ width: 24, height: 2, backgroundColor: LAVENDER }} />
              <Text style={{ fontSize: 10, fontWeight: "900", color: LAVENDER, letterSpacing: 2, textTransform: "uppercase" }}>Explore Free Insights</Text>
              <View style={{ width: 24, height: 2, backgroundColor: LAVENDER }} />
            </View>
            <Text style={{ fontSize: 26, fontWeight: "700", color: "#F8F7FA", textAlign: "center", marginBottom: 6 }}>Explore by Category</Text>
            <Text style={{ fontSize: 13, color: LAVENDER, textAlign: "center" }}>Find the perfect practitioner for your unique journey.</Text>
          </View>
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 12, paddingHorizontal: 20 }}>
            {MODALITIES.map((mod) => (
              <TouchableOpacity key={mod.id} style={styles.modalityCard} activeOpacity={0.8} onPress={() => router.push("/(tabs)/explore")}>
                <View style={styles.modalityImageCircle}>
                  <Image source={{ uri: mod.image }} style={{ width: "100%", height: "100%" }} resizeMode="contain" />
                </View>
                <Text style={styles.modalityName}>{mod.name}</Text>
                <Text style={styles.modalityDesc} numberOfLines={2}>{mod.desc}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 8 }}>
                  <Text style={{ fontSize: 10, fontWeight: "800", color: LAVENDER, letterSpacing: 1, textTransform: "uppercase" }}>EXPLORE</Text>
                  <ArrowRight size={11} color={LAVENDER} />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* YOUR NEXT DISCOVERY — 3 paths */}
        <View style={[styles.section, { backgroundColor: BG }]}>
          <View style={{ paddingHorizontal: 20, marginBottom: 20, alignItems: "center" }}>
            <Text style={{ fontSize: 11, color: PURPLE, fontWeight: "900", letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>✦ YOU ✦</Text>
            <View style={{ height: 1, backgroundColor: "#D8B4FE", width: 100, marginBottom: 10 }} />
            <Text style={{ fontSize: 25, fontWeight: "700", color: TEXT, textAlign: "center", marginBottom: 6 }}>Where Will You Go Next?</Text>
            <Text style={{ fontSize: 13, color: TEXT_MUTED, textAlign: "center" }}>Three paths. One cosmic journey.</Text>
          </View>
          <View style={{ paddingHorizontal: 20, gap: 14 }}>
            {PATHS.map((path, i) => (
              <TouchableOpacity key={i} style={[styles.pathCard, activePath === i && { borderColor: path.color }]} onPress={() => setActivePath(activePath === i ? null : i)} activeOpacity={0.85}>
                {path.popular && <View style={[styles.popularBadge, { backgroundColor: path.color + "33", borderColor: path.color }]}><Text style={[styles.popularBadgeText, { color: path.color }]}>POPULAR</Text></View>}
                <Text style={{ fontSize: 9, fontWeight: "900", color: TEXT_MUTED, letterSpacing: 2, textTransform: "uppercase", marginBottom: 4 }}>{path.label}</Text>
                <Text style={{ fontSize: 18, fontWeight: "800", color: TEXT, marginBottom: 8 }}>{path.title}</Text>
                <Text style={{ fontSize: 13, color: TEXT_MUTED, lineHeight: 19, marginBottom: 12 }}>{path.desc}</Text>
                {path.features.map((f, fi) => (
                  <View key={fi} style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <Check size={13} color={path.color} />
                    <Text style={{ fontSize: 12, color: TEXT_MUTED, fontWeight: "500" }}>{f}</Text>
                  </View>
                ))}
                <TouchableOpacity style={[styles.pathCTA, { borderColor: path.color }]} onPress={() => router.push("/(tabs)/explore")}>
                  <Text style={[styles.pathCTAText, { color: path.color }]}>Begin This Path</Text>
                  <ArrowRight size={14} color={path.color} />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.cosmicBtn} onPress={() => router.push("/(tabs)/explore")}>
            <LinearGradient colors={["#7C3AED", "#6D28D9"]} style={styles.cosmicBtnGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 15 }}>Begin Your Cosmic Journey</Text>
              <ArrowRight size={16} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", fontSize: 11, color: TEXT_MUTED, marginTop: 8, paddingBottom: 4 }}>Free to explore. No credit card required.</Text>
        </View>

        {/* TESTIMONIALS */}
        <View style={{ backgroundColor: DARK_BG, paddingVertical: 32, paddingTop: 28 }}>
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <View style={{ width: 24, height: 2, backgroundColor: LAVENDER }} />
              <Text style={{ fontSize: 9, fontWeight: "900", color: LAVENDER, letterSpacing: 2, textTransform: "uppercase" }}>Global Impact</Text>
            </View>
            <Text style={{ fontSize: 26, fontWeight: "700", color: "#F8F7FA" }}>Real people. Real reviews.</Text>
            <View style={{ width: 40, height: 2, backgroundColor: LAVENDER, marginTop: 8, marginBottom: 8 }} />
            <Text style={{ fontSize: 13, color: "#B79AE6" }}>Real experiences from our global community of seekers.</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {TESTIMONIALS.map((t, i) => (
              <View key={i} style={styles.testimonialCard}>
                <View style={{ flexDirection: "row", gap: 3, marginBottom: 14 }}>
                  {[1,2,3,4,5].map(s => <Star key={s} size={13} fill={LAVENDER} color={LAVENDER} />)}
                </View>
                <Text style={{ fontSize: 14, color: "#F8F7FA", lineHeight: 21, fontWeight: "300", marginBottom: 16, flex: 1 }}>"{t.text}"</Text>
                <View style={{ borderTopWidth: 1, borderTopColor: "#4B2F6E", paddingTop: 14, flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View style={styles.testimonialAvatar}><Text style={{ color: LAVENDER, fontWeight: "800", fontSize: 16 }}>{t.name.charAt(0)}</Text></View>
                  <View>
                    <Text style={{ color: "#F8F7FA", fontWeight: "700", fontSize: 13 }}>{t.name}</Text>
                    <Text style={{ color: "#B79AE6", fontSize: 11, letterSpacing: 1, textTransform: "uppercase", marginTop: 2 }}>{t.loc}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 24/7 SUPPORT */}
        <View style={{ backgroundColor: "#4D316B", paddingVertical: 32, paddingHorizontal: 20, paddingTop: 28 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <View style={{ width: 24, height: 2, backgroundColor: LAVENDER }} />
            <Text style={{ fontSize: 9, fontWeight: "900", color: LAVENDER, letterSpacing: 2, textTransform: "uppercase" }}>The ZenAuraa App</Text>
          </View>
          <Text style={{ fontSize: 26, fontWeight: "800", color: "#F8F7FA", lineHeight: 34, marginBottom: 12 }}>
            Astrology made simpler, and available to you <Text style={{ color: LAVENDER }}>24/7.</Text>
          </Text>
          <Text style={{ fontSize: 14, color: LAVENDER, lineHeight: 22, marginBottom: 18 }}>
            Connect with an astrologer anytime, and find the solutions to all your love, marriage, career, and finance related problems instantly.
          </Text>
          {["Instant chats, notifications, and alerts", "Secure payments, UPI, cards & wallet, all encrypted"].map((f, i) => (
            <View key={i} style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Check size={16} color={LAVENDER} />
              <Text style={{ fontSize: 13, color: "#F8F7FA", fontWeight: "500" }}>{f}</Text>
            </View>
          ))}
          <View style={{ flexDirection: "row", gap: 12, marginTop: 20 }}>
            <TouchableOpacity style={styles.storeBadge}>
              <Smartphone size={18} color="#4D316B" />
              <Text style={styles.storeBadgeText}>App Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.storeBadge}>
              <Smartphone size={18} color="#4D316B" />
              <Text style={styles.storeBadgeText}>Google Play</Text>
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: { height: 500, overflow: "hidden", position: "relative", shadowColor: "#000", shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 20, elevation: 10 },
  heroHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 24, paddingTop: Platform.OS === "android" ? 54 : 64 },
  iconBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" },
  logoBubble: { width: 80, height: 80, borderRadius: 40, backgroundColor: "rgba(255,255,255,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 2, borderColor: "rgba(255,255,255,0.3)" },
  heroContent: { paddingHorizontal: 24, paddingTop: 20, alignItems: "center" },
  heroTitle: { fontSize: 40, fontWeight: "900", color: "#fff", textAlign: "center", letterSpacing: -1, marginBottom: 10 },
  heroSubtitle: { fontSize: 15, color: "rgba(255,255,255,0.85)", textAlign: "center", lineHeight: 22 },
  heroBtnYellow: { flexDirection: "row", alignItems: "center", gap: 6, backgroundColor: "#FCD34D", borderRadius: 24, paddingHorizontal: 20, paddingVertical: 12 },
  heroBtnYellowText: { fontSize: 14, fontWeight: "800", color: "#1e1b4b" },
  heroBtnPurple: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#6B46C1", borderRadius: 28, paddingHorizontal: 24, paddingVertical: 14, marginTop: 12 },
  heroBtnPurpleText: { fontSize: 15, fontWeight: "700", color: "#fff" },
  section: { paddingTop: 28 },
  sectionHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16, paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: "800", color: TEXT, letterSpacing: -0.5, maxWidth: "70%" },
  seeAllBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  seeAllText: { fontSize: 13, color: PURPLE, fontWeight: "700" },
  expertCard: { width: width * 0.72, borderRadius: 28, backgroundColor: "#FFF7ED", borderWidth: 1.5, borderColor: "#FDE68A", padding: 18, shadowColor: "#F59E0B", shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.15, shadowRadius: 16, elevation: 6, position: "relative" },
  expertBadge: { position: "absolute", top: 16, right: 16, backgroundColor: PURPLE, borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4 },
  expertBadgeText: { fontSize: 9, fontWeight: "900", color: "#fff", letterSpacing: 1.5, textTransform: "uppercase" },
  expertAvatarWrap: { width: 64, height: 64, borderRadius: 32, overflow: "hidden", borderWidth: 2.5, borderColor: "#DDD6FE", position: "relative" },
  onlineDot: { position: "absolute", bottom: 2, right: 2, width: 12, height: 12, borderRadius: 6, backgroundColor: "#10B981", borderWidth: 2, borderColor: "#FFF7ED" },
  expertName: { fontSize: 16, fontWeight: "800", color: PURPLE },
  rolePill: { backgroundColor: "#EDE9FE", borderRadius: 10, paddingHorizontal: 8, paddingVertical: 3, alignSelf: "flex-start", marginTop: 4 },
  roleText: { fontSize: 11, color: "#6D28D9", fontWeight: "600" },
  expertDetails: { borderTopWidth: 1, borderTopColor: "#EDE9FE", paddingTop: 12, gap: 6 },
  detailRow: { flexDirection: "row", justifyContent: "space-between" },
  detailLabel: { fontSize: 11, color: TEXT_MUTED },
  detailValue: { fontSize: 11, color: TEXT, fontWeight: "600" },
  expertActionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 5, backgroundColor: "#EDE9FE", borderRadius: 12, paddingVertical: 8, borderWidth: 1, borderColor: "#DDD6FE" },
  expertActionText: { fontSize: 12, fontWeight: "800", color: PURPLE },
  modalityCard: { width: (width - 52) / 2, backgroundColor: "rgba(255,255,255,0.07)", borderRadius: 20, padding: 16, borderWidth: 1, borderColor: "rgba(167,139,250,0.2)", alignItems: "center" },
  modalityImageCircle: { width: 88, height: 88, borderRadius: 44, backgroundColor: "#2A1658", borderWidth: 2, borderColor: "rgba(167,139,250,0.3)", overflow: "hidden", marginBottom: 12, padding: 8 },
  modalityName: { fontSize: 13, fontWeight: "700", color: "#F8F7FA", textAlign: "center", marginBottom: 4 },
  modalityDesc: { fontSize: 11, color: "#A78BFA", textAlign: "center", lineHeight: 16 },
  pathCard: { backgroundColor: "#fff", borderRadius: 24, padding: 20, borderWidth: 1.5, borderColor: "rgba(124,58,237,0.15)", shadowColor: PURPLE, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, position: "relative" },
  popularBadge: { position: "absolute", top: 16, right: 16, borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4, borderWidth: 1 },
  popularBadgeText: { fontSize: 9, fontWeight: "900", letterSpacing: 1.5, textTransform: "uppercase" },
  pathCTA: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: 16, borderWidth: 1.5, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 10, alignSelf: "flex-start" },
  pathCTAText: { fontSize: 13, fontWeight: "700" },
  cosmicBtn: { marginHorizontal: 20, marginTop: 24, borderRadius: 20, overflow: "hidden", shadowColor: PURPLE, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  cosmicBtnGradient: { paddingVertical: 18, flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 10 },
  testimonialCard: { width: width * 0.78, backgroundColor: "#2D1B54", borderRadius: 28, padding: 22, borderWidth: 1, borderColor: "#4B2F6E", shadowColor: PURPLE, shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.2, shadowRadius: 14, elevation: 6 },
  testimonialAvatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(167,139,250,0.15)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#4B2F6E" },
  storeBadge: { flexDirection: "row", alignItems: "center", gap: 8, backgroundColor: "#fff", borderRadius: 14, paddingHorizontal: 18, paddingVertical: 12 },
  storeBadgeText: { fontSize: 13, fontWeight: "800", color: "#4D316B" },
});