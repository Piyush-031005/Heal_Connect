import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, ActivityIndicator, Alert, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usersApi } from '../lib/api';
// Using standard expo-image-picker (might need installation if not present, but user will get a TS error if so)
// If not installed, this will throw an error when running.
import * as ImagePicker from 'expo-image-picker';

const PURPLE = "#8B5CF6";
const TEXT = "#1E1035";

const WELLNESS_OPTIONS = [
  'Numerology', 'Astrology', 'Space Harmony', 'Tarot', 'Dream Predict',
  'Face Reading', 'Breathwork', 'Palm Reading', 'Chakra Healing',
  'Sound Healing', 'Spiritual', 'Meditation'
];

export default function ProfileSettingsScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const [form, setForm] = useState({ 
    name: '', dob: '', birthPlace: '', timeOfBirth: '', gender: '', phone: '' 
  });
  const [interests, setInterests] = useState<string[]>([]);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await usersApi.getProfile();
      if (res.success && res.data?.user) {
        const u = res.data.user;
        setForm({
          name: u.name || '',
          dob: u.dob ? u.dob.split('T')[0] : '',
          birthPlace: u.birthPlace || '',
          timeOfBirth: u.timeOfBirth || '',
          gender: u.gender || '',
          phone: u.phone || ''
        });
        setInterests(u.wellnessInterests || []);
        setPhotoUrl(u.photoUrl || null);
        setEmail(u.email || '');
        setIsEmailVerified(u.isEmailVerified || false);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      Alert.alert('Error', 'Full Name is required');
      return;
    }
    try {
      setSaving(true);
      const res = await usersApi.updateProfile({
        ...form,
        wellnessInterests: interests
      });
      if (res.success) {
        Alert.alert('Success', 'Profile updated successfully');
      } else {
        Alert.alert('Error', res.message || 'Failed to update profile');
      }
    } catch (e: any) {
      Alert.alert('Error', e.message || 'An error occurred');
    } finally {
      setSaving(false);
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });

      if (!result.canceled && result.assets && result.assets[0].uri) {
        setUploading(true);
        // Note: React Native FormData is tricky. We append { uri, name, type }
        const formData = new FormData();
        formData.append('photo', {
          uri: result.assets[0].uri,
          name: 'photo.jpg',
          type: 'image/jpeg',
        } as any);

        const res = await usersApi.uploadPhoto(formData as any);
        if (res.success && res.data) {
          setPhotoUrl(res.data.photoUrl);
        } else {
          Alert.alert('Error', res.message || 'Failed to upload photo');
        }
      }
    } catch (e) {
      console.log('Image picker error', e);
    } finally {
      setUploading(false);
    }
  };

  const toggleInterest = (i: string) => {
    setInterests(prev => 
      prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={PURPLE} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <ArrowLeft size={24} color={TEXT} />
        </TouchableOpacity>
        <Text style={styles.title}>My Profile</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        {/* Photo Upload Section */}
        <View style={styles.photoSection}>
          <TouchableOpacity onPress={pickImage} style={styles.photoContainer}>
            {photoUrl ? (
              <Image source={{ uri: photoUrl }} style={styles.photo} />
            ) : (
              <View style={[styles.photo, styles.photoPlaceholder]}>
                <Camera size={32} color="#a78bfa" />
              </View>
            )}
            {uploading && (
              <View style={styles.photoLoadingOverlay}>
                <ActivityIndicator color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Basic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Information</Text>
          
          <Text style={styles.label}>Full Name *</Text>
          <TextInput 
            style={styles.input} 
            value={form.name} 
            onChangeText={t => setForm({...form, name: t})} 
            placeholder="John Doe"
          />

          <Text style={styles.label}>Email Address</Text>
          <View style={[styles.input, styles.disabledInput]}>
            <Text style={{ color: '#6b7280' }}>{email || 'No email'}</Text>
            {isEmailVerified && <Check size={16} color="#10B981" />}
          </View>

          <Text style={styles.label}>Phone Number</Text>
          <TextInput 
            style={styles.input} 
            value={form.phone} 
            onChangeText={t => setForm({...form, phone: t})} 
            placeholder="+1 234 567 890"
            keyboardType="phone-pad"
          />
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Birth Details</Text>
          
          <Text style={styles.label}>Date of Birth</Text>
          <TextInput 
            style={styles.input} 
            value={form.dob} 
            onChangeText={t => setForm({...form, dob: t})} 
            placeholder="YYYY-MM-DD"
          />

          <Text style={styles.label}>Time of Birth</Text>
          <TextInput 
            style={styles.input} 
            value={form.timeOfBirth} 
            onChangeText={t => setForm({...form, timeOfBirth: t})} 
            placeholder="HH:MM"
          />

          <Text style={styles.label}>Place of Birth</Text>
          <TextInput 
            style={styles.input} 
            value={form.birthPlace} 
            onChangeText={t => setForm({...form, birthPlace: t})} 
            placeholder="City, Country"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {['Male', 'Female', 'Other'].map(g => (
              <TouchableOpacity 
                key={g} 
                style={[styles.genderBtn, form.gender === g && styles.genderBtnActive]}
                onPress={() => setForm({...form, gender: g})}
              >
                <Text style={[styles.genderText, form.gender === g && styles.genderTextActive]}>
                  {g}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Wellness Interests */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Wellness Interests</Text>
          <View style={styles.tagsContainer}>
            {WELLNESS_OPTIONS.map(interest => {
              const selected = interests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  style={[styles.tag, selected && styles.tagSelected]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text style={[styles.tagText, selected && styles.tagTextSelected]}>
                    {interest}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <TouchableOpacity 
          style={styles.saveBtn} 
          onPress={handleSave} 
          disabled={saving}
        >
          {saving ? <ActivityIndicator color="#fff" /> : <Text style={styles.saveBtnText}>Save Changes</Text>}
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT,
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  photo: {
    width: '100%',
    height: '100%',
  },
  photoPlaceholder: {
    backgroundColor: '#ede9fe',
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoLoadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: TEXT,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#8b5cf6',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: TEXT,
    marginBottom: 16,
  },
  disabledInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderColor: '#e5e7eb',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  genderBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd6fe',
    backgroundColor: '#f5f3ff',
  },
  genderBtnActive: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  genderText: {
    color: '#6b7280',
    fontWeight: '600',
  },
  genderTextActive: {
    color: '#fff',
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  tag: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f5f3ff',
    borderWidth: 1,
    borderColor: '#ddd6fe',
  },
  tagSelected: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
  },
  tagText: {
    color: '#6b7280',
    fontSize: 13,
    fontWeight: '600',
  },
  tagTextSelected: {
    color: '#fff',
  },
  saveBtn: {
    backgroundColor: PURPLE,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  }
});
