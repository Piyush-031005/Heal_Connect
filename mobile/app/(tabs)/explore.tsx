import { SafeAreaView } from "react-native-safe-area-context";
import {
  View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity,
  StatusBar, Dimensions, ActivityIndicator, Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Search, Star, Filter, X, ChevronRight, Sun, Moon, Eye, Hand, Wind, Heart, Music, Hash, Brain, Zap, Flame, Globe } from "lucide-react-native";
import { useEffect, useState, useCallback } from "react";
import { useRouter } from "expo-router";
import { practitionersApi } from "../../lib/api";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const PURPLE = "#7C3AED";
const BG = "#F5F3FF";
const TEXT = "#1E1035";
const TEXT_MUTED = "#6B5E80";
const CARD = "#FFFFFF";
const GOLD = "#F59E0B";
const LAVENDER = "#EDE9FE";

const MODALITIES_ALL = [
  { id:"all", name:"All" },
  { id:"astrology", name:"Astrology" },
  { id:"tarot", name:"Tarot" },
  { id:"face-reading", name:"Face Reading" },
  { id:"palmistry", name:"Palm Reading" },
  { id:"breathwork", name:"Breathwork" },
  { id:"chakra-healing", name:"Chakra" },
  { id:"sound-healing", name:"Sound Healing" },
  { id:"numerology", name:"Numerology" },
  { id:"meditation", name:"Meditation" },
  { id:"reiki", name:"Reiki" },
  { id:"vastu", name:"Vastu" },
];

