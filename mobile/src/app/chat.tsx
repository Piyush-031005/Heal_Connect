import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/theme';
import { Mic, ArrowLeft } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { useEffect } from 'react';

export default function ChatScreen() {
  const theme = Colors.dark;
  const pulse = useSharedValue(1);

  useEffect(() => {
    pulse.value = withRepeat(
      withTiming(1.05, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedOrbStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulse.value }],
    };
  });

  const suggestions = [
    'How can I reduce anxiety?',
    'What does my dream mean?',
    'Give me a daily affirmation',
    "What's my life purpose?",
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <View style={styles.headerCenter}>
          <Text style={styles.title}>Ask ZenAuraa</Text>
          <Text style={styles.subtitle}>Your AI guide for a calmer, clearer you</Text>
        </View>
      </View>

      <View style={styles.orbContainer}>
        <Animated.View style={[styles.orbOuter, animatedOrbStyle]}>
          <LinearGradient
            colors={['rgba(183,154,230,0.1)', 'rgba(78,205,196,0.1)']}
            style={styles.orbOuterRing}
          >
            <LinearGradient
              colors={['#B79AE6', '#4A2A85', '#1A0B2E']}
              start={{ x: 0.2, y: 0.2 }}
              end={{ x: 0.8, y: 0.8 }}
              style={styles.orbInner}
            >
              {/* Lotus placeholder inside orb */}
              <Text style={{ fontSize: 40 }}>🪷</Text>
            </LinearGradient>
          </LinearGradient>
        </Animated.View>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>What's on your mind today?</Text>
        
        <View style={styles.suggestionsList}>
          {suggestions.map((item, index) => (
            <TouchableOpacity key={index} style={styles.suggestionChip}>
              <Text style={styles.suggestionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.inputContainer}>
        <TextInput 
          style={styles.input}
          placeholder="Type your message..."
          placeholderTextColor={theme.textSecondary}
        />
        <TouchableOpacity style={styles.micButton}>
          <Mic color={theme.background} size={20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: Platform.OS === 'android' ? 40 : 0 },
  header: { alignItems: 'center', paddingHorizontal: 20, paddingVertical: 15 },
  headerCenter: { alignItems: 'center' },
  title: { color: Colors.dark.text, fontSize: 22, fontWeight: 'bold' },
  subtitle: { color: Colors.dark.textSecondary, fontSize: 13, marginTop: 4 },

  orbContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  orbOuter: { width: 220, height: 220, justifyContent: 'center', alignItems: 'center' },
  orbOuterRing: { width: '100%', height: '100%', borderRadius: 110, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: 'rgba(183,154,230,0.3)' },
  orbInner: { width: 140, height: 140, borderRadius: 70, justifyContent: 'center', alignItems: 'center', shadowColor: '#B79AE6', shadowOffset: { width: 0, height: 0 }, shadowOpacity: 0.8, shadowRadius: 30, elevation: 15 },

  content: { paddingHorizontal: 30, paddingBottom: 20, alignItems: 'center' },
  question: { color: Colors.dark.text, fontSize: 18, fontWeight: 'bold', marginBottom: 25 },
  suggestionsList: { width: '100%', gap: 12 },
  suggestionChip: { width: '100%', paddingVertical: 16, paddingHorizontal: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 25, borderWidth: 1, borderColor: Colors.dark.border },
  suggestionText: { color: Colors.dark.text, fontSize: 15, textAlign: 'center' },

  inputContainer: { flexDirection: 'row', alignItems: 'center', marginHorizontal: 20, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 30, paddingLeft: 20, paddingRight: 6, height: 60, borderWidth: 1, borderColor: Colors.dark.border },
  input: { flex: 1, color: Colors.dark.text, fontSize: 16 },
  micButton: { width: 48, height: 48, borderRadius: 24, backgroundColor: Colors.dark.primary, justifyContent: 'center', alignItems: 'center' },
});