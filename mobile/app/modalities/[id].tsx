import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { ArrowLeft, ArrowRight } from "lucide-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MODALITIES_CONTENT } from "../../data/modalities-content";

export default function ModalityDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  // Safely get data. Fallback if id not found
  const data = MODALITIES_CONTENT[id as string] || {
    name: (id as string).charAt(0).toUpperCase() + (id as string).slice(1),
    heroTitle: "Discover Ancient Wisdom",
    heroDescription: "Explore this profound modality and how it can help you on your spiritual journey.",
    contentSections: [
      {
        title: "About this Modality",
        text: "This ancient practice offers deep insights and healing tailored to your unique journey. Connect with our verified experts to experience its profound benefits firsthand.",
      }
    ],
    remedies: [
      "Book a session with one of our specialized practitioners.",
      "Keep an open mind and prepare your questions beforehand."
    ]
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F0E6F5', '#E5D9F2', '#D5B6DC', '#C2AEE8']}
        style={StyleSheet.absoluteFill}
      />
      
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle} numberOfLines={1}>{data.name}</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }} showsVerticalScrollIndicator={false}>
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>{data.heroTitle}</Text>
          <Text style={styles.heroDesc}>{data.heroDescription}</Text>
        </View>

        <View style={styles.contentSection}>
          {data.contentSections?.map((section: any, idx: number) => (
            <View key={idx} style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <Text style={styles.sectionText}>{section.text}</Text>
            </View>
          ))}
        </View>

        {data.remedies && data.remedies.length > 0 && (
          <View style={styles.remediesSection}>
            <Text style={styles.remediesTitle}>Quick Remedies & Tips</Text>
            {data.remedies.map((remedy: string, idx: number) => (
              <View key={idx} style={styles.remedyRow}>
                <View style={styles.remedyDot} />
                <Text style={styles.remedyText}>{remedy}</Text>
              </View>
            ))}
          </View>
        )}

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Ready to Dive Deeper?</Text>
          <Text style={styles.ctaDesc}>Take the next step in your spiritual journey. Connect with our verified experts today.</Text>
          <TouchableOpacity style={styles.ctaBtn} onPress={() => router.push('/(tabs)/practitioners')}>
            <Text style={styles.ctaBtnText}>Book a Consultant</Text>
            <ArrowRight size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#ffffff" },
  header: { padding: 20, flexDirection: 'row', alignItems: 'center' },
  backBtn: { marginRight: 16 },
  headerTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 24, color: "#1a1a1a", flex: 1 },
  
  heroSection: { padding: 24, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.4)', marginHorizontal: 16, borderRadius: 24, marginBottom: 24 },
  heroTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 32, color: '#2A1658', textAlign: 'center', marginBottom: 12 },
  heroDesc: { fontFamily: 'Inter_400Regular', fontSize: 16, color: '#6B5C8A', textAlign: 'center', lineHeight: 24 },
  
  contentSection: { paddingHorizontal: 16, gap: 16, marginBottom: 24 },
  sectionCard: { backgroundColor: 'rgba(255,255,255,0.8)', padding: 20, borderRadius: 20, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 2 },
  sectionTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 22, color: '#2A1658', marginBottom: 12 },
  sectionText: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#4b5563', lineHeight: 24 },
  
  remediesSection: { paddingHorizontal: 24, marginBottom: 32 },
  remediesTitle: { fontFamily: 'Inter_700Bold', fontSize: 18, color: '#2A1658', marginBottom: 16 },
  remedyRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12, paddingRight: 16 },
  remedyDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#9333EA', marginTop: 8, marginRight: 12 },
  remedyText: { fontFamily: 'Inter_400Regular', fontSize: 15, color: '#4b5563', lineHeight: 22, flex: 1 },

  ctaSection: { margin: 16, padding: 24, backgroundColor: '#2A1658', borderRadius: 24, alignItems: 'center' },
  ctaTitle: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 28, color: '#fff', marginBottom: 12, textAlign: 'center' },
  ctaDesc: { fontFamily: 'Inter_400Regular', fontSize: 15, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 24, lineHeight: 22 },
  ctaBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#9333EA', paddingVertical: 14, paddingHorizontal: 24, borderRadius: 30, gap: 8 },
  ctaBtnText: { color: '#fff', fontFamily: 'Inter_700Bold', fontSize: 16 },
});
