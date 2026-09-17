import '../global.css';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { useColorScheme } from '@/components/useColorScheme';

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

function RootLayoutNav() {
  return (
    <Stack>
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}