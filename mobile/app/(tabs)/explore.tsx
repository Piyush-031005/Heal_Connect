import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import GhostFibers from "../../components/GhostFibers";
import {
  View, Text, StyleSheet, ScrollView, Image, TouchableOpacity,
  Dimensions, TextInput
} from "react-native";
import { Search, Filter, Star, Phone, MessageCircle } from "lucide-react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const PURPLE = "#7C3AED";
const TEXT = "#1E1035";

const CATEGORIES = ["All", "Astrology", "Tarot", "Palmistry", "Numerology", "Vastu"];

const EXPERTS = [
  { name: "piyush", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹100/min", img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop" },
  { name: "Abhishek Giri", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹0/min", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop" },
  { name: "Pooja", role: "Wellness Expert", rating: "0.0", exp: "New Expert", price: "₹0/min", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop" },
  { name: "Deepak's Expert", role: "Tarot • Astrology", rating: "4.5", exp: "New Expert", price: "₹100/min", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop" },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [activeCat, setActiveCat] = useState("All");

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F0B1E" }} edges={['top']}>
      {/* Purplish/Bluish Fibers Background */}
      <GhostFibers
        lineColor="#818CF8" glowColor="#6366F1" speed={0.15} scale={1.2}
        brightness={15.0} blueBoost={1.5} layers={35}
        lineFrequency={35} lineSpacing={0.8} glowIntensity={15.0}
      />
      
      {/* HEADER & SEARCH */}
      <View style={styles.header}>
        <View style={styles.searchBar}>
          <Search size={18} color="#818CF8" />
          <TextInput 
            placeholder="Search experts..." 
            placeholderTextColor="rgba(129,140,248,0.6)" 
            style={styles.searchInput} 
          />
        </View>
        <TouchableOpacity style={styles.filterBtn}>
          <Filter size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CATEGORIES */}
      <View style={{ marginBottom: 16 }}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, gap: 10 }}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity 
              key={cat} 
              onPress={() => setActiveCat(cat)}
              style={[styles.catChip, activeCat === cat && styles.catChipActive]}
            >
              <Text style={[styles.catText, activeCat === cat && styles.catTextActive]}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      
      {/* EXPERT LIST */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 120, gap: 14 }}>
        {EXPERTS.map((expert, i) => (
          <TouchableOpacity key={i} style={styles.expertCard} activeOpacity={0.88}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 14, marginBottom: 12 }}>
              <View style={styles.expertAvatarWrap}>
                <Image source={{ uri: expert.img }} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.expertName}>{expert.name}</Text>
                <Text style={styles.expertRole}>{expert.role}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 }}>
                  <Star size={12} fill="#FCD34D" color="#FCD34D" />
                  <Text style={{ fontSize: 12, fontWeight: "700", color: "#F8F7FA" }}>{expert.rating}</Text>
                  <Text style={{ fontSize: 11, color: "#818CF8" }}> • {expert.exp}</Text>
                </View>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={{ fontSize: 16, fontWeight: "800", color: "#818CF8" }}>{expert.price}</Text>
              </View>
            </View>
            
            <Text style={{ fontSize: 12, color: "rgba(248,247,250,0.7)", marginBottom: 12 }}>{expert.lang}</Text>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <TouchableOpacity style={styles.expertActionBtnWrapper} onPress={() => router.push("/(tabs)/history")}>
                <LinearGradient colors={["#6366F1", "#8B5CF6"]} style={styles.expertActionBtnGrad} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                  <MessageCircle size={14} color="#fff" /><Text style={styles.expertActionText}>Chat</Text>
                </LinearGradient>
              </TouchableOpacity>
              
              <TouchableOpacity style={[styles.expertActionBtnWrapper, { backgroundColor: "rgba(255,255,255,0.1)", borderWidth: 1, borderColor: "rgba(255,255,255,0.2)" }]}>
                <View style={styles.expertActionBtnGrad}>
                  <Phone size={14} color="#fff" /><Text style={styles.expertActionText}>Call</Text>
                </View>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: 20, paddingVertical: 15, gap: 12 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "rgba(255,255,255,0.08)", borderRadius: 20, paddingHorizontal: 16, height: 44, borderWidth: 1, borderColor: "rgba(99,102,241,0.3)" },
  searchInput: { flex: 1, fontSize: 14, color: "#fff", marginLeft: 8 },
  filterBtn: { width: 44, height: 44, borderRadius: 22, backgroundColor: "rgba(255,255,255,0.08)", alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "rgba(99,102,241,0.3)" },
  
  catChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: "rgba(255,255,255,0.05)", borderWidth: 1, borderColor: "rgba(99,102,241,0.3)" },
  catChipActive: { backgroundColor: "#6366F1", borderColor: "#6366F1" },
  catText: { fontSize: 13, color: "#818CF8", fontWeight: "600" },
  catTextActive: { color: "#fff", fontWeight: "800" },

  expertCard: { backgroundColor: "rgba(255,255,255,0.05)", borderRadius: 20, borderWidth: 1, borderColor: "rgba(99,102,241,0.2)", padding: 16 },
  expertAvatarWrap: { width: 64, height: 64, borderRadius: 32, overflow: "hidden", borderWidth: 2, borderColor: "#818CF8" },
  expertName: { fontSize: 16, fontWeight: "800", color: "#F8F7FA" },
  expertRole: { fontSize: 12, color: "#818CF8", marginTop: 2 },
  
  expertActionBtnWrapper: { flex: 1, borderRadius: 12, overflow: "hidden" },
  expertActionBtnGrad: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, paddingVertical: 10 },
  expertActionText: { fontSize: 13, fontWeight: "800", color: "#fff" },
});
