import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Platform } from 'react-native';
import Colors from '@/constants/Colors';
import { Search, Sun, Moon, Eye, Hand, Wind, Heart, Music, Hash, Bell } from 'lucide-react-native';
import PrismView from '../../src/components/PrismView';

export default function ExploreScreen() {
  const theme = Colors.light;

  const services = [
    { id: 1, name: 'Astrology', desc: 'Gain cosmic insights', icon: <Sun color={theme.primary} size={32} /> },
    { id: 2, name: 'Tarot', desc: 'Unveil hidden truths', icon: <Moon color={theme.primary} size={32} /> },
    { id: 3, name: 'Face Reading', desc: 'Know your true self', icon: <Eye color={theme.primary} size={32} /> },
    { id: 4, name: 'Palm Reading', desc: 'Discover your path', icon: <Hand color={theme.primary} size={32} /> },
    { id: 5, name: 'Meditation', desc: 'Inner peace, daily', icon: <Wind color={theme.primary} size={32} /> },
    { id: 6, name: 'Chakra Healing', desc: 'Balance your energy', icon: <Heart color={theme.primary} size={32} /> },
    { id: 7, name: 'Sound Healing', desc: 'Therapeutic frequencies', icon: <Music color={theme.primary} size={32} /> },
    { id: 8, name: 'Numerology', desc: 'Decode your numbers', icon: <Hash color={theme.primary} size={32} /> },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={styles.title}>Explore</Text>
        <TouchableOpacity>
          <Bell color={theme.text} size={24} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search color={theme.textSecondary} size={20} style={styles.searchIcon} />
        <TextInput 
          style={styles.searchInput}
          placeholder="Search services..."
          placeholderTextColor={theme.textSecondary}
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.pillsContainer}>
        {['All', 'Spiritual', 'Healing', 'Lifestyle'].map((category, index) => (
          <TouchableOpacity 
            key={category} 
            style={[styles.pill, index === 0 ? styles.pillActive : null]}
          >
            <Text style={[styles.pillText, index === 0 ? styles.pillTextActive : null]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.grid}>
        <View style={{ width: '100%', marginBottom: 20 }}>
          <Text style={[styles.title, { paddingHorizontal: 20, marginBottom: 10, fontSize: 18 }]}>3D Prism Animation</Text>
          <PrismView height={250} />
        </View>
        {services.map((service) => (
          <TouchableOpacity key={service.id} style={styles.card}>
            <View style={styles.iconWrapper}>{service.icon}</View>
            <Text style={styles.cardTitle}>{service.name}</Text>
            <Text style={styles.cardDesc}>{service.desc}</Text>
          </TouchableOpacity>
        ))}
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

// Dummy Bell component
const BellIcon = ({ color, size }: any) => (
  <View style={{ width: size, height: size, borderRadius: size/2, backgroundColor: Colors.light.backgroundElement, shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 }} />
);

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  title: { color: Colors.light.text, fontSize: 28, fontWeight: 'bold' },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.backgroundElement, borderRadius: 16, paddingHorizontal: 16, height: 55, marginHorizontal: 20, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: Colors.light.text, fontSize: 16, height: '100%' },

  pillsContainer: { paddingHorizontal: 20, gap: 10, height: 45, marginBottom: 20 },
  pill: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: Colors.light.backgroundElement, height: 40, justifyContent: 'center', shadowColor: '#000', shadowOpacity: 0.02, shadowRadius: 3, shadowOffset: { width: 0, height: 1 }, elevation: 1 },
  pillActive: { backgroundColor: Colors.light.primary },
  pillText: { color: Colors.light.textSecondary, fontSize: 14, fontWeight: '600' },
  pillTextActive: { color: '#FFFFFF', fontWeight: 'bold' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', paddingHorizontal: 20, gap: 15 },
  card: { width: '47%', backgroundColor: Colors.light.backgroundElement, borderRadius: 24, padding: 20, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  iconWrapper: { width: 64, height: 64, borderRadius: 20, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  cardTitle: { color: Colors.light.text, fontSize: 16, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  cardDesc: { color: Colors.light.textSecondary, fontSize: 12, textAlign: 'center', lineHeight: 16 },
});
