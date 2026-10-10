import React, { useEffect, useState } from 'react';
import Toast from 'react-native-toast-message';
import { 
  View, Text, StyleSheet, ScrollView, TouchableOpacity, 
  TextInput, ActivityIndicator, Alert, Image, Modal, FlatList
} from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Camera, Check, Calendar, Clock } from 'lucide-react-native';
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

import { COUNTRIES } from '../lib/countries';

const YEARS = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
const MONTHS = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
const DAYS = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));
const HOURS = Array.from({ length: 24 }, (_, i) => i.toString().padStart(2, '0'));
const MINUTES = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, '0'));

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

  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Temporary picker state
  const [tempYear, setTempYear] = useState(YEARS[20].toString());
  const [tempMonth, setTempMonth] = useState('01');
  const [tempDay, setTempDay] = useState('01');
  const [tempHour, setTempHour] = useState('12');
  const [tempMinute, setTempMinute] = useState('00');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await usersApi.getProfile();
      if (res.success && res.data?.user) {
        const u = res.data.user;
        
        let p = u.phone || '';
        let c = COUNTRIES[0];
        for (const country of COUNTRIES) {
          if (p.startsWith(country.code)) {
            c = country;
            p = p.substring(country.code.length);
            break;
          }
        }
        setSelectedCountry(c);

        setForm({
          name: u.name || '',
          dob: u.dob ? u.dob.split('T')[0] : '',
          birthPlace: u.birthPlace || '',
          timeOfBirth: u.timeOfBirth || '',
          gender: u.gender || '',
          phone: p
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Full Name is required',
        position: 'bottom'
      });
      return;
    }
    const updateData: any = { ...form, wellnessInterests: interests };
    
    // Express validator fails on empty strings for dates/phones, so omit them if empty
    if (form.phone) updateData.phone = selectedCountry.code + form.phone.trim();
    else delete updateData.phone;
    
    if (!form.dob) delete updateData.dob;
    if (!form.gender) delete updateData.gender;
    if (!form.birthPlace) delete updateData.birthPlace;
    if (!form.timeOfBirth) delete updateData.timeOfBirth;

    try {
      setSaving(true);
      const res = await usersApi.updateProfile(updateData);
      if (res.success) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Profile updated successfully',
          position: 'bottom'
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: res.message || 'Failed to update profile',
          position: 'bottom'
        });
      }
    } catch (e: any) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message || 'An error occurred',
        position: 'bottom'
      });
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
        // Modern Expo fetch requires passing a Blob instead of { uri, type, name }
        const imageUri = result.assets[0].uri;
        
        try {
          const formData = new FormData();
          formData.append('photo', {
            uri: imageUri,
            name: 'photo.jpg',
            type: 'image/jpeg'
          } as any);

          const res = await usersApi.uploadPhoto(formData as any);
          if (res.success && res.data) {
            setPhotoUrl(res.data.photoUrl);
          } else {
            Toast.show({
              type: 'error',
              text1: 'Error',
              text2: res.message || 'Failed to upload photo',
              position: 'bottom'
            });
          }
        } catch (uploadError: any) {
          console.log('Upload error', uploadError);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: uploadError.message || 'Failed to process image',
            position: 'bottom'
          });
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
          <View style={{ flexDirection: 'row', gap: 8, marginBottom: 16 }}>
            <TouchableOpacity 
              onPress={() => setShowCountryPicker(true)}
              style={[styles.input, { flex: 0, paddingHorizontal: 12, marginBottom: 0, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', gap: 6 }]}
            >
              <Text style={{ fontSize: 16 }}>{selectedCountry.flag}</Text>
              <Text style={{ color: TEXT, fontSize: 15, fontWeight: '600' }}>{selectedCountry.code}</Text>
              <Text style={{ color: PURPLE, fontSize: 10, marginLeft: 2 }}>▼</Text>
            </TouchableOpacity>
            <TextInput 
              style={[styles.input, { flex: 1, marginBottom: 0 }]} 
              value={form.phone} 
              onChangeText={t => setForm({...form, phone: t})} 
              placeholder="9876543210"
              keyboardType="phone-pad"
            />
          </View>
        </View>

        {/* Personal Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Birth Details</Text>
          
          <Text style={styles.label}>Date of Birth</Text>
          <TouchableOpacity 
            style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ color: form.dob ? TEXT : '#9ca3af', fontSize: 15 }}>
              {form.dob || 'YYYY-MM-DD'}
            </Text>
            <Calendar size={18} color={PURPLE} />
          </TouchableOpacity>

          <Text style={styles.label}>
            Time of Birth <Text style={{ textTransform: 'none', color: '#9ca3af', fontWeight: '400' }}>(optional)</Text>
          </Text>
          <TouchableOpacity 
            style={[styles.input, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }]}
            onPress={() => setShowTimePicker(true)}
          >
            <Text style={{ color: form.timeOfBirth ? TEXT : '#9ca3af', fontSize: 15 }}>
              {form.timeOfBirth || 'HH:MM'}
            </Text>
            <Clock size={18} color={PURPLE} />
          </TouchableOpacity>

          <Text style={styles.label}>Place of Birth</Text>
          <TextInput 
            style={styles.input} 
            value={form.birthPlace} 
            onChangeText={t => setForm({...form, birthPlace: t})} 
            placeholder="City, Country"
          />

          <Text style={styles.label}>Gender</Text>
          <View style={styles.genderRow}>
            {[
              { label: 'Male', value: 'male' }, 
              { label: 'Female', value: 'female' }, 
              { label: 'Other', value: 'non-binary' }
            ].map(g => (
              <TouchableOpacity 
                key={g.value} 
                style={[styles.genderBtn, form.gender === g.value && styles.genderBtnActive]}
                onPress={() => setForm({...form, gender: g.value})}
              >
                <Text style={[styles.genderText, form.gender === g.value && styles.genderTextActive]}>
                  {g.label}
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

      {/* Country Picker Modal */}
      <Modal visible={showCountryPicker} animationType="slide" transparent={true} onRequestClose={() => setShowCountryPicker(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryPicker(false)}>
                <Text style={styles.modalCloseText}>✕</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={COUNTRIES}
              keyExtractor={(item) => item.code + item.name}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={styles.countryItem}
                  onPress={() => { setSelectedCountry(item); setShowCountryPicker(false); }}
                >
                  <Text style={{ fontSize: 24, marginRight: 16 }}>{item.flag}</Text>
                  <Text style={{ flex: 1, fontSize: 16, color: TEXT, fontWeight: '500' }}>{item.name}</Text>
                  <Text style={{ fontSize: 16, color: '#6b7280', fontWeight: '600' }}>{item.code}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>

      {/* Custom Date Picker Modal */}
      <Modal visible={showDatePicker} animationType="fade" transparent={true}>
        <View style={styles.modalOverlayCenter}>
          <View style={styles.pickerModalContent}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLabel}>Year</Text>
                <FlatList data={YEARS} keyExtractor={item => item.toString()} showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity style={[styles.pickerItem, tempYear === item.toString() && styles.pickerItemActive]} onPress={() => setTempYear(item.toString())}>
                      <Text style={[styles.pickerItemText, tempYear === item.toString() && styles.pickerItemTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLabel}>Month</Text>
                <FlatList data={MONTHS} keyExtractor={item => item} showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity style={[styles.pickerItem, tempMonth === item && styles.pickerItemActive]} onPress={() => setTempMonth(item)}>
                      <Text style={[styles.pickerItemText, tempMonth === item && styles.pickerItemTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLabel}>Day</Text>
                <FlatList data={DAYS} keyExtractor={item => item} showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity style={[styles.pickerItem, tempDay === item && styles.pickerItemActive]} onPress={() => setTempDay(item)}>
                      <Text style={[styles.pickerItemText, tempDay === item && styles.pickerItemTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={styles.pickerFooter}>
              <TouchableOpacity style={styles.pickerBtnCancel} onPress={() => setShowDatePicker(false)}><Text style={styles.pickerBtnCancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.pickerBtnConfirm} onPress={() => { setForm({...form, dob: `${tempYear}-${tempMonth}-${tempDay}`}); setShowDatePicker(false); }}>
                <Text style={styles.pickerBtnConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Custom Time Picker Modal */}
      <Modal visible={showTimePicker} animationType="fade" transparent={true}>
        <View style={styles.modalOverlayCenter}>
          <View style={styles.pickerModalContent}>
            <Text style={styles.modalTitle}>Select Time</Text>
            <View style={styles.pickerRow}>
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLabel}>Hour</Text>
                <FlatList data={HOURS} keyExtractor={item => item} showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity style={[styles.pickerItem, tempHour === item && styles.pickerItemActive]} onPress={() => setTempHour(item)}>
                      <Text style={[styles.pickerItemText, tempHour === item && styles.pickerItemTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
              <Text style={{ fontSize: 24, fontWeight: 'bold', color: PURPLE, marginTop: 100 }}>:</Text>
              <View style={styles.pickerCol}>
                <Text style={styles.pickerLabel}>Minute</Text>
                <FlatList data={MINUTES} keyExtractor={item => item} showsVerticalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity style={[styles.pickerItem, tempMinute === item && styles.pickerItemActive]} onPress={() => setTempMinute(item)}>
                      <Text style={[styles.pickerItemText, tempMinute === item && styles.pickerItemTextActive]}>{item}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
            <View style={styles.pickerFooter}>
              <TouchableOpacity style={styles.pickerBtnCancel} onPress={() => setShowTimePicker(false)}><Text style={styles.pickerBtnCancelText}>Cancel</Text></TouchableOpacity>
              <TouchableOpacity style={styles.pickerBtnConfirm} onPress={() => { setForm({...form, timeOfBirth: `${tempHour}:${tempMinute}`}); setShowTimePicker(false); }}>
                <Text style={styles.pickerBtnConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    gap: 12,
  },
  tag: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 24,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e2e8f0',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tagSelected: {
    backgroundColor: PURPLE,
    borderColor: PURPLE,
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
  },
  tagText: {
    color: '#475569',
    fontSize: 14,
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
  },
  
  modalOverlay: { flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#fff', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 24, height: '70%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  modalTitle: { fontSize: 20, fontWeight: '800', color: TEXT },
  modalCloseText: { fontSize: 20, color: '#6b7280', padding: 8 },
  countryItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: '#f3f4f6' },

  modalOverlayCenter: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  pickerModalContent: { backgroundColor: '#fff', borderRadius: 24, padding: 24, width: '85%', height: 400 },
  pickerRow: { flexDirection: 'row', flex: 1, justifyContent: 'space-between', marginTop: 16 },
  pickerCol: { flex: 1, marginHorizontal: 4 },
  pickerLabel: { textAlign: 'center', color: '#6b7280', fontWeight: '600', marginBottom: 12 },
  pickerItem: { paddingVertical: 12, alignItems: 'center', borderRadius: 8 },
  pickerItemActive: { backgroundColor: '#f5f3ff' },
  pickerItemText: { fontSize: 18, color: '#4b5563' },
  pickerItemTextActive: { color: PURPLE, fontWeight: '700', fontSize: 20 },
  pickerFooter: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 16, gap: 16 },
  pickerBtnCancel: { padding: 12 },
  pickerBtnCancelText: { color: '#6b7280', fontSize: 16, fontWeight: '600' },
  pickerBtnConfirm: { backgroundColor: PURPLE, paddingHorizontal: 20, paddingVertical: 12, borderRadius: 12 },
  pickerBtnConfirmText: { color: '#fff', fontSize: 16, fontWeight: '700' },
});
