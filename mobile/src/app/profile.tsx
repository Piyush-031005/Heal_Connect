import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { Colors } from '@/constants/theme';
import { Settings, Calendar, Heart, Wallet, Bell, HelpCircle, ChevronRight, Crown } from 'lucide-react-native';

export default function ProfileScreen() {
  const theme = Colors.dark;

  const menuItems = [
    { id: 1, title: 'My Appointments', icon: <Calendar color={theme.textSecondary} size={20} /> },
    { id: 2, title: 'Saved Experts', icon: <Heart color={theme.textSecondary} size={20} /> },
    { id: 3, title: 'My Wallet', icon: <Wallet color={theme.textSecondary} size={20} /> },
    { id: 4, title: 'Notifications', icon: <Bell color={theme.textSecondary} size={20} /> },
    { id: 5, title: 'Help & Support', icon: <HelpCircle color={theme.textSecondary} size={20} /> },
    { id: 6, title: 'Settings', icon: <Settings color={theme.textSecondary} size={20} /> },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <Text style={styles.title}>Profile</Text>
        <TouchableOpacity style={styles.settingsIcon}>
          <Settings color={theme.text} size={24} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        
        {/* User Info */}
        <View style={styles.userInfoContainer}>
          <Image 
            source={{ uri: 'https://i.pravatar.cc/150?img=11' }} 
            style={styles.avatar} 
          />
          <Text style={styles.userName}>Piyush</Text>
          <Text style={styles.userEmail}>piyush@example.com</Text>
          
          <View style={styles.premiumBadge}>
            <Crown color={theme.primary} size={16} />
            <Text style={styles.premiumText}>Premium Member</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={item.id} style={[
              styles.menuItem, 
              index === menuItems.length - 1 && { borderBottomWidth: 0 }
            ]}>
              <View style={styles.menuItemLeft}>
                {item.icon}
                <Text style={styles.menuItemText}>{item.title}</Text>
              </View>
              <ChevronRight color={theme.textSecondary} size={20} />
            </TouchableOpacity>
          ))}
        </View>
        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerSpacer: { width: 24 },
  title: { color: Colors.dark.text, fontSize: 18, fontWeight: 'bold' },
  settingsIcon: { padding: 4 },

  scrollContent: { paddingHorizontal: 20 },
  
  userInfoContainer: { alignItems: 'center', marginTop: 20, marginBottom: 40 },
  avatar: { width: 90, height: 90, borderRadius: 45, borderWidth: 2, borderColor: Colors.dark.border, marginBottom: 15 },
  userName: { color: Colors.dark.text, fontSize: 24, fontWeight: 'bold', marginBottom: 4 },
  userEmail: { color: Colors.dark.textSecondary, fontSize: 14, marginBottom: 15 },
  
  premiumBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(250, 208, 88, 0.1)', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, borderWidth: 1, borderColor: 'rgba(250, 208, 88, 0.3)', gap: 8 },
  premiumText: { color: Colors.dark.primary, fontWeight: 'bold', fontSize: 13 },

  menuContainer: { backgroundColor: Colors.dark.backgroundElement, borderRadius: 24, overflow: 'hidden', borderWidth: 1, borderColor: Colors.dark.border },
  menuItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18, paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: Colors.dark.border },
  menuItemLeft: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  menuItemText: { color: Colors.dark.text, fontSize: 16, fontWeight: '500' },
});