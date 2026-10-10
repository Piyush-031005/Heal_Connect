import '../global.css';
import Toast from 'react-native-toast-message';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';

import { LogBox } from 'react-native';
LogBox.ignoreAllLogs(true);
export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'splash',
};

SplashScreen.preventAutoHideAsync();

import { useFonts as usePlayfair, PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display';
import { useFonts as useInter, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { useAuth } from '../hooks/useAuth';

export default function RootLayout() {
  const [loaded, error] = useFonts({ SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf') });
  const [loadedPlayfair, errorPlayfair] = usePlayfair({
    PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold, PlayfairDisplay_700Bold
  });
  const [loadedInter, errorInter] = useInter({
    Inter_400Regular, Inter_600SemiBold
  });

  const { initialize, isInitialized } = useAuth();

  useEffect(() => {
    initialize();
  }, []);

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded && loadedPlayfair && loadedInter && isInitialized) {
      SplashScreen.hideAsync();
    }
  }, [loaded, loadedPlayfair, loadedInter, isInitialized]);

  if (!loaded || !loadedPlayfair || !loadedInter || !isInitialized) {
    return null;
  }

  return <RootLayoutNav />;
}

import { BaseToast, ErrorToast } from 'react-native-toast-message';
import { View, Text, Dimensions } from 'react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const toastConfig = {
  success: (props: any) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#10b981' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 15, fontWeight: '600' }}
    />
  ),
  error: (props: any) => (
    <ErrorToast
      {...props}
      text1Style={{ fontSize: 15, fontWeight: '600' }}
      text2Style={{ fontSize: 13 }}
    />
  ),
  centerError: ({ text1, text2 }: any) => (
    <View style={{
      width: '85%',
      backgroundColor: '#ef4444', // Red background for error
      padding: 30,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: '#ef4444',
      shadowOffset: { width: 0, height: 15 },
      shadowOpacity: 0.4,
      shadowRadius: 30,
      elevation: 15,
    }}>
      <Text style={{ fontSize: 26, fontWeight: '800', color: '#ffffff', marginBottom: 12, textAlign: 'center' }}>{text1}</Text>
      <Text style={{ fontSize: 18, color: '#fecaca', textAlign: 'center', lineHeight: 26 }}>{text2}</Text>
    </View>
  )
};

function RootLayoutNav() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="splash" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
      <Toast config={toastConfig} />
    </>
  );
}