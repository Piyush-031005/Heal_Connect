import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Image } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { practitionersApi, PractitionerProfile, sessionsApi } from "../../lib/api";

export default function PractitionerDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [practitioner, setPractitioner] = useState<PractitionerProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [calling, setCalling] = useState(false);

  useEffect(() => {
    if (id) {
      practitionersApi.get(id).then(res => {
        if (res.success && res.data) {
          setPractitioner(res.data.practitioner as PractitionerProfile);
        }
        setLoading(false);
      }).catch(() => setLoading(false));
    }
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
      setCalling(true);
      const res = await sessionsApi.createSession({ practitionerId: id, type: 'call' });
      if (res.success && res.data) {
        router.push(`/call/${res.data.session.id}`);
      } else {
        alert(res.message || 'Failed to initiate call');
      }
    } catch (e: any) {
      alert(e.message || 'Error starting call');
    } finally {
      setCalling(false);
    }
  };

  const handleChat = async () => {
    try {
      setCalling(true);
      const res = await sessionsApi.createSession({ practitionerId: id, type: 'chat' });
      if (res.success && res.data) {
        router.push(`/call/${res.data.session.id}`); // This is our WebView screen
      } else {
        alert(res.message || 'Failed to initiate chat');
      }
    } catch (e: any) {
      alert(e.message || 'Error starting chat');
    } finally {
      setCalling(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1a1a1a" />
        </TouchableOpacity>
        <Text style={styles.title}>Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.content}>
        <Image 
          source={{ uri: practitioner.photoUrl || "https://i.pravatar.cc/150?img=47" }} 
          style={styles.avatar} 
        />
        <Text style={styles.name}>{practitioner.name}</Text>
        <Text style={styles.role}>{practitioner.specialties?.[0] || 'Wellness Expert'}</Text>

        <Text style={styles.bio}>{practitioner.bio || "No bio available."}</Text>

        <View style={styles.btnRow}>
          <TouchableOpacity style={styles.callBtn} onPress={handleCall} disabled={calling}>
            {calling ? <ActivityIndicator color="#fff" /> : <Text style={styles.callBtnText}>Call</Text>}
          </TouchableOpacity>
          <TouchableOpacity style={styles.chatBtn} onPress={handleChat} disabled={calling}>
            {calling ? <ActivityIndicator color="#1a1a1a" /> : <Text style={styles.chatBtnText}>Chat</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#faf9f6' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { fontSize: 16, color: '#ef4444', marginBottom: 20 },
  btn: { backgroundColor: '#6D28D9', padding: 12, borderRadius: 8 },
  btnText: { color: '#fff', fontWeight: 'bold' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 50, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  title: { fontSize: 18, fontWeight: 'bold' },
  content: { padding: 20, alignItems: 'center' },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
  name: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  role: { fontSize: 16, color: '#6D28D9', marginBottom: 20 },
  bio: { fontSize: 14, textAlign: 'center', color: '#666', marginBottom: 30, lineHeight: 22 },
  btnRow: { flexDirection: 'row', gap: 16 },
  callBtn: { backgroundColor: '#6D28D9', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 24 },
  callBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  chatBtn: { backgroundColor: '#FCD34D', paddingVertical: 14, paddingHorizontal: 32, borderRadius: 24 },
  chatBtnText: { color: '#1a1a1a', fontWeight: 'bold', fontSize: 16 }
});