export default function ExploreScreen() {
  const router = useRouter();
  const [practitioners, setPractitioners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  const contentOpacity = useSharedValue(0);
  const contentTranslate = useSharedValue(20);

  useEffect(() => {
    contentOpacity.value = withTiming(1, { duration: 600 });
    contentTranslate.value = withTiming(0, { duration: 600, easing: Easing.out(Easing.cubic) });
    fetchPractitioners();
  }, []);

  const fetchPractitioners = async (searchTerm = "", specialty = "") => {
    setLoading(true);
    try {
      const params: any = { limit: 30 };
      if (searchTerm) params.search = searchTerm;
      if (specialty && specialty !== "all") params.specialty = specialty;
      const res = await practitionersApi.list(params);
      if (res.success && res.data?.practitioners) {
        setPractitioners(res.data.practitioners);
      }
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  const handleSearch = useCallback((text: string) => {
    setSearch(text);
    fetchPractitioners(text, selectedCategory);
  }, [selectedCategory]);

  const handleCategory = (cat: string) => {
    setSelectedCategory(cat);
    fetchPractitioners(search, cat);
  };

  const animatedContent = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslate.value }],
  }));

  const filtered = showOnlineOnly ? practitioners.filter((p: any) => p.isOnline) : practitioners;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <View style={styles.container}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Explore</Text>
          <Text style={styles.headerSub}>Find your perfect guide</Text>
        </View>

        {/* SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Search size={18} color={TEXT_MUTED} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name or specialty…"
            placeholderTextColor={TEXT_MUTED}
            value={search}
            onChangeText={handleSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <X size={16} color={TEXT_MUTED} />
            </TouchableOpacity>
          )}
        </View>

        {/* CATEGORY PILLS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryRow}>
          {MODALITIES_ALL.map((m) => (
            <TouchableOpacity
              key={m.id}
              style={[styles.categoryPill, selectedCategory === m.id && styles.categoryPillActive]}
              onPress={() => handleCategory(m.id)}
            >
              <Text style={[styles.categoryPillText, selectedCategory === m.id && styles.categoryPillTextActive]}>
                {m.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ONLINE TOGGLE + COUNT */}
        <View style={styles.filterRow}>
          <Text style={styles.resultCount}>{filtered.length} practitioners found</Text>
          <TouchableOpacity
            style={[styles.onlineToggle, showOnlineOnly && styles.onlineToggleActive]}
            onPress={() => setShowOnlineOnly(!showOnlineOnly)}
          >
            <View style={[styles.onlineDotSmall, { backgroundColor: showOnlineOnly ? "#10B981" : "#CBD5E1" }]} />
            <Text style={[styles.onlineToggleText, showOnlineOnly && { color: "#10B981" }]}>Online Only</Text>
          </TouchableOpacity>
        </View>

        {/* PRACTITIONERS LIST */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={PURPLE} />
            <Text style={styles.loadingText}>Finding your guides…</Text>
          </View>
        ) : (
          <Animated.ScrollView
            style={animatedContent}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 32, gap: 12 }}
          >
            {filtered.length === 0 ? (
              <View style={styles.emptyState}>
                <Text style={{ fontSize: 40, marginBottom: 12 }}>🔍</Text>
                <Text style={styles.emptyTitle}>No results found</Text>
                <Text style={styles.emptyDesc}>Try a different search or category</Text>
              </View>
            ) : filtered.map((p: any) => (
              <TouchableOpacity key={p.id} style={styles.practCard} activeOpacity={0.88}>
                <View style={styles.practCardLeft}>
                  {p.photoUrl ? (
                    <Image source={{ uri: p.photoUrl }} style={styles.practPhoto} />
                  ) : (
                    <View style={[styles.practPhoto, styles.practPhotoPlaceholder]}>
                      <Text style={{ fontSize: 24, fontWeight: "700", color: PURPLE }}>{(p.name || "E")[0].toUpperCase()}</Text>
                    </View>
                  )}
                  <View style={[styles.onlineBadge, { backgroundColor: p.isOnline ? "#10B981" : "#9CA3AF" }]}>
                    <Text style={styles.onlineBadgeText}>{p.isOnline ? "Online" : "Offline"}</Text>
                  </View>
                </View>
                <View style={styles.practCardRight}>
                  <View style={styles.practCardTop}>
                    <Text style={styles.practName}>{p.name}</Text>
                    <View style={styles.ratingChip}>
                      <Star size={12} color={GOLD} fill={GOLD} />
                      <Text style={styles.ratingText}>{p.avgRating?.toFixed(1) || "—"}</Text>
                    </View>
                  </View>
                  <Text style={styles.practSpec} numberOfLines={1}>
                    {p.specialties?.slice(0, 2).join(" · ") || "Wellness Expert"}
                  </Text>
                  <Text style={styles.practExp}>{p.experienceYrs > 0 ? `${p.experienceYrs} yrs exp` : "New Expert"}</Text>
                  <View style={styles.practCardBottom}>
                    <Text style={styles.practLang} numberOfLines={1}>
                      {p.languages?.slice(0, 2).join(", ") || "English"}
                    </Text>
                    <View style={styles.bookRow}>
                      <Text style={styles.practRate}>₹{p.perMinuteRate}/min</Text>
                      <TouchableOpacity style={styles.bookBtn}>
                        <Text style={styles.bookBtnText}>Connect</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </Animated.ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  header: { paddingTop: 8, paddingBottom: 16 },
  headerTitle: { fontSize: 28, fontWeight: "800", color: TEXT },
  headerSub: { fontSize: 14, color: TEXT_MUTED, marginTop: 2 },
  searchContainer: { flexDirection: "row", alignItems: "center", backgroundColor: CARD, borderRadius: 16, paddingHorizontal: 16, paddingVertical: 13, gap: 10, marginBottom: 14, shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3, borderWidth: 1, borderColor: LAVENDER },
  searchInput: { flex: 1, fontSize: 14, color: TEXT },
  categoryRow: { paddingBottom: 14, gap: 8 },
  categoryPill: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: CARD, borderWidth: 1, borderColor: LAVENDER },
  categoryPillActive: { backgroundColor: PURPLE, borderColor: PURPLE },
  categoryPillText: { fontSize: 13, fontWeight: "600", color: TEXT_MUTED },
  categoryPillTextActive: { color: "#fff" },
  filterRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 14 },
  resultCount: { fontSize: 13, color: TEXT_MUTED, fontWeight: "500" },
  onlineToggle: { flexDirection: "row", alignItems: "center", gap: 6, paddingHorizontal: 12, paddingVertical: 6, borderRadius: 12, backgroundColor: CARD, borderWidth: 1, borderColor: LAVENDER },
  onlineToggleActive: { borderColor: "#10B981", backgroundColor: "#F0FDF4" },
  onlineDotSmall: { width: 8, height: 8, borderRadius: 4 },
  onlineToggleText: { fontSize: 12, color: TEXT_MUTED, fontWeight: "600" },
  loadingContainer: { flex: 1, alignItems: "center", justifyContent: "center", gap: 12 },
  loadingText: { color: TEXT_MUTED, fontSize: 14 },
  emptyState: { alignItems: "center", paddingTop: 60 },
  emptyTitle: { fontSize: 18, fontWeight: "700", color: TEXT, marginBottom: 6 },
  emptyDesc: { fontSize: 14, color: TEXT_MUTED },
  practCard: { flexDirection: "row", backgroundColor: CARD, borderRadius: 20, padding: 14, shadowColor: "#7C3AED", shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12, elevation: 4, gap: 14, borderWidth: 1, borderColor: "rgba(124,58,237,0.06)" },
  practCardLeft: { alignItems: "center", gap: 6 },
  practPhoto: { width: 68, height: 68, borderRadius: 34, borderWidth: 2, borderColor: LAVENDER },
  practPhotoPlaceholder: { backgroundColor: LAVENDER, alignItems: "center", justifyContent: "center" },
  onlineBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 8 },
  onlineBadgeText: { fontSize: 9, color: "#fff", fontWeight: "700" },
  practCardRight: { flex: 1 },
  practCardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 4 },
  practName: { fontSize: 16, fontWeight: "700", color: TEXT, flex: 1 },
  ratingChip: { flexDirection: "row", alignItems: "center", gap: 3, backgroundColor: "#FEF3C7", paddingHorizontal: 8, paddingVertical: 3, borderRadius: 8 },
  ratingText: { fontSize: 12, color: GOLD, fontWeight: "700" },
  practSpec: { fontSize: 13, color: PURPLE, fontWeight: "600", marginBottom: 2 },
  practExp: { fontSize: 12, color: TEXT_MUTED, marginBottom: 8 },
  practCardBottom: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  practLang: { fontSize: 11, color: TEXT_MUTED, flex: 1 },
  bookRow: { flexDirection: "row", alignItems: "center", gap: 10 },
  practRate: { fontSize: 13, fontWeight: "800", color: TEXT },
  bookBtn: { backgroundColor: PURPLE, paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10 },
  bookBtnText: { color: "#fff", fontSize: 12, fontWeight: "700" },
});