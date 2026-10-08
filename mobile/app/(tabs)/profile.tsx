import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Alert } from "react-native";
import { 
  User, 
  BookOpen, 
  MapPin, 
  MessageCircle, 
  Crown, 
  Star, 
  Gift, 
  HelpCircle,
  ChevronRight,
  ChevronDown
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { tokenStore, usersApi } from "../../lib/api";
import { useEffect, useState } from "react";

const MENU_ITEMS = [
  { id: 1, title: "My Profile", subtitle: "Change your profile details", icon: User, route: "profile" },
  { id: 2, title: "My Sessions", subtitle: "Check your session status", icon: BookOpen, route: "sessions" },
  { id: 3, title: "My Wallet", subtitle: "Recharge for quick connections", icon: MapPin, route: "wallet" },
  { id: 4, title: "Need Help? We're here for you", subtitle: "Get instant query assistance", icon: MessageCircle, route: "help" },
  { id: 6, title: "Reviews", subtitle: "", icon: Star, route: "reviews" },
  { id: 7, title: "Cashback & Rewards", subtitle: "", icon: Gift, route: "rewards" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("User");

  useEffect(() => {
    tokenStore.getRole().then((r: string | null) => setRole(r));
    usersApi.getProfile().then(res => {
      if (res.success && res.data?.user) {
        setUserName(res.data.user.name || "User");
      }
    });
  }, []);

  const items = role === 'expert' 
    ? [{ id: 0, title: "Expert Dashboard", subtitle: "Manage your sessions and earnings", icon: Crown, route: "dashboard" }, ...MENU_ITEMS]
    : MENU_ITEMS;

  const handleNavigation = (route: string) => {
    if (route === 'wallet') {
      router.push('/wallet');
    } else {
      Alert.alert('Coming Soon', `The ${route} screen is currently under construction.`);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        
        {/* Mountain Hero Section */}
        <TouchableOpacity activeOpacity={0.9} onPress={() => handleNavigation('profile-settings')}>
          <ImageBackground 
            source={require("../../assets/images/mountain.png")} 
            style={styles.heroBackground}
            resizeMode="cover"
          >
            {/* Gradient Overlay for better text readability */}
            <View style={styles.heroOverlay}>
              <Text style={styles.greetingTitle}>Hello, {userName}</Text>
              <Text style={styles.greetingSubtitle}>"Style is how you express who you are without saying a word"</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>

        {/* Menu List */}
        <View style={styles.menuContainer}>
          {items.map((item, index) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => handleNavigation(item.route)}
            >
              <View style={styles.menuIconWrap}>
                <item.icon size={22} color="#1a1a1a" strokeWidth={1.5} />
              </View>
              <View style={styles.menuTextContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                {!!item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
              </View>
              <ChevronRight size={20} color="#6b7280" />
            </TouchableOpacity>
          ))}

          {/* FAQ Item (has down chevron in screenshot) */}
          <TouchableOpacity style={[styles.menuItem, { borderBottomWidth: 0 }]} onPress={() => handleNavigation('faq')}>
            <View style={styles.menuIconWrap}>
              <HelpCircle size={22} color="#1a1a1a" strokeWidth={1.5} />
            </View>
            <View style={styles.menuTextContent}>
              <Text style={styles.menuTitle}>FAQ's & Policies</Text>
            </View>
            <ChevronDown size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#ffffff" 
  },
  heroBackground: {
    width: '100%',
    height: 280,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: 'rgba(0,0,0,0.2)', // Light dark wash for text contrast
    height: '100%',
    justifyContent: 'flex-end',
  },
  greetingTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 24,
    color: '#ffffff',
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 18,
  },
  menuContainer: {
    paddingTop: 10,
    paddingBottom: 100,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIconWrap: {
    width: 32,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  menuTextContent: {
    flex: 1,
    paddingLeft: 4,
  },
  menuTitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 15,
    color: '#374151',
  },
  menuSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 4,
  },
  newBadge: {
    backgroundColor: '#2d1b69',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    marginLeft: 8,
  },
  newBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontFamily: 'Inter_600SemiBold',
  }
});