import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Text } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import { tokenStore } from '../../lib/api';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';

const WEB_URL = process.env.EXPO_PUBLIC_WEB_URL || 'http://10.0.2.2:3000'; 
// 10.0.2.2 is localhost for Android Emulator. Change in .env for physical device (e.g. your PC IP).

export default function CallScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
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

  const url = `${WEB_URL}/session/${id}`;

  // Inject script to set localStorage BEFORE the web app loads, so it bypasses login!
  const injectedScript = `
    try {
      localStorage.setItem('hc_access', '${token}');
      window.isReactNative = true;
    } catch(e) {}
    true;
  `;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <ArrowLeft size={24} color="#1a1a1a" />
          <Text style={styles.backText}>End & Return</Text>
        </TouchableOpacity>
      </View>
      <WebView 
        source={{ uri: url }}
        style={{ flex: 1 }}
        injectedJavaScriptBeforeContentLoaded={injectedScript}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        originWhitelist={['*']}
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
    height: 50,
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
  backText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#ef4444' // Red to signify ending call
  }
});
