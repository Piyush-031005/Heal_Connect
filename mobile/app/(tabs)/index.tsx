import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Platform, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { Search, Bell, Sparkles, MessageCircle, Heart, User, ChevronRight, Video, FileText, Globe, Star, Users } from "lucide-react-native";
import Animated, { useAnimatedStyle, withRepeat, withTiming, withSequence } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import Lightfall from "../../components/Lightfall";
import GhostFibers from "../../components/GhostFibers";

const { width } = Dimensions.get("window");

const PURPLE = "#7C3AED";
const LAVENDER = "#A78BFA";
const YELLOW = "#F59E0B";
const YELLOW_BG = "#FFF7ED";
const BACKGROUND = "#F5F3FF";
const CARD = "#FFFFFF";
const TEXT = "#1E1B4B";
const TEXT_MUTED = "#6B5E80";
const GOLD = "#F59E0B";

// Cartoon avatar crops from the sprite image
const AVATAR_POSITIONS = [
  { expert: "Shivani", spec: "Tarot Reader", rating: 4.9, reviews: 128, rate: 15, avatarX: 0 },
  { expert: "Dr. Aryan", spec: "Astrologer", rating: 4.8, reviews: 89, rate: 20, avatarX: 1 },
  { expert: "Meera", spec: "Healer", rating: 4.7, reviews: 56, rate: 12, avatarX: 2 },
];

const MODALITIES = [
  { id: "1", name: "Tarot", icon: Sparkles, color: "#EC4899", bg: "#FDF2F8" },
  { id: "2", name: "Astrology", icon: Globe, color: "#3B82F6", bg: "#EFF6FF" },
  { id: "3", name: "Numerology", icon: FileText, color: "#10B981", bg: "#ECFDF5" },
  { id: "4", name: "Healing", icon: Heart, color: "#F43F5E", bg: "#FFF1F2" },
];

