import React, { useState } from "react";
import {
  View, Text, ScrollView, TouchableOpacity, Image, Dimensions,
  StyleSheet, ImageBackground
} from "react-native";
import { useRouter } from "expo-router";
import {
  MessageCircle, Phone, ArrowRight, Star, ChevronDown, ChevronUp
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

const MODALITIES = [
  { name: "Astrology", desc: "Cosmic insights", img: require("../../assets/images/astrology.png"), route: "astrology" },
  { name: "Tarot", desc: "Unveil truths", img: require("../../assets/images/tarot.png"), route: "tarot" },
  { name: "Vastu", desc: "Space harmony", img: require("../../assets/images/space-harmony.png"), route: "vastu" },
  { name: "Numerology", desc: "Number paths", img: require("../../assets/images/numerology.png"), route: "numerology" },
];

const REVIEWS = [
  { text: "ZenAuraa totally transformed how I see my career path. Maya's reading was spot on!", author: "- Sarah J." },
  { text: "I finally found peace of mind after consulting with Arun. The tarot reading was deep.", author: "- Michael T." },
  { text: "Amazing platform, the experts genuinely care about guiding you.", author: "- Priya R." }
];

const FAQS = [
  { q: "What is ZenAuraa?", a: "ZenAuraa is a premium platform connecting you with verified spiritual and wellness guides." },
  { q: "How do I start a free session?", a: "Simply sign up, browse our expert list, and claim your first free insights session." },
  { q: "Are the experts verified?", a: "Yes, all our practitioners undergo a strict verification process to ensure quality guidance." }
];

export default function HomeTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      <WebReplicaHeader />

      <ScrollView 
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* TOP HERO IMAGE (Meditating lady with Zodiac wheel) */}
        <View style={styles.heroImageContainer}>
          <Image 
            source={require('../../assets/images/main_hero.png')} 
            style={styles.heroImage}
          />
          {/* Gradient fade at the bottom to blend into the purple background seamlessly */}
          <LinearGradient
            colors={['transparent', 'rgba(213, 182, 220, 0.8)', '#D5B6DC']}
            style={styles.heroImageGradient}
          />
        </View>

        {/* HERO CONTENT SECTION */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>ZenAuraa.</Text>
          <Text style={styles.heroSubtitle}>
            Find trusted guidance for every stage of life. Connect with verified experts instantly.
          </Text>

          <View style={styles.heroButtonsRow}>
            <TouchableOpacity style={styles.yellowBtn}>
              <MessageCircle size={16} color="#1a1a1a" style={{ marginRight: 6 }} />
              <Text style={styles.yellowBtnText}>Free Chat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.yellowBtn}>
              <Phone size={16} color="#1a1a1a" style={{ marginRight: 6 }} />
              <Text style={styles.yellowBtnText}>Free Call</Text>
            </TouchableOpacity>
          </View>
          
          <TouchableOpacity style={styles.purpleBtn}>
            <Text style={styles.purpleBtnText}>Ask me Anything</Text>
            <ArrowRight size={16} color="#fff" />
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

        {/* LIVE SESSIONS SECTION */}
        <View style={styles.liveSection}>
          <View style={styles.liveHeader}>
            <View style={styles.livePulse} />
            <Text style={styles.liveTitle}>Live Sessions</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16 }}>
            {EXPERTS.map((expert, i) => (
              <View key={`live-${i}`} style={styles.liveCard}>
                <View style={styles.liveAvatarWrap}>
                  <Image source={{ uri: expert.img }} style={styles.liveAvatar} />
                  <View style={styles.liveBadge}><Text style={styles.liveBadgeText}>LIVE</Text></View>
                </View>
                <Text style={styles.liveName} numberOfLines={1}>{expert.name}</Text>
                <Text style={styles.liveRole} numberOfLines={1}>{expert.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* FEATURED EXPERTS */}
        <View style={styles.featuredSection}>
          <Text style={styles.sectionSubtitle}>FEATURED EXPERTS</Text>
          <Text style={styles.sectionTitle}>Connect with top-rated guides.</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}>
            {EXPERTS.map((expert, i) => (
              <View key={i} style={styles.expertCard}>
                <View style={styles.celebrityBadge}>
                  <Text style={styles.celebrityText}>CELEBRITY</Text>
                </View>
                
                <Image source={{ uri: expert.img }} style={styles.expertAvatar} />
                <View style={styles.onlineDot} />

                <Text style={styles.expertName} numberOfLines={1}>{expert.name}</Text>
                <Text style={styles.expertRole}>{expert.role}</Text>
                
                <View style={styles.expertRatingRow}>
                  <Star size={12} color="#F59E0B" fill="#F59E0B" />
                  <Text style={styles.expertRating}>{expert.rating}</Text>
                  <Text style={styles.expertOrders}>(128k+)</Text>
                </View>

                <View style={styles.expertDivider} />
                
                <View style={styles.expertDetailRow}>
                  <Text style={styles.expertDetailLabel}>Exp</Text>
                  <Text style={styles.expertDetailValue}>{expert.exp}</Text>
                </View>
                <View style={styles.expertDetailRow}>
                  <Text style={styles.expertDetailLabel}>Price</Text>
                  <Text style={styles.expertDetailValueGold}>{expert.price}</Text>
                </View>

                <View style={styles.expertButtonsRow}>
                  <TouchableOpacity style={styles.expertBtnYellow}>
                    <MessageCircle size={12} color="#1a1a1a" style={{ marginRight: 4 }} />
                    <Text style={styles.expertBtnTextDark}>Chat</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.expertBtnYellow}>
                    <Phone size={12} color="#1a1a1a" style={{ marginRight: 4 }} />
                    <Text style={styles.expertBtnTextDark}>Call</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          <TouchableOpacity style={{ alignItems: 'center', marginTop: 20 }}>
            <Text style={styles.viewAllText}>View All Experts →</Text>
          </TouchableOpacity>
        </View>

        {/* EXPLORE CATEGORY */}
        <View style={styles.exploreSection}>
          <Text style={styles.exploreTitle}>Explore by Category</Text>
          <Text style={styles.exploreSubtitle}>Find the perfect practitioner for your unique journey.</Text>

          <View style={styles.modalityGrid}>
            {MODALITIES.map((mod, i) => (
              <TouchableOpacity key={i} style={styles.categoryCardHalf} onPress={() => router.push("/(tabs)/explore")}>
                <View style={styles.categoryIconWrapHalf}>
                  <Image source={mod.img} style={styles.categoryIconHalf} />
                </View>
                <Text style={styles.categoryNameHalf}>{mod.name}</Text>
                <Text style={styles.categoryDescHalf}>{mod.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
          <TouchableOpacity style={styles.seeMoreBtn} onPress={() => router.push("/(tabs)/explore")}>
            <Text style={styles.seeMoreText}>See More Modalities →</Text>
          </TouchableOpacity>
        </View>

        {/* REVIEWS SECTION */}
        <View style={styles.reviewsSection}>
          <Text style={styles.tarotSubtitle}>TESTIMONIALS</Text>
          <Text style={styles.reviewsTitle}>Hear from our seekers.</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 16, marginTop: 16 }}>
            {REVIEWS.map((rev, i) => (
              <View key={i} style={styles.reviewCard}>
                <Star size={16} color="#F59E0B" fill="#F59E0B" style={{ marginBottom: 10 }} />
                <Text style={styles.reviewText}>"{rev.text}"</Text>
                <Text style={styles.reviewAuthor}>{rev.author}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* FAQ SECTION */}
        <View style={styles.faqSection}>
          <Text style={styles.reviewsTitle}>Frequently Asked Questions</Text>
          <View style={styles.faqContainer}>
            {FAQS.map((faq, i) => (
              <View key={i} style={styles.faqItem}>
                <TouchableOpacity style={styles.faqHeader} onPress={() => setOpenFaq(openFaq === i ? null : i)}>
                  <Text style={styles.faqQ}>{faq.q}</Text>
                  {openFaq === i ? <ChevronUp size={20} color="#2d1b69" /> : <ChevronDown size={20} color="#2d1b69" />}
                </TouchableOpacity>
                {openFaq === i && <Text style={styles.faqA}>{faq.a}</Text>}
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
  heroImageContainer: {
    width: '100%',
    height: 450,
    position: 'relative',
    marginTop: -20, // Pull up slightly to blend with header if needed
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroImageGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 150,
  },

  heroSection: { padding: 20, paddingTop: 0, paddingBottom: 30 },
  heroTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 42, color: '#2d1b69', marginBottom: 10 },
  heroSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 16, color: '#2d1b69', opacity: 0.9, lineHeight: 22, marginBottom: 20, maxWidth: '95%' },
  heroButtonsRow: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  yellowBtn: { flex: 1, backgroundColor: '#FCD34D', paddingVertical: 12, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 },
  yellowBtnText: { fontFamily: 'Inter_600SemiBold', color: '#1a1a1a', fontSize: 15 },
  purpleBtn: { backgroundColor: '#6D28D9', paddingVertical: 14, borderRadius: 24, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8 },
  purpleBtnText: { fontFamily: 'Inter_600SemiBold', color: '#fff', fontSize: 15 },
  trustIndicator: { flexDirection: 'row', alignItems: 'center', marginTop: 20, position: 'relative' },
  avatarPile: { position: 'absolute', top: -5, left: 0, flexDirection: 'row' },
  pileAvatar: { width: 32, height: 32, borderRadius: 16, borderWidth: 2, borderColor: '#F0E6F5', position: 'absolute' },
  trustScore: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#2d1b69' },
  trustText: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#2d1b69', opacity: 0.8 },
  
  liveSection: { marginTop: 10 },
  liveHeader: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, marginBottom: 12 },
  livePulse: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', marginRight: 8 },
  liveTitle: { fontFamily: 'Inter_700Bold', fontSize: 16, color: '#2d1b69' },
  liveCard: { alignItems: 'center', width: 70 },
  liveAvatarWrap: { position: 'relative', marginBottom: 8 },
  liveAvatar: { width: 60, height: 60, borderRadius: 30, borderWidth: 2, borderColor: '#EF4444' },
  liveBadge: { position: 'absolute', bottom: -6, alignSelf: 'center', backgroundColor: '#EF4444', paddingHorizontal: 6, paddingVertical: 2, borderRadius: 6, borderWidth: 1, borderColor: '#fff' },
  liveBadgeText: { fontFamily: 'Inter_700Bold', fontSize: 8, color: '#fff' },
  liveName: { fontFamily: 'Inter_600SemiBold', fontSize: 12, color: '#2d1b69', textAlign: 'center' },
  liveRole: { fontFamily: 'Inter_400Regular', fontSize: 10, color: '#4c1d95', textAlign: 'center' },

  featuredSection: { marginTop: 30 },
  sectionSubtitle: { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: '#D97706', letterSpacing: 1.2, paddingHorizontal: 20, marginBottom: 6, textTransform: 'uppercase' },
  sectionTitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 28, color: '#fff', paddingHorizontal: 20, marginBottom: 20, lineHeight: 34 },
  
  expertCard: { backgroundColor: '#2d1b69', borderRadius: 20, width: 170, padding: 16, position: 'relative', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.15, shadowRadius: 10, elevation: 4 },
  celebrityBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: '#FCD34D', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 10, zIndex: 10 },
  celebrityText: { fontFamily: 'Inter_600SemiBold', fontSize: 8, color: '#1a1a1a' },
  expertAvatar: { width: 64, height: 64, borderRadius: 32, borderWidth: 2, borderColor: '#4c1d95', alignSelf: 'center', marginBottom: 12 },
  onlineDot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#10B981', position: 'absolute', top: 60, right: 50, borderWidth: 2, borderColor: '#2d1b69' },
  expertName: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 18, color: '#fff', textAlign: 'center', marginBottom: 4 },
  expertRole: { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: '#FCD34D', textAlign: 'center', marginBottom: 12 },
  expertRatingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 4, marginBottom: 12 },
  expertRating: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#fff' },
  expertOrders: { fontFamily: 'Inter_400Regular', fontSize: 10, color: '#A78BFA' },
  expertDivider: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)', marginBottom: 12 },
  expertDetailRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  expertDetailLabel: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#A78BFA' },
  expertDetailValue: { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: '#fff' },
  expertDetailValueGold: { fontFamily: 'Inter_700Bold', fontSize: 12, color: '#FCD34D' },
  expertButtonsRow: { flexDirection: 'row', gap: 6, marginTop: 12 },
  expertBtnYellow: { flex: 1, backgroundColor: '#FCD34D', borderRadius: 12, paddingVertical: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' },
  expertBtnTextDark: { fontFamily: 'Inter_700Bold', color: '#1a1a1a', fontSize: 11 },
  viewAllText: { fontFamily: 'Inter_600SemiBold', color: '#FCD34D', fontSize: 13 },

  exploreSection: { marginTop: 40 },
  exploreTitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 28, color: '#2d1b69', textAlign: 'center', marginBottom: 6 },
  exploreSubtitle: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#4c1d95', textAlign: 'center', paddingHorizontal: 30, lineHeight: 20 },
  modalityGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, marginTop: 20, justifyContent: 'space-between' },
  categoryCardHalf: { width: (width - 48) / 2, backgroundColor: '#1a103c', borderRadius: 20, padding: 16, alignItems: 'center', marginBottom: 16 },
  categoryIconWrapHalf: { width: 70, height: 70, borderRadius: 35, marginBottom: 12 },
  categoryIconHalf: { width: '100%', height: '100%', resizeMode: 'contain' },
  categoryNameHalf: { fontFamily: 'Inter_600SemiBold', fontSize: 16, color: '#fff', marginBottom: 6 },
  categoryDescHalf: { fontFamily: 'Inter_400Regular', fontSize: 11, color: '#A78BFA', textAlign: 'center' },
  seeMoreBtn: { alignItems: 'center', marginTop: 10 },
  seeMoreText: { fontFamily: 'Inter_700Bold', fontSize: 13, color: '#2d1b69' },

  reviewsSection: { marginTop: 40 },
  reviewsTitle: { fontFamily: 'PlayfairDisplay_600SemiBold', fontSize: 28, color: '#2d1b69', paddingHorizontal: 20 },
  reviewCard: { width: 280, backgroundColor: 'rgba(255,255,255,0.6)', padding: 20, borderRadius: 16, borderWidth: 1, borderColor: 'rgba(45,27,105,0.1)' },
  reviewText: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#2d1b69', fontStyle: 'italic', marginBottom: 12, lineHeight: 20 },
  reviewAuthor: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#4c1d95' },
  tarotSubtitle: { fontFamily: 'Inter_600SemiBold', fontSize: 11, color: '#4c1d95', letterSpacing: 1.2, marginBottom: 6, paddingHorizontal: 20 },

  faqSection: { marginTop: 50, paddingHorizontal: 20 },
  faqContainer: { marginTop: 16, gap: 12 },
  faqItem: { backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: 16, padding: 16, borderWidth: 1, borderColor: 'rgba(45,27,105,0.1)' },
  faqHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  faqQ: { fontFamily: 'Inter_600SemiBold', fontSize: 15, color: '#2d1b69', flex: 1, paddingRight: 10 },
  faqA: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#4c1d95', marginTop: 12, lineHeight: 20 }
});