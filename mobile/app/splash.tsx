import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withDelay, Easing } from "react-native-reanimated";
import GhostFibers from "../components/GhostFibers";

const { width, height } = Dimensions.get("window");

export default function SplashScreen() {
  const router = useRouter();
  const logoScale = useSharedValue(0.4);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);
  const textTranslateY = useSharedValue(30);

  useEffect(() => {
    // Elegant fade and slight scale up for the logo
    logoOpacity.value = withTiming(1, { duration: 1200, easing: Easing.out(Easing.ease) });
    logoScale.value = withTiming(1, { duration: 1500, easing: Easing.out(Easing.cubic) });

    // Text slides up and fades in after logo
    textOpacity.value = withDelay(900, withTiming(1, { duration: 1000 }));
    textTranslateY.value = withDelay(900, withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) }));

    // Seamlessly move to login
    setTimeout(() => {
      router.replace("/(auth)/login");
    }, 6000);
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
      {/* Premium Dark Cosmic Fibers */}
      <GhostFibers
        lineColor="#885dd1"
        glowColor="#9465c2"
        speed={0.2}
        scale={1.58}
        rotation={-32}
        rotationSpeed={0.25}
        layers={6}
        waveAmplitude={0.015}
        waveFrequency={2}
        waveSpeed={-1.15}
        layerSpeed={-0.04}
        twist={0.1}
        twistFrequency={6.8}
        twistSpeed={1.2}
        lineFrequency={5}
        lineSpacing={2.65}
        lineSharpness={16}
        glowFalloff={10}
        glowIntensity={1.6}
        brightness={2}
        blueBoost={1.25}
      />
      
      <View style={styles.content}>
        <Animated.View style={logoAnimatedStyle}>
          <Image source={require("../assets/images/main_logo.png")} style={styles.logo} />
        </Animated.View>
        <Animated.Text style={[styles.title, textAnimatedStyle]}>
          ZenAuraa
        </Animated.Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0C0514" },
  content: { flex: 1, alignItems: "center", justifyContent: "center", zIndex: 10 },
  
  logo: { width: 140, height: 140, resizeMode: "contain", marginBottom: 20 },
  title: { fontSize: 46, fontWeight: "800", color: "#ffffff", letterSpacing: 2 },
});