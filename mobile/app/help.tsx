import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Mail, MessageSquare, PhoneCall } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';

export default function HelpScreen() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <LinearGradient colors={['#F9F5FF', '#fffbf0', '#fff']} style={StyleSheet.absoluteFill} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <ArrowLeft size={24} color="#4f46e5" />
          </TouchableOpacity>
          <Text style={styles.title}>Help & Support</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <Text style={styles.subtitle}>How can we help you?</Text>
          <Text style={styles.desc}>We're here to help! Reach out to us through any of the channels below and our team will get back to you as soon as possible.</Text>

          <View style={styles.cardsWrap}>
            <TouchableOpacity style={styles.contactCard} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#e0e7ff' }]}>
                <MessageSquare size={24} color="#4f46e5" />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>Live Chat</Text>
                <Text style={styles.cardDesc}>Chat with our support team instantly.</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#fef3c7' }]}>
                <Mail size={24} color="#d97706" />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>Email Us</Text>
                <Text style={styles.cardDesc}>support@zenauraa.com</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contactCard} activeOpacity={0.7}>
              <View style={[styles.iconBox, { backgroundColor: '#dcfce7' }]}>
                <PhoneCall size={24} color="#10b981" />
              </View>
              <View style={styles.cardTextWrap}>
                <Text style={styles.cardTitle}>Call Us</Text>
                <Text style={styles.cardDesc}>Mon-Fri, 9am - 5pm EST</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  subtitle: { fontSize: 24, fontWeight: '800', color: '#0f172a', marginBottom: 8, marginTop: 8 },
  desc: { fontSize: 15, color: '#64748b', marginBottom: 32, lineHeight: 22 },
  cardsWrap: { gap: 16 },
  contactCard: { backgroundColor: '#fff', borderRadius: 24, padding: 20, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#f1f5f9', shadowColor: '#4f46e5', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.05, shadowRadius: 16, elevation: 3 },
  iconBox: { width: 56, height: 56, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginRight: 16 },
  cardTextWrap: { flex: 1 },
  cardTitle: { fontSize: 16, fontWeight: '700', color: '#1e293b', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#64748b' }
});
