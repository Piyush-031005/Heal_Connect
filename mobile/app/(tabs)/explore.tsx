import React, { useState } from "react";
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  Dimensions, TextInput
} from "react-native";
import { Search, Filter, Star, Phone, MessageCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import GhostFibers from "../../components/GhostFibers";
import WebReplicaHeader from "../../components/WebReplicaHeader";

const { width } = Dimensions.get("window");

const MODALITIES = [
  { name: "Astrology", desc: "Cosmic insights", img: require("../../assets/images/astrology.png") },
  { name: "Tarot", desc: "Unveil truths", img: require("../../assets/images/tarot.png") },
  { name: "Vastu", desc: "Space harmony", img: require("../../assets/images/space-harmony.png") },
  { name: "Numerology", desc: "Number paths", img: require("../../assets/images/numerology.png") },
  { name: "Palm Reading", desc: "Life lines", img: require("../../assets/images/astrology.png") },
  { name: "Face Reading", desc: "Hidden traits", img: require("../../assets/images/tarot.png") },
];

const EXPERTS = [
  { name: "piyush", role: "Wellness Expert", rating: "4.9", exp: "New Expert", price: "₹100/min", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Abhishek Giri", role: "Wellness Expert", rating: "4.8", exp: "New Expert", price: "₹0/min", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Pooja", role: "Wellness Expert", rating: "5.0", exp: "New Expert", price: "₹0/min", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { name: "Deepak's Expert", role: "Tarot • Astrology", rating: "4.5", exp: "New Expert", price: "₹100/min", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
];

export default function ExploreTab() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [search, setSearch] = useState("");

  return (
    <View style={styles.container}>
      <View style={StyleSheet.absoluteFillObject}>
        <GhostFibers
          lineColor="#A78BFA"
          glowColor="#E5D9F2"
          speed={0.1}
          scale={2}
          rotation={0}
          rotationSpeed={0.1}
          layers={3}
          waveAmplitude={0.01}
          waveFrequency={2}
          waveSpeed={0.1}
          layerSpeed={0.05}
          twist={0.1}
          twistFrequency={3}
          twistSpeed={1}
          lineFrequency={3}
          lineSpacing={2}
          lineSharpness={10}
          glowFalloff={5}
          glowIntensity={1}
          brightness={1}
          blueBoost={1}
        />
      </View>

      <WebReplicaHeader />

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.pageTitle}>Explore Modalities</Text>
          <Text style={styles.pageDesc}>Discover ancient wisdom tailored for you.</Text>

          <View style={styles.modalityGrid}>
            {MODALITIES.map((mod, i) => (
              <TouchableOpacity key={i} style={styles.modCard}>
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
            {EXPERTS.map((exp, i) => (
              <View key={i} style={styles.expertCard}>
                <Image source={{ uri: exp.img }} style={styles.expertImg} />
                <View style={styles.expertInfo}>
                  <Text style={styles.expertName}>{exp.name}</Text>
                  <Text style={styles.expertRole}>{exp.role}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}>
                    <Star size={14} color="#F59E0B" fill="#F59E0B" />
                    <Text style={styles.expertRating}>{exp.rating}</Text>
                  </View>
                  <Text style={styles.expertPrice}>{exp.price}</Text>
                </View>
                <View style={styles.expertActions}>
                  <TouchableOpacity style={styles.actionBtn}>
                    <MessageCircle size={16} color="#7C3AED" />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Phone size={16} color="#7C3AED" />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
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
  modCard: { width: (width - 50) / 2, backgroundColor: 'rgba(255,255,255,0.8)', padding: 16, borderRadius: 16, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: '#f3f4f6' },
  modIconWrap: { width: 60, height: 60, borderRadius: 30, marginBottom: 10, backgroundColor: '#f9fafb' },
  modIcon: { width: '100%', height: '100%', resizeMode: 'contain' },
  modName: { fontFamily: 'Inter_600SemiBold', fontSize: 14, color: '#111827', marginBottom: 4 },
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