import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { tokenStore } from '../lib/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL || 'http://10.0.2.2:3000'; 

export default function ExpertDashboardScreen() {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    tokenStore.getAccess().then(t => setToken(t));
  }, []);

  if (!token) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#6D28D9" />
      </View>
    );
  }

  // Inject script to set localStorage BEFORE the web app loads, so it bypasses login!
  const injectedScript = `
    try {
      localStorage.setItem('hc_access', '${token}');
      localStorage.setItem('hc_role', 'expert');
      window.isReactNative = true;
    } catch(e) {}
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#1a1a1a" />
          <Text style={styles.headerTitle}>Expert Dashboard</Text>
        </TouchableOpacity>
      </View>
      <WebView 
        source={{ uri: `${WEB_URL}/dashboard` }}
        style={{ flex: 1 }}
        injectedJavaScriptBeforeContentLoaded={injectedScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  header: {
    height: 56,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    marginLeft: 16,
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a'
  }
});
