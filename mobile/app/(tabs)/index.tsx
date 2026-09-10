import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, TouchableOpacity, StatusBar, Platform, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Colors from '@/constants/Colors';
import { Search, Bell, Sparkles, ChevronRight, Moon, Sun, Wind, Activity, Star } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing, runOnJS } from 'react-native-reanimated';
import { useEffect, useState } from 'react';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const theme = Colors.light;
  const [showIntro, setShowIntro] = useState(true);

  // Animation values for Intro
  const introOpacity = useSharedValue(1);
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentTranslateY = useSharedValue(50);

  useEffect(() => {
    // Intro Animation Sequence
    logoOpacity.value = withTiming(1, { duration: 1000 });
    logoScale.value = withTiming(1, { duration: 1000, easing: Easing.out(Easing.back(1.5)) });
    
    // Fade out intro and show content
    setTimeout(() => {
      introOpacity.value = withTiming(0, { duration: 800 }, (finished) => {
        if (finished) {
          runOnJS(setShowIntro)(false);
        }
      });
      contentOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      contentTranslateY.value = withDelay(400, withTiming(0, { duration: 800, easing: Easing.out(Easing.cubic) }));
    }, 2500);
  }, []);

  const animatedIntroStyle = useAnimatedStyle(() => ({
    opacity: introOpacity.value,
    zIndex: showIntro ? 100 : -1,
  }));

  const animatedLogoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ translateY: contentTranslateY.value }],
  }));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar barStyle="dark-content" />
      
      {/* INTRO SPLASH SCREEN */}
      {showIntro && (
        <Animated.View style={[StyleSheet.absoluteFill, styles.introContainer, animatedIntroStyle]}>
          <LinearGradient
            colors={['#F9F5FF', '#E9D5FF', '#C084FC']}
            style={StyleSheet.absoluteFill}
          />
          <Animated.View style={[styles.introLogoWrapper, animatedLogoStyle]}>
            <LinearGradient
              colors={['#FFFFFF', '#F3E8FF']}
              style={styles.introLogoCircle}
            >
              <Text style={styles.introLogoIcon}>ðŸª·</Text>
            </LinearGradient>
            <Text style={styles.introTitle}>Zen<Text style={{color: '#FFFFFF'}}>Auraa</Text></Text>
            <Text style={styles.introSubtitle}>Your Journey to Inner Peace</Text>
          </Animated.View>
        </Animated.View>
      )}

      {/* MAIN CONTENT */}
      <Animated.ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        style={animatedContentStyle}
      >
        
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image 
              source={{ uri: 'https://i.pravatar.cc/100?img=11' }} 
              style={styles.avatar} 
            />
            <View>
              <Text style={styles.greeting}>Good Morning,</Text>
              <Text style={styles.userName}>Piyush ðŸ‘‹</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.bellIcon}>
            <Bell color={theme.text} size={22} />
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
          <View style={styles.meditationImagePlaceholder}>
            <Moon color="#FFFFFF" size={60} opacity={0.2} />
          </View>
        </LinearGradient>

        {/* Ask ZenAuraa Banner */}
        <TouchableOpacity activeOpacity={0.8}>
          <LinearGradient
            colors={['rgba(192₹32,252,0.15)', 'rgba(78,205₹96,0.15)']}
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
            { id: 1, name: 'Astrology', icon: <Sun color={theme.primary} size={26} /> },
            { id: 2, name: 'Tarot', icon: <Moon color={theme.primary} size={26} /> },
            { id: 3, name: 'Meditation', icon: <Wind color={theme.primary} size={26} /> },
            { id: 4, name: 'Healing', icon: <Activity color={theme.primary} size={26} /> },
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
        <View style={{ height: 100 }} />
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  
  // Intro Styles
  introContainer: { justifyContent: 'center', alignItems: 'center' },
  introLogoWrapper: { alignItems: 'center' },
  introLogoCircle: { width: 120, height: 120, borderRadius: 60, justifyContent: 'center', alignItems: 'center', shadowColor: '#9333EA', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.3, shadowRadius: 20, elevation: 10, marginBottom: 20 },
  introLogoIcon: { fontSize: 50 },
  introTitle: { fontSize: 42, fontWeight: '900', color: '#2A1658', letterSpacing: 1 },
  introSubtitle: { fontSize: 16, color: '#FFFFFF', fontWeight: '600', marginTop: 8, letterSpacing: 0.5, opacity: 0.9 },

  // Main Content Styles
  scrollContent: { paddingHorizontal: 24, paddingTop: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 30 },
  headerLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 48, height: 48, borderRadius: 24, borderWidth: 2, borderColor: Colors.light.border },
  greeting: { color: Colors.light.textSecondary, fontSize: 14, fontWeight: '500' },
  userName: { color: Colors.light.text, fontSize: 20, fontWeight: '800', marginTop: 2 },
  bellIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: Colors.light.backgroundElement, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 2 },
  notificationDot: { position: 'absolute', top: 12, right: 12, width: 8, height: 8, borderRadius: 4, backgroundColor: '#EF4444', borderWidth: 1, borderColor: '#FFFFFF' },
  
  searchContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.backgroundElement, borderRadius: 20, paddingHorizontal: 18, height: 58, marginBottom: 25, shadowColor: '#9333EA', shadowOpacity: 0.06, shadowRadius: 15, shadowOffset: { width: 0, height: 8 }, elevation: 4 },
  searchIcon: { marginRight: 12 },
  searchInput: { flex: 1, color: Colors.light.text, fontSize: 16, height: '100%', fontWeight: '500' },

  featureCard: { borderRadius: 28, padding: 28, marginBottom: 25, flexDirection: 'row', overflow: 'hidden', height: 170, shadowColor: '#9333EA', shadowOpacity: 0.4, shadowRadius: 20, shadowOffset: { width: 0, height: 10 }, elevation: 12 },
  featureCardContent: { flex: 1, justifyContent: 'center', zIndex: 2 },
  featureCardTitle: { color: '#FFFFFF', fontSize: 26, fontWeight: '900', marginBottom: 8, lineHeight: 32, letterSpacing: 0.5 },
  featureCardSubtitle: { color: 'rgba(255,255,255,0.9)', fontSize: 14, lineHeight: 22, fontWeight: '500' },
  meditationImagePlaceholder: { position: 'absolute', right: -15, bottom: -25, width: 150, height: 150, borderRadius: 75, backgroundColor: 'rgba(255,255,255,0.15)', justifyContent: 'center', alignItems: 'center', zIndex: 1, transform: [{rotate: '-15deg'}] },

  aiBanner: { flexDirection: 'row', alignItems: 'center', borderRadius: 24, padding: 18, marginBottom: 35, backgroundColor: 'rgba(255,255,255,0.9)', borderWidth: 1, borderColor: '#F3E8FF', shadowColor: '#9333EA', shadowOpacity: 0.08, shadowRadius: 15, shadowOffset: { width: 0, height: 6 }, elevation: 3 },
  aiBannerIconWrapper: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center', marginRight: 16 },
  aiBannerTextWrapper: { flex: 1 },
  aiBannerTitle: { color: Colors.light.text, fontSize: 17, fontWeight: '800', marginBottom: 2 },
  aiBannerSubtitle: { color: Colors.light.textSecondary, fontSize: 13, fontWeight: '500' },
  aiBannerArrow: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F3E8FF', justifyContent: 'center', alignItems: 'center' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 },
  sectionTitle: { color: Colors.light.text, fontSize: 20, fontWeight: '800' },
  seeAllText: { color: Colors.light.primary, fontSize: 15, fontWeight: '700' },

  servicesGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 35 },
  serviceItem: { alignItems: 'center', width: '23%' },
  serviceIconWrapper: { width: 64, height: 64, borderRadius: 22, backgroundColor: Colors.light.backgroundElement, justifyContent: 'center', alignItems: 'center', marginBottom: 10, shadowColor: '#9333EA', shadowOpacity: 0.08, shadowRadius: 10, shadowOffset: { width: 0, height: 4 }, elevation: 3 },
  serviceName: { color: Colors.light.text, fontSize: 13, fontWeight: '700', textAlign: 'center' },

  expertsScroll: { gap: 16, paddingBottom: 10, paddingRight: 20 },
  expertCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.light.backgroundElement, borderRadius: 24, padding: 14, paddingRight: 24, shadowColor: '#9333EA', shadowOpacity: 0.06, shadowRadius: 12, shadowOffset: { width: 0, height: 5 }, elevation: 4 },
  expertImage: { width: 56, height: 56, borderRadius: 18, marginRight: 16 },
  expertInfo: { justifyContent: 'center' },
  expertName: { color: Colors.light.text, fontSize: 16, fontWeight: '800', marginBottom: 4 },
  expertTitle: { color: Colors.light.textSecondary, fontSize: 13, fontWeight: '500', marginBottom: 6 },
  ratingWrapper: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ratingText: { color: '#FAD058', fontSize: 13, fontWeight: '800' },
});