import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Platform } from 'react-native';
import { Menu, ChevronDown, Bell } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function WebReplicaHeader() {
  const insets = useSafeAreaInsets();
  const router = useRouter();

  return (
    <View style={[styles.headerContainer, { paddingTop: Math.max(insets.top, 16) }]}>
      
      {/* Left: Hamburger Menu */}
      <View style={styles.leftSection}>
        <TouchableOpacity style={styles.iconButton}>
          <Menu size={24} color="#2d1b69" />
        </TouchableOpacity>
      </View>

      {/* Center: Logo */}
      <View style={styles.centerSection}>
        <Image 
          source={require('../assets/images/center_logo_final.png')} 
          style={styles.logoImage} 
        />
        <Text style={styles.logoText}>ZenAuraa</Text>
      </View>

      {/* Right: Actions */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.notificationButton} onPress={() => router.push('/(tabs)/notifications')}>
          <Bell size={20} color="#2d1b69" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.freeInsightsPill}>
          <Text style={styles.freeInsightsText}>Free Insights</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.langSelector}>
          <Text style={styles.langText}>文A</Text>
          <Text style={styles.langCode}>EN</Text>
          <ChevronDown size={14} color="#2d1b69" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(45, 27, 105, 0.1)',
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  iconButton: {
    padding: 4,
  },
  centerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  logoText: {
    fontFamily: 'PlayfairDisplay_700Bold',
    fontSize: 22,
    color: '#2d1b69',
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  notificationButton: {
    padding: 4,
    position: 'relative',
    marginRight: 4,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#F0E6F5',
  },
  freeInsightsPill: {
    backgroundColor: 'rgba(45, 27, 105, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(45, 27, 105, 0.2)',
  },
  freeInsightsText: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 10,
    color: '#2d1b69',
  },
  langSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  langText: {
    fontSize: 10,
    color: '#7C3AED',
    fontWeight: 'bold',
  },
  langCode: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 12,
    color: '#2d1b69',
    marginLeft: 2,
  }
});