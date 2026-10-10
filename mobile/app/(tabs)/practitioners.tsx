import React, { useState, useEffect } from "react";
import { LinearGradient } from 'expo-linear-gradient';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, TextInput, ActivityIndicator, Modal } from "react-native";
import { Search, Filter, Star, Phone, MessageCircle, X, Check } from "lucide-react-native";
import WebReplicaHeader from "../../components/WebReplicaHeader";
import { useRouter } from "expo-router";
import { practitionersApi, PractitionerProfile } from "../../lib/api";
import { useCurrencyStore } from "../../store/useCurrencyStore";

const { width } = Dimensions.get("window");

const getAvatar = (expert: PractitionerProfile) => {
  if (expert.photoUrl) return { uri: expert.photoUrl };
  return { uri: `https://ui-avatars.com/api/?name=${encodeURIComponent(expert.name || 'Expert')}&background=5F3BA9&color=fff&size=150` };
};

const SPECIALTIES = ['All', 'Astrology', 'Tarot', 'Numerology', 'Palm Reading', 'Face Reading', 'Meditation', 'Spiritual'];
const RATINGS = [{ label: 'Any Rating', value: 0 }, { label: '4.0 & above', value: 4 }, { label: '4.5 & above', value: 4.5 }];

export default function PractitionersScreen() {
  const router = useRouter();
  const { format } = useCurrencyStore();
  const [search, setSearch] = useState("");
  const [experts, setExperts] = useState<PractitionerProfile[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedMinRating, setSelectedMinRating] = useState(0);
  const [onlineOnly, setOnlineOnly] = useState(false);

  useEffect(() => {
    const fetchExperts = async () => {
      setLoading(true);
      try {
        const query: any = {};
        if (search) query.search = search;
        if (selectedSpecialty !== 'All') query.specialty = selectedSpecialty;
        if (selectedMinRating > 0) query.minRating = selectedMinRating;
        if (onlineOnly) query.onlineOnly = true;

        const res = await practitionersApi.list(query);
        if (res.success && res.data?.practitioners) {
          setExperts(res.data.practitioners);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    
    const timeout = setTimeout(() => {
      fetchExperts();
    }, 500);
    
    return () => clearTimeout(timeout);
  }, [search, selectedSpecialty, selectedMinRating, onlineOnly]);

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
          <Text style={styles.pageTitle}>Our Practitioners</Text>
          <Text style={styles.pageDesc}>Find the perfect guide for your unique journey.</Text>

          <View style={styles.searchRow}>
            <View style={styles.searchBar}>
              <Search color="#6b7280" size={20} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search experts by name or specialty..."
                placeholderTextColor="#9ca3af"
                value={search}
                onChangeText={setSearch}
              />
            </View>
            <TouchableOpacity 
              style={[styles.filterBtn, (selectedSpecialty !== 'All' || selectedMinRating > 0 || onlineOnly) && styles.filterBtnActive]}
              onPress={() => setShowFilterModal(true)}
            >
              <Filter color="#fff" size={20} />
            </TouchableOpacity>
          </View>

          {/* Filter Summary Tags */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
             {selectedSpecialty !== 'All' && (
               <View style={styles.summaryTag}>
                 <Text style={styles.summaryTagText}>{selectedSpecialty}</Text>
                 <TouchableOpacity onPress={() => setSelectedSpecialty('All')}><X size={14} color="#5F3BA9" /></TouchableOpacity>
               </View>
             )}
             {selectedMinRating > 0 && (
               <View style={styles.summaryTag}>
                 <Text style={styles.summaryTagText}>{selectedMinRating}+ Stars</Text>
                 <TouchableOpacity onPress={() => setSelectedMinRating(0)}><X size={14} color="#5F3BA9" /></TouchableOpacity>
               </View>
             )}
             {onlineOnly && (
               <View style={styles.summaryTag}>
                 <Text style={styles.summaryTagText}>Online Now</Text>
                 <TouchableOpacity onPress={() => setOnlineOnly(false)}><X size={14} color="#5F3BA9" /></TouchableOpacity>
               </View>
             )}
          </ScrollView>

          <View style={styles.expertList}>
            {loading ? (
              <ActivityIndicator size="large" color="#6D28D9" style={{ marginTop: 20 }} />
            ) : experts.length === 0 ? (
              <Text style={{ textAlign: 'center', marginTop: 20, color: '#6b7280' }}>No experts found.</Text>
            ) : (
              experts.map((exp) => (
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
                    <Text style={styles.expertPrice}>{format(exp.perMinuteRate || 0)}/min</Text>
                  </View>
                  <View style={{ justifyContent: 'center' }}>
                    <TouchableOpacity style={styles.actionBtnCall} onPress={() => router.push(`/practitioner/${exp.id}` as any)}>
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

      {/* Filter Modal */}
      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filter Experts</Text>
              <TouchableOpacity onPress={() => setShowFilterModal(false)}><X color="#111827" size={24} /></TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.filterSectionTitle}>Specialty</Text>
              <View style={styles.filterOptions}>
                {SPECIALTIES.map(s => (
                  <TouchableOpacity 
                    key={s} 
                    style={[styles.filterOption, selectedSpecialty === s && styles.filterOptionActive]}
                    onPress={() => setSelectedSpecialty(s)}
                  >
                    <Text style={[styles.filterOptionText, selectedSpecialty === s && styles.filterOptionTextActive]}>{s}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSectionTitle}>Minimum Rating</Text>
              <View style={styles.filterOptions}>
                {RATINGS.map(r => (
                  <TouchableOpacity 
                    key={r.label} 
                    style={[styles.filterOption, selectedMinRating === r.value && styles.filterOptionActive]}
                    onPress={() => setSelectedMinRating(r.value)}
                  >
                    <Text style={[styles.filterOptionText, selectedMinRating === r.value && styles.filterOptionTextActive]}>{r.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Text style={styles.filterSectionTitle}>Availability</Text>
              <TouchableOpacity 
                style={[styles.filterOption, { alignSelf: 'flex-start', paddingHorizontal: 20 }, onlineOnly && styles.filterOptionActive]}
                onPress={() => setOnlineOnly(!onlineOnly)}
              >
                <Text style={[styles.filterOptionText, onlineOnly && styles.filterOptionTextActive]}>Online Now</Text>
                {onlineOnly && <Check size={16} color="#fff" style={{ marginLeft: 8 }} />}
              </TouchableOpacity>
            </ScrollView>

            <View style={styles.modalFooter}>
              <TouchableOpacity 
                style={styles.clearBtn} 
                onPress={() => { setSelectedSpecialty('All'); setSelectedMinRating(0); setOnlineOnly(false); }}
              >
                <Text style={styles.clearBtnText}>Clear All</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyBtn} onPress={() => setShowFilterModal(false)}>
                <Text style={styles.applyBtnText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  content: { padding: 20 },
  pageTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: '#1a1a1a', marginBottom: 4 },
  pageDesc: { fontFamily: 'Inter_400Regular', fontSize: 14, color: '#6b7280', marginBottom: 20 },
  
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
  
  actionBtnCall: { backgroundColor: '#6D28D9', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 8, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', gap: 6 },
  
  filterBtnActive: { backgroundColor: '#4C1D95' }, // Darker purple when active
  summaryTag: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E8FF', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, marginRight: 8, borderWidth: 1, borderColor: '#D8B4FE', gap: 4 },
  summaryTagText: { color: '#5F3BA9', fontSize: 12, fontWeight: '600' },
  
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: '700', color: '#111827' },
  filterSectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginTop: 16, marginBottom: 12 },
  filterOptions: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  filterOption: { paddingHorizontal: 16, paddingVertical: 10, borderRadius: 20, borderWidth: 1, borderColor: '#e5e7eb', backgroundColor: '#f9fafb', flexDirection: 'row', alignItems: 'center' },
  filterOptionActive: { backgroundColor: '#6D28D9', borderColor: '#6D28D9' },
  filterOptionText: { fontSize: 14, color: '#4b5563', fontWeight: '500' },
  filterOptionTextActive: { color: '#fff' },
  modalFooter: { flexDirection: 'row', gap: 16, marginTop: 32, paddingTop: 16, borderTopWidth: 1, borderTopColor: '#f3f4f6' },
  clearBtn: { flex: 1, padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#f3f4f6' },
  clearBtnText: { color: '#4b5563', fontSize: 16, fontWeight: '600' },
  applyBtn: { flex: 2, padding: 16, borderRadius: 12, alignItems: 'center', backgroundColor: '#6D28D9' },
  applyBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
});