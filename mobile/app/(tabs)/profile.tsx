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
  ChevronDown,
  LogOut
} from "lucide-react-native";
import { useRouter } from "expo-router";
import { tokenStore, usersApi } from "../../lib/api";
import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const BASE_MENU_ITEMS = [
  { id: 1, title: "My Profile", subtitle: "Change your profile details", icon: User, route: "profile-settings" },
  { id: 2, title: "My Sessions", subtitle: "Check your session status", icon: BookOpen, route: "sessions" },
  { id: 3, title: "My Wallet", subtitle: "Recharge for quick connections", icon: MapPin, route: "wallet" },
  { id: 4, title: "Need Help? We're here for you", subtitle: "Get instant query assistance", icon: MessageCircle, route: "help" },
  { id: 7, title: "Rewards", subtitle: "Check your points balance", icon: Gift, route: "rewards" },
];

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
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
    ? [
        { id: 0, title: "Expert Dashboard", subtitle: "Manage your sessions and earnings", icon: Crown, route: "dashboard" },
        { id: 6, title: "My Reviews", subtitle: "See what clients are saying", icon: Star, route: "reviews" },
        ...BASE_MENU_ITEMS
      ]
    : BASE_MENU_ITEMS;

  const handleNavigation = (route: string) => {
    router.push(`/${route}` as any);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive",
          onPress: async () => {
            await logout();
            router.replace("/(auth)/login");
          }
        }
      ]
    );
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
              activeOpacity={0.7}
            >
              <View style={styles.menuIconWrap}>
                <item.icon size={22} color="#6D28D9" strokeWidth={2} />
              </View>
              <View style={styles.menuTextContent}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                {!!item.subtitle && <Text style={styles.menuSubtitle}>{item.subtitle}</Text>}
              </View>
              <View style={styles.chevronWrap}>
                <ChevronRight size={18} color="#9ca3af" />
              </View>
            </TouchableOpacity>
          ))}

          {/* FAQ Item */}
          <TouchableOpacity style={styles.menuItem} onPress={() => handleNavigation('faq')} activeOpacity={0.7}>
            <View style={styles.menuIconWrap}>
              <HelpCircle size={22} color="#6D28D9" strokeWidth={2} />
            </View>
            <View style={styles.menuTextContent}>
              <Text style={styles.menuTitle}>FAQ's & Policies</Text>
            </View>
            <View style={styles.chevronWrap}>
              <ChevronDown size={18} color="#9ca3af" />
            </View>
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]} onPress={handleLogout} activeOpacity={0.7}>
            <View style={[styles.menuIconWrap, { backgroundColor: '#fee2e2' }]}>
              <LogOut size={22} color="#ef4444" strokeWidth={2} />
            </View>
            <View style={styles.menuTextContent}>
              <Text style={[styles.menuTitle, { color: '#ef4444' }]}>Log Out</Text>
            </View>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F9F5FF" 
  },
  heroBackground: {
    width: '100%',
    height: 300,
    justifyContent: 'flex-end',
  },
  heroOverlay: {
    padding: 24,
    paddingBottom: 60, // Extra padding because cards will overlap
    backgroundColor: 'rgba(0,0,0,0.3)', 
    height: '100%',
    justifyContent: 'flex-end',
  },
  greetingTitle: {
    fontFamily: 'Inter_700Bold',
    fontSize: 26,
    color: '#ffffff',
    marginBottom: 8,
  },
  greetingSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 14,
    color: 'rgba(255,255,255,0.9)',
    lineHeight: 20,
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingBottom: 100,
    marginTop: -30, // Overlap the mountain hero
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    shadowColor: '#6D28D9',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  logoutItem: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#fee2e2',
  },
  menuIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 16,
    backgroundColor: '#f3e8ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTextContent: {
    flex: 1,
    paddingLeft: 16,
  },
  menuTitle: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 16,
    color: '#1e1b4b',
  },
  menuSubtitle: {
    fontFamily: 'Inter_400Regular',
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  chevronWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
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