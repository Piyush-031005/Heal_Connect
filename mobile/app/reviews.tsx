import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Star, ThumbsUp } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

const dummyReviews = [
  { id: '1', user: 'Emily R.', rating: 5, date: '2 days ago', text: 'Dr. Sarah was incredibly attentive. I felt heard and truly supported throughout our entire session.', likes: 12 },
  { id: '2', user: 'Michael T.', rating: 4, date: '1 week ago', text: 'Great insights during the wellness coaching. I already feel much more grounded.', likes: 5 },
  { id: '3', user: 'Anonymous', rating: 5, date: '2 weeks ago', text: 'Highly recommend! This was my first time trying energy healing and the experience was profoundly positive.', likes: 24 },
];

export default function ReviewsScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F9F5FF', '#fffbf0', '#fff']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>My Reviews</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Summary Box */}
          <View style={styles.summaryBox}>
            <Text style={styles.summaryTitle}>Overall Rating</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginVertical: 8 }}>
              <Text style={styles.largeRating}>4.8</Text>
              <Text style={styles.outOf}>/5</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} size={20} color={i <= 4 ? "#fbbf24" : "#e2e8f0"} fill={i <= 4 ? "#fbbf24" : "transparent"} style={{ marginRight: 4 }} />
              ))}
            </View>
            <Text style={styles.totalReviews}>Based on 124 reviews</Text>
          </View>

          <Text style={styles.sectionTitle}>Recent Reviews</Text>

          {dummyReviews.map(r => (
            <View key={r.id} style={styles.reviewCard}>
              <View style={styles.reviewHeader}>
                <View style={styles.userWrap}>
                  <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{r.user.charAt(0)}</Text>
                  </View>
                  <View>
                    <Text style={styles.userName}>{r.user}</Text>
                    <Text style={styles.date}>{r.date}</Text>
                  </View>
                </View>
                <View style={styles.ratingWrap}>
                  <Star size={14} color="#fbbf24" fill="#fbbf24" />
                  <Text style={styles.ratingText}>{r.rating}.0</Text>
                </View>
              </View>
              <Text style={styles.reviewText}>{r.text}</Text>
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.likeBtn}>
                  <ThumbsUp size={14} color="#64748b" />
                  <Text style={styles.likeText}>Helpful ({r.likes})</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 16, paddingVertical: 12 },
  backBtn: { padding: 8, backgroundColor: '#fff', borderRadius: 20, shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  title: { fontSize: 20, fontWeight: '800', color: '#1e1b4b', letterSpacing: -0.5 },
  scrollContent: { padding: 16, paddingBottom: 40 },
  summaryBox: { backgroundColor: '#fff', borderRadius: 24, padding: 24, alignItems: 'center', marginBottom: 24, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  summaryTitle: { fontSize: 14, color: '#64748b', fontWeight: '600', textTransform: 'uppercase', letterSpacing: 1 },
  largeRating: { fontSize: 48, fontWeight: '800', color: '#0f172a', lineHeight: 48 },
  outOf: { fontSize: 20, fontWeight: '600', color: '#94a3b8', marginBottom: 6, marginLeft: 2 },
  totalReviews: { fontSize: 13, color: '#64748b', marginTop: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#1e1b4b', marginBottom: 16, marginLeft: 4 },
  reviewCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, marginBottom: 16, borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.03, shadowRadius: 12, elevation: 2 },
  reviewHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  userWrap: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#e0e7ff', alignItems: 'center', justifyContent: 'center', marginRight: 12 },
  avatarText: { fontSize: 16, fontWeight: '700', color: '#4f46e5' },
  userName: { fontSize: 15, fontWeight: '700', color: '#0f172a' },
  date: { fontSize: 12, color: '#64748b', marginTop: 2 },
  ratingWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fffbeb', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  ratingText: { fontSize: 13, fontWeight: '700', color: '#b45309', marginLeft: 4 },
  reviewText: { fontSize: 15, color: '#334155', lineHeight: 22, marginBottom: 16 },
  actionRow: { flexDirection: 'row', borderTopWidth: 1, borderTopColor: '#f1f5f9', paddingTop: 12 },
  likeBtn: { flexDirection: 'row', alignItems: 'center' },
  likeText: { fontSize: 13, color: '#64748b', fontWeight: '600', marginLeft: 6 }
});