export default function HomeTab() {
  const router = useRouter();

  const animatedPulse = useAnimatedStyle(() => ({
    transform: [{ scale: withRepeat(withSequence(withTiming(1, { duration: 1000 }), withTiming(1.02, { duration: 1000 })), -1, true) }]
  }));

  return (
    <View style={{ flex: 1, backgroundColor: BACKGROUND }}>
      {/* Global ghost fibers on entire page */}
      <GhostFibers
        lineColor="#C4B5FD"
        glowColor="#A78BFA"
        speed={0.2}
        scale={0.9}
        brightness={3.2}
        blueBoost={0.5}
        lightMode={true}
        layers={10}
        lineFrequency={12}
        lineSpacing={0.9}
        glowIntensity={3.0}
      />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* ──────────── HERO with LIGHTFALL ──────────── */}
        <View style={styles.heroContainer}>
          <View style={[StyleSheet.absoluteFill, { backgroundColor: '#3B1FA8' }]} />

          <Lightfall
            colors={["#C4B5FD", "#FDE047", "#F472B6"]}
            backgroundColor="#3B1FA8"
            speed={0.5}
            opacity={1}
            zoom={2.0}
            density={0.6}
            twinkle={1.2}
            glow={1.0}
          />

          <View style={StyleSheet.absoluteFill}>
            <View style={styles.heroHeader}>
              <TouchableOpacity style={styles.iconBtn}>
                <Search size={20} color="#fff" />
              </TouchableOpacity>

              {/* BIGGER centred logo */}
              <View style={styles.logoBubble}>
                <Image
                  source={require("../../assets/images/main_logo.png")}
                  style={{ width: 70, height: 70, resizeMode: "contain", tintColor: "#fff" }}
                />
              </View>

              <TouchableOpacity style={styles.iconBtn}>
                <Bell size={20} color="#fff" />
              </TouchableOpacity>
            </View>

            <View style={styles.heroContent}>
              <Text style={styles.heroTitle}>Find Clarity &{"\n"}Peace of Mind</Text>
              <Text style={styles.heroSubtitle}>Connect with verified experts for guidance on your life's journey.</Text>
            </View>
          </View>
        </View>

        {/* ──────────── QUOTE CARD ──────────── */}
        <View style={styles.quoteCard}>
          <LinearGradient colors={["#FFFFFF", "#F5F3FF"]} style={styles.quoteGradient}>
            <Text style={styles.quoteText}>"The universe always supports a sincere heart."</Text>
            <Text style={styles.quoteAuthor}>✦ Daily Wisdom</Text>
          </LinearGradient>
        </View>

        {/* ──────────── EXPERTS ──────────── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Top Experts Online</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/explore")} style={styles.seeAllBtn}>
              <Text style={styles.seeAllText}>See All</Text>
              <ChevronRight size={14} color={PURPLE} />
            </TouchableOpacity>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 14 }}>
            {AVATAR_POSITIONS.map((p, i) => (
              <TouchableOpacity key={i} style={styles.expertCard} activeOpacity={0.88}>
                {/* Yellow card background with purple accent */}
                <LinearGradient
                  colors={["#FFF7ED", "#FFFBEB"]}
                  style={StyleSheet.absoluteFill}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                />
                <View style={styles.expertCardInner}>
                  {/* Cartoon avatar */}
                  <View style={styles.expertAvatarBubble}>
                    <Image
                      source={require("../../assets/images/expert_avatars.jpg")}
                      style={{
                        width: 240,
                        height: 90,
                        position: "absolute",
                        left: -p.avatarX * 60,
                        top: 0,
                      }}
                      resizeMode="cover"
                    />
                  </View>

                  {/* Online badge */}
                  <View style={styles.onlineBadge}>
                    <View style={styles.onlineDot} />
                    <Text style={styles.onlineBadgeText}>Online</Text>
                  </View>

                  <Text style={styles.expertName}>{p.expert}</Text>
                  <Text style={styles.expertSpec}>{p.spec}</Text>

                  {/* Rating */}
                  <View style={styles.ratingRow}>
                    <Star size={11} color={GOLD} fill={GOLD} />
                    <Text style={styles.ratingText}>{p.rating} ({p.reviews})</Text>
                  </View>

                  {/* Rate + Chat button */}
                  <View style={styles.expertBottom}>
                    <Text style={styles.rateText}>₹{p.rate}/min</Text>
                    <TouchableOpacity style={styles.chatBtn}>
                      <MessageCircle size={11} color={PURPLE} />
                      <Text style={styles.chatBtnText}>Chat</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* ──────────── CTA BANNER ──────────── */}
        <View style={styles.ctaBanner}>
          <LinearGradient colors={[PURPLE, "#4C1D95"]} style={styles.ctaGradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
            <Text style={styles.ctaTitle}>Your First Session Free</Text>
            <Text style={styles.ctaSubtitle}>Talk to an expert and get instant clarity</Text>
            <TouchableOpacity style={styles.ctaButton} onPress={() => router.push("/(tabs)/explore")}>
              <Text style={styles.ctaButtonText}>Explore Experts →</Text>
            </TouchableOpacity>
          </LinearGradient>
        </View>

        {/* ──────────── SERVICES GRID ──────────── */}
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
                <TouchableOpacity key={m.id} style={[styles.modalityCard, { backgroundColor: m.bg, borderColor: m.color + "22" }]} activeOpacity={0.8}>
                  <View style={[styles.modalityIcon, { backgroundColor: m.color + "18" }]}>
                    <IconComp size={24} color={m.color} />
                  </View>
                  <Text style={[styles.modalityName, { color: m.color }]}>{m.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    height: 420,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    overflow: "hidden",
    position: "relative",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 54 : 64,
  },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  logoBubble: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "rgba(255,255,255,0.18)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.35)",
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 20,
    elevation: 8,
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingTop: 28,
    alignItems: "center",
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "900",
    color: "#fff",
    textAlign: "center",
    lineHeight: 42,
    letterSpacing: -1,
    marginBottom: 12,
    textShadowColor: "rgba(0,0,0,0.25)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  heroSubtitle: {
    fontSize: 15,
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: 20,
    fontWeight: "500",
  },
  quoteCard: {
    marginHorizontal: 20,
    marginTop: -28,
    marginBottom: 20,
    borderRadius: 24,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 8,
  },
  quoteGradient: {
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "rgba(167,139,250,0.25)",
    alignItems: "center",
  },
  quoteText: {
    fontSize: 15,
    color: TEXT,
    fontStyle: "italic",
    lineHeight: 22,
    marginBottom: 10,
    fontWeight: "600",
    textAlign: "center",
  },
  quoteAuthor: {
    fontSize: 13,
    color: PURPLE,
    fontWeight: "700",
    textAlign: "center",
  },
  section: {
    paddingTop: 24,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: TEXT,
    letterSpacing: -0.5,
  },
  seeAllBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
  seeAllText: {
    fontSize: 14,
    color: PURPLE,
    fontWeight: "700",
  },
  // ── EXPERT CARD ──
  expertCard: {
    width: 145,
    borderRadius: 24,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: "#FDE68A",
    shadowColor: YELLOW,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 6,
  },
  expertCardInner: {
    padding: 14,
    alignItems: "center",
    position: "relative",
  },
  expertAvatarBubble: {
    width: 68,
    height: 68,
    borderRadius: 34,
    overflow: "hidden",
    marginBottom: 10,
    borderWidth: 2.5,
    borderColor: "#DDD6FE",
    backgroundColor: "#EDE9FE",
  },
  onlineBadge: {
    position: "absolute",
    top: 12,
    right: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#ECFDF5",
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: "#6EE7B7",
  },
  onlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#10B981",
  },
  onlineBadgeText: {
    fontSize: 10,
    fontWeight: "700",
    color: "#065F46",
  },
  expertName: {
    fontSize: 14,
    fontWeight: "800",
    color: PURPLE,
    textAlign: "center",
  },
  expertSpec: {
    fontSize: 11,
    color: TEXT_MUTED,
    textAlign: "center",
    marginTop: 3,
    fontWeight: "500",
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    marginTop: 6,
  },
  ratingText: {
    fontSize: 11,
    fontWeight: "700",
    color: "#92400E",
  },
  expertBottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 12,
    width: "100%",
  },
  rateText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#5B21B6",
  },
  chatBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EDE9FE",
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  chatBtnText: {
    fontSize: 11,
    fontWeight: "800",
    color: PURPLE,
  },
  ctaBanner: {
    marginHorizontal: 20,
    marginTop: 24,
    marginBottom: 8,
    borderRadius: 28,
    shadowColor: PURPLE,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 10,
    overflow: "hidden",
  },
  ctaGradient: {
    borderRadius: 28,
    padding: 28,
    alignItems: "center",
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: "900",
    color: "#fff",
    marginBottom: 8,
    letterSpacing: -0.5,
    textAlign: "center",
  },
  ctaSubtitle: {
    fontSize: 14,
    color: "rgba(255,255,255,0.85)",
    marginBottom: 20,
    fontWeight: "500",
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: YELLOW,
    borderRadius: 14,
    paddingHorizontal: 28,
    paddingVertical: 14,
    shadowColor: YELLOW,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  ctaButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 15,
  },
  modalityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingHorizontal: 20,
  },
  modalityCard: {
    width: (width - 52) / 2,
    borderRadius: 20,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
  },
  modalityIcon: {
    width: 44,
    height: 44,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  modalityName: {
    fontSize: 14,
    fontWeight: "700",
  },
});