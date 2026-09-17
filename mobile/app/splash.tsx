import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import GhostFibers from "../components/GhostFibers";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  
  const logoScale = useSharedValue(0.4);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  useEffect(() => {
    logoOpacity.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) });
    logoScale.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.cubic) });

    textOpacity.value = withDelay(900, withTiming(1, { duration: 1000 }));
    textTranslateY.value = withDelay(900, withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) }));

    setTimeout(() => {
      router.replace("/(auth)/login");
    }, 5500);
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
    transform: [{ translateY: textTranslateY.value }],
  }));

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop" }} 
        style={StyleSheet.absoluteFillObject}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(240,230,245,0.7)', 'rgba(213,182,220,0.8)', 'rgba(95,59,169,0.95)']}
          locations={[0, 0.5, 1]}
          style={StyleSheet.absoluteFillObject}
        />
        
        <View style={StyleSheet.absoluteFillObject}>
          <GhostFibers
            lineColor="#E5D9F2"
            glowColor="#D5B6DC"
            speed={0.15}
            scale={1.8}
            rotation={0}
            rotationSpeed={0.2}
            layers={8}
            waveAmplitude={0.02}
            waveFrequency={3}
            waveSpeed={0.1}
            layerSpeed={0.08}
            twist={0.1}
            twistFrequency={5}
            twistSpeed={1.2}
            lineFrequency={8}
            lineSpacing={1.5}
            lineSharpness={14}
            glowFalloff={10}
            glowIntensity={2}
            brightness={2}
            blueBoost={1.1}
          />
        </View>

        <View style={[styles.content, { paddingTop: insets.top }]}>
          <Animated.View style={logoAnimatedStyle}>
            <Image source={require("../assets/images/main_logo.png")} style={styles.logo} />
          </Animated.View>
          <Animated.Text style={[styles.title, textAnimatedStyle]}>
            ZenAuraa.
          </Animated.Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0E6F5" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", zIndex: 10 },
  logo: { width: 120, height: 120, resizeMode: "contain", marginBottom: 16 },
  title: { fontFamily: 'PlayfairDisplay_700Bold', fontSize: 52, color: "#2d1b69", letterSpacing: 1 },
});