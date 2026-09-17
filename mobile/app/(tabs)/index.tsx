import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions,
  StyleSheet, ImageBackground, FlatList
} from "react-native";
import { useRouter } from "expo-router";
import {
  MessageCircle, Phone, ArrowRight, Star
} from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";
import WebReplicaHeader from "../../components/WebReplicaHeader";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const EXPERTS = [
  { name: "piyush", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹100 / min", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Abhishek Giri", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹0 / min", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Pooja", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹0 / min", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { name: "Deepak's Expert", role: "Tarot • Astrology", rating: "4.5", exp: "New Expert", price: "₹100 / min", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
];

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <WebReplicaHeader />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* HERO SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>ZenAuraa.</Text>
          <Text style={styles.heroSubtitle}>
            Find trusted guidance for every stage of life. Connect with verified experts instantly.
          </Text>

          <View style={styles.heroButtonsRow}>
            <TouchableOpacity style={styles.yellowBtn}>
              <MessageCircle size={18} color="#1a1a1a" style={{ marginRight: 6 }} />
              <Text style={styles.yellowBtnText}>Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yellowBtn}>
              <Phone size={18} color="#1a1a1a" style={{ marginRight: 6 }} />
              <Text style={styles.yellowBtnText}>Call</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.purpleBtn}>
            <Text style={styles.purpleBtnText}>Ask me Anything</Text>
            <ArrowRight size={18} color="#fff" />
          </TouchableOpacity>

          <View style={styles.trustIndicator}>
            <View style={styles.avatarPile}>
              {EXPERTS.slice(0,3).map((exp, i) => (
                <Image key={i} source={{ uri: exp.img }} style={[styles.pileAvatar, { left: i * 20, zIndex: 10 - i }]} />
              ))}
            </View>
            <View style={{ marginLeft: 80 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={styles.trustScore}>4.9</Text>
                <Star size={14} color="#F59E0B" fill="#F59E0B" style={{ marginLeft: 4 }} />
              </View>
              <Text style={styles.trustText}>Based on 10,000+ reviews</Text>
            </View>
          </View>
        </View>

        {/* FEATURED EXPERTS */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionSubtitle}>FEATURED EXPERTS</Text>
          <Text style={styles.sectionTitle}>Connect with top-rated guides.</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
            {EXPERTS.map((expert, i) => (
              <View key={i} style={styles.expertCard}>
                <View style={styles.celebrityBadge}>
                  <Text style={styles.celebrityText}>CELEBRITY</Text>
                </View>
                
                <Image source={{ uri: expert.img }} style={styles.expertAvatar} />
                <View style={styles.onlineDot} />

                <Text style={styles.expertName}>{expert.name}</Text>
                <Text style={styles.expertRole}>{expert.role}</Text>
                
                <View style={styles.expertRatingRow}>
                  <Star size={14} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.expertRating}>{expert.rating}</Text>
                  <Text style={styles.expertOrders}>(128k+ orders)</Text>
                </View>

                <View style={styles.expertDivider} />
                
                <View style={styles.expertDetailRow}>
                  <Text style={styles.expertDetailLabel}>Languages</Text>
                  <Text style={styles.expertDetailValue}>English, Hindi</Text>
                </View>
                <View style={styles.expertDetailRow}>
                  <Text style={styles.expertDetailLabel}>Experience</Text>
                  <Text style={styles.expertDetailValue}>{expert.exp}</Text>
                </View>
                <View style={styles.expertDetailRow}>
                  <Text style={styles.expertDetailLabel}>Price</Text>
                  <Text style={styles.expertDetailValueGold}>{expert.price}</Text>
                </View>

                <View style={styles.expertButtonsRow}>
                  <TouchableOpacity style={styles.expertBtn}>
                    <MessageCircle size={14} color="#A78BFA" style={{ marginRight: 6 }} />
                    <Text style={styles.expertBtnText}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.expertBtn}>
                    <Phone size={14} color="#A78BFA" style={{ marginRight: 6 }} />
                    <Text style={styles.expertBtnText}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={{ alignItems: 'center', marginTop: 24 }}>
            <Text style={styles.viewAllText}>View All Experts →</Text>
          </TouchableOpacity>
        </View>

        {/* EXPLORE CATEGORY */}
        <View style={styles.exploreSection}>
          <Text style={styles.exploreTitle}>Explore by Category</Text>
          <Text style={styles.exploreSubtitle}>Find the perfect practitioner for your unique journey.</Text>

          <View style={{ paddingHorizontal: 20, gap: 16, marginTop: 20 }}>
            {/* Astrology Card */}
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIconWrap}>
                <Image source={{ uri: "https://zenauraa.com/final_ensights/astrology.png" }} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryName}>Astrology</Text>
              <Text style={styles.categoryDesc}>Gain cosmic insights and life path guidance.</Text>
              <Text style={styles.categoryExplore}>EXPLORE →</Text>
            </TouchableOpacity>
            
            {/* Tarot Card */}
            <TouchableOpacity style={styles.categoryCard}>
              <View style={styles.categoryIconWrap}>
                <Image source={{ uri: "https://zenauraa.com/final_ensights/tarot.png" }} style={styles.categoryIcon} />
              </View>
              <Text style={styles.categoryName}>Tarot</Text>
              <Text style={styles.categoryDesc}>Unveil hidden truths through symbolic cards.</Text>
              <Text style={styles.categoryExplore}>EXPLORE →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* TAROT DRAW */}
        <View style={styles.tarotSection}>
          <Text style={styles.tarotSubtitle}>TAROT READING</Text>
          <Text style={styles.tarotTitle}>Draw 3 Cards</Text>
          <Text style={styles.tarotDesc}>Set your intention. Choose 3 cards to reveal your Past, Present, and Future.</Text>
          
          <View style={styles.tarotCounter}>
            <Text style={styles.tarotCounterText}>✨ "0/3 cards selected"</Text>
          </View>
          
          {/* Faux Tarot Deck */}
          <View style={styles.tarotDeck}>
            {[...Array(6)].map((_, i) => (
              <View key={i} style={[styles.tarotCardMock, { transform: [{ rotate: `${(i - 2.5) * 8}deg` }, { translateY: Math.abs(i - 2.5) * 5 }] }]} />
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heroSection: { padding: 20, paddingTop: 30 },
  heroTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 48, color: '#2d1b69', marginBottom: 12 },
  heroSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 18, color: '#2d1b69', opacity: 0.9, lineHeight: 26, marginBottom: 24, maxWidth: '90%' },
  heroButtonsRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  yellowBtn: { flex: 1, backgroundColor: '#FCD34D', paddingVertical: 14, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  yellowBtnText: { fontFamily: 'Inter_600SemiBold', color: '#1a1a1a', fontSize: 16 },
  purpleBtn: { backgroundColor: '#6D28D9', paddingVertical: 16, borderRadius: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10 },
  purpleBtnText: { fontFamily: 'Inter_600SemiBold', color: '#fff', fontSize: 16 },
  trustIndicator: { flexDirection: 'row', alignItems: 'center', marginTop: 24, position: 'relative' },
  avatarPile: { position: 'absolute', top: 0, left: 0, flexDirection: 'row' },
  pileAvatar: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: '#F0E6F5', position: 'absolute' },
  trustScore: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#2d1b69' },
  trustText: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#2d1b69', opacity: 0.8 },
  
  featuredSection: { marginTop: 40 },
  sectionSubtitle: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: '#D97706', letterSpacing: 1.5, paddingHorizontal: 20, marginBottom: 8, textTransform: 'uppercase' },
  sectionTitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 32, color: '#fff', paddingHorizontal: 20, marginBottom: 24, lineHeight: 40 },
  expertCard: { backgroundColor: '#2d1b69', borderRadius: 24, width: 260, padding: 24, position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.2, shadowRadius: 15, elevation: 5 },
  celebrityBadge: { position: 'absolute', top: 16, right: 16, backgroundColor: '#FCD34D', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, zIndex: 10 },
  celebrityText: { fontFamily: 'Inter_600SemiBold', fontSize: 9, color: '#1a1a1a' },
  expertAvatar: { width: 80, height: 80, borderRadius: 40, borderWidth: 2, borderColor: '#4c1d95', alignSelf: 'center', marginBottom: 16 },
  onlineDot: { width: 14, height: 14, borderRadius: 7, backgroundColor: '#10B981', position: 'absolute', top: 80, right: 90, borderWidth: 2, borderColor: '#2d1b69' },
  expertName: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 22, color: '#fff', textAlign: 'center', marginBottom: 4 },
  expertRole: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#FCD34D', textAlign: 'center', marginBottom: 16 },
  expertRatingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 16 },
  expertRating: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#fff' },
  expertOrders: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#A78BFA' },
  expertDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 16 },
  expertDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  expertDetailLabel: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#A78BFA' },
  expertDetailValue: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#fff' },
  expertDetailValueGold: { fontFamily: 'Inter_700Bold', fontSize: 14, color: '#FCD34D' },
  expertButtonsRow: { flexDirection: 'row', gap: 10, marginTop: 16 },
  expertBtn: { flex: 1, borderColor: 'rgba(167,139,250,0.4)', borderWidth: 1, borderRadius: 16, paddingVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  expertBtnText: { fontFamily: 'Inter_600SemiBold', color: '#A78BFA', fontSize: 13 },
  viewAllText: { fontFamily: 'Inter_600SemiBold', color: '#FCD34D', fontSize: 14 },

  exploreSection: { marginTop: 50 },
  exploreTitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 32, color: '#2d1b69', textAlign: 'center', marginBottom: 8 },
  exploreSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 16, color: '#4c1d95', textAlign: 'center', paddingHorizontal: 40, lineHeight: 22 },
  categoryCard: { backgroundColor: '#1a103c', borderRadius: 24, padding: 30, alignItems: 'center' },
  categoryIconWrap: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  categoryIcon: { width: '100%', height: '100%', resizeMode: 'contain' },
  categoryName: { fontFamily: 'Inter_600SemiBold', fontSize: 22, color: '#fff', marginBottom: 10 },
  categoryDesc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#A78BFA', textAlign: 'center', marginBottom: 20, paddingHorizontal: 20 },
  categoryExplore: { fontFamily: 'Inter_700Bold', fontSize: 12, color: '#FCD34D', letterSpacing: 1 },

  tarotSection: { marginTop: 50, paddingHorizontal: 20, alignItems: 'center' },
  tarotSubtitle: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: '#4c1d95', letterSpacing: 1.5, marginBottom: 8 },
  tarotTitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 36, color: '#fff', marginBottom: 16 },
  tarotDesc: { fontFamily: 'Inter_400Regular', fontSize: 16, color: '#4c1d95', textAlign: 'center', marginBottom: 24, lineHeight: 24, paddingHorizontal: 20 },
  tarotCounter: { backgroundColor: '#8B5CF6', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, marginBottom: 40 },
  tarotCounterText: { fontFamily: 'Inter_600SemiBold', color: '#fff', fontSize: 14 },
  tarotDeck: { flexDirection: 'row', justifyContent: 'center', height: 150, width: '100%', position: 'relative' },
  tarotCardMock: { width: 60, height: 100, backgroundColor: '#F0E6F5', borderRadius: 8, borderWidth: 1, borderColor: '#A78BFA', position: 'absolute', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 5, shadowOffset: { width: 0, height: 2 } }
});