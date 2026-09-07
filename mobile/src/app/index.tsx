import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { Search, Bell, Sparkles, ChevronRight, Moon, Sun, Wind, Activity, Star } from 'lucide-react-native';

export default function HomeScreen() {
  const theme = Colors.light;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=11' }} 
              style={styles.avatar} 
            />
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.userName}>Piyush 👋</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellIcon}>
            <Bell color={theme.text} size={24} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color={theme.textSecondary} size={20} style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput}
            placeholder="Search for experts, services..."
            placeholderTextColor={theme.textSecondary}
          />
        </View>

        {/* Feature Card */}
        <LinearGradient
          colors={['#C084FC', '#A855F7', '#9333EA']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.featureCard}
        >
          <View style={styles.featureCardContent}>
            <Text style={styles.featureCardTitle}>Your Peace{'\n'}Our Purpose</Text>
            <Text style={styles.featureCardSubtitle}>Find clarity, healing{'\n'}and balance.</Text>
          </View>
          {/* Placeholder for Meditation Image */}
          <View style={styles.meditationImagePlaceholder}>
            <Moon color="#FFFFFF" size={48} opacity={0.3} />
          </View>
        </LinearGradient>

        {/* Ask ZenAuraa Banner */}
        <TouchableOpacity>
          <LinearGradient
            colors={['rgba(192,132,252,0.15)', 'rgba(78,205,196,0.15)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.aiBanner}
          >
            <View style={styles.aiBannerIconWrapper}>
              <Sparkles color={theme.primary} size={20} />
            </View>
            <View style={styles.aiBannerTextWrapper}>
              <Text style={styles.aiBannerTitle}>Ask ZenAuraa</Text>
              <Text style={styles.aiBannerSubtitle}>Your AI guide for life's questions</Text>
            </View>
            <View style={styles.aiBannerArrow}>
              <ChevronRight color={theme.primary} size={20} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Popular Services */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>
        
        <View style={styles.servicesGrid}>
          {[
            { id: 1, name: 'Astrology', icon: <Sun color={theme.primary} size={28} /> },
            { id: 2, name: 'Tarot', icon: <Moon color={theme.primary} size={28} /> },
            { id: 3, name: 'Meditation', icon: <Wind color={theme.primary} size={28} /> },
            { id: 4, name: 'Healing', icon: <Activity color={theme.primary} size={28} /> },
          ].map((service) => (
            <TouchableOpacity key={service.id} style={styles.serviceItem}>
              <View style={styles.serviceIconWrapper}>
                {service.icon}
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Top Experts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Experts</Text>
          <TouchableOpacity><Text style={styles.seeAllText}>See All</Text></TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.expertsScroll}>
          {[
            { id: 1, name: 'Dr. Ananya', title: 'Astrologer', rating: '4.9', img: 'https://i.pravatar.cc/150?img=47' },
            { id: 2, name: 'Reyansh', title: 'Tarot Reader', rating: '4.8', img: 'https://i.pravatar.cc/150?img=11' },
            { id: 3, name: 'Priya', title: 'Healer', rating: '5.0', img: 'https://i.pravatar.cc/150?img=44' },
          ].map((expert) => (
            <TouchableOpacity key={expert.id} style={styles.expertCard}>
              <Image source={{ uri: expert.img }} style={styles.expertImage} />
              <View style={styles.expertInfo}>
                <Text style={styles.expertName}>{expert.name}</Text>
                <Text style={styles.expertTitle}>{expert.title}</Text>
                <View style={styles.ratingWrapper}>
                  <Star color="#FAD058" size={12} fill="#FAD058" />
                  <Text style={styles.ratingText}>{expert.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  scrollContent: { paddingHorizontal: 20, paddingTop: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 25 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 44, height: 44, borderRadius: 22, borderWidth: 1, borderColor: Colors.light.border },
  greeting: { color: Colors.light.textSecondary, fontSize: 13, fontWeight: '500' },
  userName: { color: Colors.light.text, fontSize: 18, fontWeight: 'bold', marginTop: 2 },
  bellIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.light.backgroundElement, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  notificationDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444' },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.backgroundElement, borderRadius: 16, paddingHorizontal: 16, height: 55, marginBottom: 25, shadowColor: '#000', shadowOpacity: 0.04, shadowRadius: 8, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, color: Colors.light.text, fontSize: 16, height: '100%' },

  featureCard: { borderRadius: 24, padding: 25, marginBottom: 20, flexDirection: 'row', overflow: 'hidden', height: 160, shadowColor: '#9333EA', shadowOpacity: 0.3, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 10 },
  featureCardContent: { flex: 1, justifyContent: 'center', zIndex: 2 },
  featureCardTitle: { color: '#FFFFFF', fontSize: 24, fontWeight: '800', marginBottom: 8, lineHeight: 30 },
  featureCardSubtitle: { color: 'rgba(255,255,255,0.85)', fontSize: 14, lineHeight: 20 },
  meditationImagePlaceholder: { position: 'absolute', right: -10, bottom: -20, width: 140, height: 140, borderRadius: 70, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', zIndex: 1 },

  aiBanner: { flexDirection: 'row', alignItems: 'center', borderRadius: 20, padding: 16, marginBottom: 30, backgroundColor: 'rgba(255,255,255,0.7)', borderWidth: 1, borderColor: '#F3E8FF' },
  aiBannerIconWrapper: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  aiBannerTextWrapper: { flex: 1 },
  aiBannerTitle: { color: Colors.light.text, fontSize: 16, fontWeight: 'bold', marginBottom: 2 },
  aiBannerSubtitle: { color: Colors.light.textSecondary, fontSize: 13 },
  aiBannerArrow: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  sectionTitle: { color: Colors.light.text, fontSize: 18, fontWeight: 'bold' },
  seeAllText: { color: Colors.light.primary, fontSize: 14, fontWeight: '600' },

  servicesGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 30 },
  serviceItem: { alignItems: 'center', width: '23%' },
  serviceIconWrapper: { width: 60, height: 60, borderRadius: 20, backgroundColor: Colors.light.backgroundElement, justifyContent: 'center', alignItems: 'center', marginBottom: 8, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 5, shadowOffset: { width: 0, height: 2 }, elevation: 2 },
  serviceName: { color: Colors.light.text, fontSize: 12, fontWeight: '600', textAlign: 'center' },

  expertsScroll: { gap: 15 },
  expertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.backgroundElement, borderRadius: 20, padding: 12, paddingRight: 20, shadowColor: '#000', shadowOpacity: 0.03, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 3 },
  expertImage: { width: 50, height: 50, borderRadius: 16, marginRight: 15 },
  expertInfo: { justifyContent: 'center' },
  expertName: { color: Colors.light.text, fontSize: 15, fontWeight: 'bold', marginBottom: 4 },
  expertTitle: { color: Colors.light.textSecondary, fontSize: 12, marginBottom: 6 },
  ratingWrapper: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  ratingText: { color: '#FAD058', fontSize: 12, fontWeight: 'bold' },
});
