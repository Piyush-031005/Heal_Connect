import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from "react";
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  Dimensions, TextInput
} from "react-native";
import { Search, Filter, Star, Phone, MessageCircle } from "lucide-react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import WebReplicaHeader from "../../components/WebReplicaHeader";
import { practitionersApi, PractitionerProfile } from "../../lib/api";

const { width } = Dimensions.get("window");

const MODALITIES = [
  { name: "Astrology", desc: "Cosmic insights", img: require("../../assets/images/astrology.png"), route: "astrology" },
  { name: "Tarot, Psychic & Divination", desc: "Unveil truths", img: require("../../assets/images/tarot.png"), route: "tarot" },
  { name: "Vastu & Space Harmony", desc: "Space harmony", img: require("../../assets/images/space-harmony.png"), route: "vastu" },
  { name: "Numerology", desc: "Number paths", img: require("../../assets/images/numerology.png"), route: "numerology" },
  { name: "Akashic & Spiritual Guidance", desc: "Spiritual insights", img: require("../../assets/images/tarot.png"), route: "spiritual" },
  { name: "Palmistry, Face & Personality Reading", desc: "Hidden traits", img: require("../../assets/images/astrology.png"), route: "palm" },
  { name: "Yoga & Breath Practices", desc: "Inner peace", img: require("../../assets/images/meditation.png"), route: "breathwork" },
  { name: "Energy & Spiritual Healing", desc: "Energy flow", img: require("../../assets/images/meditation.png"), route: "healing" },
  { name: "Meditation & Mindfulness", desc: "Calm mind", img: require("../../assets/images/meditation.png"), route: "meditation" },
  { name: "Palmistry, Face & Personality Reading", desc: "Face reading", img: require("../../assets/images/astrology.png"), route: "face" },
  { name: "Energy & Spiritual Healing", desc: "Sound healing", img: require("../../assets/images/space-harmony.png"), route: "sound" },
  { name: "Akashic & Spiritual Guidance", desc: "Dream reading", img: require("../../assets/images/tarot.png"), route: "dreams" },
];



const getAvatar = (expert: PractitionerProfile) => {
  if (expert.photoUrl) return { uri: expert.photoUrl };
  return { uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name || 'Expert')}&background=5F3BA9&color=fff&size=150` };
};

export default function ExploreTab() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>((params.category as string) || null);
  const [experts, setExperts] = useState<PractitionerProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      try {
        const res = await practitionersApi.list({ 
          search: search || undefined, 
          specialty: selectedCategory || undefined 
        });
        if (res.success && res.data?.practitioners) {
          setExperts(res.data.practitioners);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    // Simple debounce
    const timeout = setTimeout(() => {
      fetchExperts();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [search, selectedCategory]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8', '#D5B6DC', '#8982D0', '#5F3BA9']}
        locations={[0, 0.25, 0.5, 0.7, 0.85, 0.95, 1]}
        style={StyleSheet.absoluteFill}
      />
      
      

      <WebReplicaHeader />

      <ScrollView style={{ zIndex: 2, elevation: 2 }} contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>Explore Modalities</Text>
          <Text style={styles.pageDesc}>Discover ancient wisdom tailored for you.</Text>

          <View style={styles.modalityGrid}>
            {MODALITIES.map((mod, i) => (
              <TouchableOpacity 
                key={i} 
                style={styles.modCard}
                onPress={() => router.push(`/modalities/${mod.route}` as any)}
              >
                
                <View style={styles.modIconWrap}>
                  <Image source={mod.img} style={styles.modIcon} />
                </View>
                <Text style={styles.modName}>{mod.name}</Text>
                <Text style={styles.modDesc}>{mod.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider} />

          <Text style={styles.pageTitle}>Find an Expert</Text>
          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Search color="#6b7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search experts..."
                placeholderTextColor="#9ca3af"
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity style={styles.filterBtn}>
              <Filter color="#fff" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.expertList}>
            {loading ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>Loading experts...</Text>
            ) : experts.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>No experts found.</Text>
            ) : (
              experts.map((exp, i) => (
                <TouchableOpacity 
                  key={exp.id} 
                  style={styles.expertCard}
                  onPress={() => router.push(`/practitioner/${exp.id}` as any)}
                >
                  <Image source={getAvatar(exp)} style={styles.expertImg} />
                  <View style={styles.expertInfo}>
                    <Text style={styles.expertName}>{exp.name}</Text>
                    <Text style={styles.expertRole}>{exp.specialties?.[0] || 'Wellness Expert'}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                      <Star size={14} color="#F59E0B" fill="#F59E0B" />
                      <Text style={styles.expertRating}>{exp.avgRating?.toFixed(1) || 'New'}</Text>
                    </View>
                    <Text style={styles.expertPrice}>₹{exp.perMinuteRate}/min</Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={{ backgroundColor: '#6D28D9', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 }} onPress={() => router.push(`/practitioner/${exp.id}` as any)}>
                      <Phone color="#fff" size={14} />
                      <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>Call</Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            )}
          </View>


        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 20 },
  pageTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: '#1a1a1a', marginBottom: 4 },
  pageDesc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#6b7280', marginBottom: 20 },
  
  modalityGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  modCard: { width: (width - 50) / 2, backgroundColor: '#ffffff', shadowColor: '#000', shadowOffset: {width:0, height:2}, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3, padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#f3f4f6' },
  modIconWrap: { width: 60, height: 60, borderRadius: 30, marginBottom: 10, backgroundColor: '#f9fafb' },
  modIcon: { width: '100%', height: '100%', resizeMode: 'contain' },
  modName: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#111827', marginBottom: 4, textAlign: 'center' },
  modDesc: { fontFamily: 'Inter_400Regular', fontSize: 12, color: '#6b7280', textAlign: 'center' },

  divider: { height: 1, backgroundColor: '#e5e7eb', marginVertical: 30 },

  searchRow: { flexDirection: 'row', gap: 12, marginBottom: 24 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#f3f4f6', paddingHorizontal: 16, borderRadius: 12, height: 48 },
  searchInput: { flex: 1, marginLeft: 8, fontFamily: 'Inter_400Regular', fontSize: 15, color: '#111827' },
  filterBtn: { width: 48, height: 48, backgroundColor: '#7C3AED', borderRadius: 12, alignItems: 'center', justifyContent: 'center' },

  expertList: { gap: 16 },
  expertCard: { flexDirection: 'row', backgroundColor: 'rgba(255,255,255,0.9)', padding: 16, borderRadius: 16, borderWidth: 1, borderColor: '#f3f4f6', alignItems: 'center' },
  expertImg: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  expertInfo: { flex: 1 },
  expertName: { fontFamily: 'Inter_700Bold', fontSize: 16, color: '#111827' },
  expertRole: { fontFamily: 'Inter_400Regular', fontSize: 13, color: '#6b7280' },
  expertRating: { fontFamily: 'Inter_600SemiBold', fontSize: 13, color: '#111827', marginLeft: 4 },
  expertPrice: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#7C3AED', marginTop: 4 },
  expertActions: { flexDirection: 'row', gap: 8 },
  actionBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F5F3FF', alignItems: 'center', justifyContent: 'center' },
});