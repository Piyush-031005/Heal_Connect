import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView, Dimensions, Share } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft, Star, Shield, Languages, Clock, Phone, MessageCircle, Share2, Sparkles, CheckCircle2 } from "lucide-react-native";
import { practitionersApi, PractitionerProfile, sessionsApi, tokenStore } from "../../lib/api";
import { getSocket } from "../../lib/socket";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Toast from 'react-native-toast-message';

const { width } = Dimensions.get("window");

export default function PractitionerDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [practitioner, setPractitioner] = useState<PractitionerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [callingType, setCallingType] = useState<'AUDIO' | 'CHAT' | null>(null);

  useEffect(() => {
    let socket: any = null;
    
    if (id) {
      practitionersApi.get(id).then(res => {
        if (res.success && res.data) {
          setPractitioner(res.data.practitioner as PractitionerProfile);
        }
        setLoading(false);
      }).catch(() => setLoading(false));
      
      // Socket for real-time status updates
      tokenStore.getAccess().then(token => {
        if (token) {
          socket = getSocket(token);
          socket.on('practitioner_status', (data: any) => {
            if (data.practitionerId === id) {
              setPractitioner(prev => prev ? { ...prev, isOnline: data.isOnline } : null);
            }
          });
        }
      });
    }
    
    return () => {
      if (socket) {
        socket.off('practitioner_status');
      }
    };
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D28D9" />
      </View>
    );
  }

  if (!practitioner) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Practitioner not found</Text>
        <TouchableOpacity style={styles.btn} onPress={() => router.back()}>
          <Text style={styles.btnText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const handleCall = async () => {
    try {
      setCallingType('AUDIO');
      const res = await sessionsApi.createSession({ practitionerId: id, type: 'AUDIO' });
      if (res.success && res.data) {
        router.push(`/call/${res.data.session.id}`);
      } else {
        Toast.show({
          type: 'centerError',
          text1: 'Oops!',
          text2: res.message || 'Failed to initiate call',
          position: 'top',
          topOffset: 350
        });
      }
    } catch (e: any) {
      Toast.show({
        type: 'centerError',
        text1: 'Oops!',
        text2: e.message || 'Error starting call',
        position: 'top',
        topOffset: 350
      });
    } finally {
      setCallingType(null);
    }
  };

  const handleChat = async () => {
    try {
      setCallingType('CHAT');
      const res = await sessionsApi.createSession({ practitionerId: id, type: 'CHAT' });
      if (res.success && res.data) {
        router.push(`/call/${res.data.session.id}`);
      } else {
        Toast.show({
          type: 'centerError',
          text1: 'Oops!',
          text2: res.message || 'Failed to initiate chat',
          position: 'top',
          topOffset: 350
        });
      }
    } catch (e: any) {
      Toast.show({
        type: 'centerError',
        text1: 'Oops!',
        text2: e.message || 'Error starting chat',
        position: 'top',
        topOffset: 350
      });
    } finally {
      setCallingType(null);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Consult with ${practitioner.name}, Expert in ${practitioner.specialties?.join(', ') || 'Wellness'}. Download ZenAuraa today!`,
      });
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error.message,
        position: 'bottom'
      });
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#fffbf0', '#F9F5FF', '#fff']}
        style={StyleSheet.absoluteFill}
      />
      
      {/* Header */}
      <View style={[styles.header, { paddingTop: Math.max(insets.top, 20) }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#6D28D9" />
        </TouchableOpacity>
        <View style={styles.headerLogoRow}>
          <Image source={require("../../assets/images/main_logo.png")} style={{ width: 28, height: 28, resizeMode: "contain", marginRight: 8, tintColor: '#4f46e5' }} />
          <Text style={styles.headerTitle}>ZenAuraa</Text>
        </View>
        <TouchableOpacity onPress={handleShare} style={styles.shareBtn}>
          <Share2 size={20} color="#6D28D9" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }} showsVerticalScrollIndicator={false}>
        
        {/* Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <View style={styles.avatarWrap}>
              <Image source={{ uri: practitioner.photoUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(practitioner.name || 'Expert')}&background=8B5CF6&color=fff&size=150` }} style={styles.avatar} />
              {(practitioner as any).isOnline ? (
                <View style={styles.onlineBadge}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Online</Text>
                </View>
              ) : (
                <View style={[styles.onlineBadge, { backgroundColor: '#64748b' }]}>
                  <View style={styles.onlineDot} />
                  <Text style={styles.onlineText}>Offline</Text>
                </View>
              )}
            </View>

            <View style={styles.heroDetails}>
              <View style={styles.nameRow}>
                <Text style={styles.name}>{practitioner.name}</Text>
                <CheckCircle2 size={20} color="#3b82f6" fill="#bfdbfe" style={{ marginLeft: 6 }} />
              </View>
              
              <View style={styles.badgeWrap}>
                <Sparkles size={14} color="#d97706" />
                <Text style={styles.badgeText}>{practitioner.specialties?.[0] || 'Wellness Expert'}</Text>
              </View>

              <Text style={styles.rateText}>£{(practitioner as any).perMinuteRate || 1.5}/min</Text>
            </View>
          </View>

          {/* Stats Row */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Star size={18} color="#f59e0b" fill="#f59e0b" />
              <View style={styles.statTextWrap}>
                <Text style={styles.statValue}>{(practitioner as any).avgRating ? Number((practitioner as any).avgRating).toFixed(1) : '5.0'}</Text>
                <Text style={styles.statLabel}>Rating</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Clock size={18} color="#3b82f6" />
              <View style={styles.statTextWrap}>
                <Text style={styles.statValue}>{(practitioner as any).experienceYrs || 5}y</Text>
                <Text style={styles.statLabel}>Experience</Text>
              </View>
            </View>
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Languages size={18} color="#8b5cf6" />
              <View style={styles.statTextWrap}>
                <Text style={styles.statValue}>{practitioner.languages?.[0] || 'EN'}</Text>
                <Text style={styles.statLabel}>Language</Text>
              </View>
            </View>
          </View>
        </View>

        {/* About Section */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>About Me</Text>
          </View>
          <Text style={styles.bioText}>
            {practitioner.bio || `Hi, I am ${practitioner.name}. I specialize in providing deep insights and guidance using ancient spiritual practices. Join me for a session to discover your true path.`}
          </Text>
        </View>

        {/* Specialties & Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Expertise & Languages</Text>
          
          <Text style={styles.subTitle}>Specialties</Text>
          <View style={styles.tagWrap}>
            {practitioner.specialties?.length ? practitioner.specialties.map((s, i) => (
              <View key={i} style={styles.tag}>
                <Text style={styles.tagText}>{s}</Text>
              </View>
            )) : (
              <View style={styles.tag}><Text style={styles.tagText}>Wellness Guidance</Text></View>
            )}
          </View>

          <Text style={styles.subTitle}>Languages</Text>
          <View style={styles.tagWrap}>
            {practitioner.languages?.length ? practitioner.languages.map((l, i) => (
              <View key={i} style={[styles.tag, { backgroundColor: '#e0e7ff', borderColor: '#c7d2fe' }]}>
                <Text style={[styles.tagText, { color: '#3730a3' }]}>{l}</Text>
              </View>
            )) : (
              <View style={[styles.tag, { backgroundColor: '#e0e7ff', borderColor: '#c7d2fe' }]}><Text style={[styles.tagText, { color: '#3730a3' }]}>English</Text></View>
            )}
          </View>
        </View>

      </ScrollView>

      {/* Floating Bottom Action Bar */}
      <View style={[styles.bottomBar, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <TouchableOpacity style={styles.actionBtnCall} onPress={handleCall} disabled={callingType !== null}>
          {callingType === 'AUDIO' ? <ActivityIndicator color="#6D28D9" /> : (
            <>
              <Phone size={20} color="#6D28D9" fill="#ede9fe" />
              <View style={styles.actionBtnTextWrap}>
                <Text style={styles.actionBtnTitleCall}>Start Call</Text>
                <Text style={styles.actionBtnPriceCall}>£{(practitioner as any).perMinuteRate || 1.5}/min</Text>
              </View>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionBtnChat} onPress={handleChat} disabled={callingType !== null}>
          {callingType === 'CHAT' ? <ActivityIndicator color="#fff" /> : (
            <>
              <MessageCircle size={20} color="#fff" fill="rgba(255,255,255,0.2)" />
              <View style={styles.actionBtnTextWrap}>
                <Text style={styles.actionBtnTitleChat}>Start Chat</Text>
                <Text style={styles.actionBtnPriceChat}>£{(practitioner as any).perMinuteRate || 1.5}/min</Text>
              </View>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fffbf0' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#ef4444', marginBottom: 20 },
  btn: { backgroundColor: '#6D28D9', padding: 12, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 16, backgroundColor: 'rgba(255,255,255,0.8)' },
  backBtn: { padding: 8, marginLeft: -8 },
  headerLogoRow: { flexDirection: 'row', alignItems: 'center' },
  headerTitle: { fontSize: 20, fontWeight: '900', color: '#4f46e5', letterSpacing: -0.5 },
  shareBtn: { padding: 8, marginRight: -8, backgroundColor: '#f3e8ff', borderRadius: 20 },
  
  heroCard: { margin: 16, backgroundColor: '#fff', borderRadius: 24, padding: 20, shadowColor: '#9333ea', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 20, elevation: 5, borderWidth: 1, borderColor: '#f3e8ff' },
  heroHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  avatarWrap: { position: 'relative', marginRight: 16 },
  avatar: { width: 90, height: 90, borderRadius: 32, borderWidth: 2, borderColor: '#fef08a' },
  onlineBadge: { position: 'absolute', bottom: -6, right: -6, backgroundColor: '#10b981', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, borderWidth: 2, borderColor: '#fff' },
  onlineDot: { width: 6, height: 6, borderRadius: 3, backgroundColor: '#fff', marginRight: 4 },
  onlineText: { color: '#fff', fontSize: 10, fontWeight: 'bold' },
  
  heroDetails: { flex: 1 },
  nameRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
  name: { fontSize: 22, fontWeight: '800', color: '#1e1b4b', letterSpacing: -0.5 },
  badgeWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fef3c7', alignSelf: 'flex-start', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12, marginBottom: 8 },
  badgeText: { fontSize: 12, fontWeight: '700', color: '#b45309', marginLeft: 4 },
  rateText: { fontSize: 16, fontWeight: '800', color: '#4f46e5' },

  statsRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8fafc', padding: 16, borderRadius: 16 },
  statItem: { flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' },
  statTextWrap: { marginLeft: 8 },
  statValue: { fontSize: 15, fontWeight: '800', color: '#0f172a' },
  statLabel: { fontSize: 12, color: '#64748b', fontWeight: '500' },
  statDivider: { width: 1, height: 30, backgroundColor: '#e2e8f0' },

  section: { marginHorizontal: 16, marginBottom: 24, backgroundColor: '#fff', padding: 20, borderRadius: 24, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10, elevation: 2 },
  sectionHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1e1b4b', marginBottom: 16 },
  bioText: { fontSize: 15, color: '#475569', lineHeight: 24 },
  
  subTitle: { fontSize: 14, fontWeight: '700', color: '#64748b', marginBottom: 10, marginTop: 8 },
  tagWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  tag: { backgroundColor: '#fef3c7', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, borderWidth: 1, borderColor: '#fde68a' },
  tagText: { color: '#b45309', fontSize: 13, fontWeight: '600' },

  bottomBar: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#f1f5f9', flexDirection: 'row', padding: 16, gap: 12, shadowColor: '#000', shadowOffset: { width: 0, height: -4 }, shadowOpacity: 0.05, shadowRadius: 12, elevation: 10 },
  actionBtnCall: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderWidth: 2, borderColor: '#6D28D9', borderRadius: 20, paddingVertical: 12 },
  actionBtnChat: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#6D28D9', borderRadius: 20, paddingVertical: 12 },
  actionBtnTextWrap: { marginLeft: 8 },
  actionBtnTitleCall: { fontSize: 15, fontWeight: '800', color: '#6D28D9' },
  actionBtnPriceCall: { fontSize: 12, fontWeight: '600', color: '#8b5cf6' },
  actionBtnTitleChat: { fontSize: 15, fontWeight: '800', color: '#fff' },
  actionBtnPriceChat: { fontSize: 12, fontWeight: '600', color: '#d8b4fe' },
});
