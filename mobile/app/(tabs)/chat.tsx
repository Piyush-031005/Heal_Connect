import { SafeAreaView } from "react-native-safe-area-context";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Platform,
  ScrollView, KeyboardAvoidingView, ActivityIndicator, StatusBar, Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/Colors";
import { Mic, Send, Sparkles, Bot, User } from "lucide-react-native";
import Animated, {
  useSharedValue, useAnimatedStyle, withRepeat, withTiming,
  Easing, withDelay, withSpring,
} from "react-native-reanimated";
import { useEffect, useState, useRef } from "react";

const { width } = Dimensions.get("window");
const PURPLE = "#7C3AED";
const PURPLE_LIGHT = "#8B5CF6";
const BG = "#F5F3FF";
const TEXT = "#1E1035";
const TEXT_MUTED = "#6B5E80";
const CARD = "#FFFFFF";
const LAVENDER = "#EDE9FE";

type Message = { id: string; role: "user" | "assistant"; text: string; timestamp: Date };

const SUGGESTIONS = [
  "How can I reduce anxiety?",
  "What does my dream mean?",
  "Give me a daily affirmation",
  "What's my life purpose?",
  "Help me meditate",
  "Explain chakra healing",
];

const INTRO_MESSAGES = [
  "Hello! I'm ZenAuraa, your AI guide for holistic wellness. ✨",
  "I can help with mindfulness, meditation, dream interpretation, daily affirmations, and more.",
  "What's on your mind today? You can type anything or choose a suggestion below.",
];

export default function ChatScreen() {
  const theme = Colors.light;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const scrollRef = useRef<ScrollView>(null);

  const pulse = useSharedValue(1);
  const orbOpacity = useSharedValue(0);
  const orbScale = useSharedValue(0.6);
  const ring1 = useSharedValue(0.9);
  const ring2 = useSharedValue(0.85);

  useEffect(() => {
    pulse.value = withRepeat(withTiming(1.08, { duration: 2000, easing: Easing.inOut(Easing.ease) }), -1, true);
    ring1.value = withRepeat(withTiming(1.15, { duration: 2500, easing: Easing.inOut(Easing.ease) }), -1, true);
    ring2.value = withRepeat(withTiming(1.25, { duration: 3000, easing: Easing.inOut(Easing.ease) }), -1, true);
    orbOpacity.value = withTiming(1, { duration: 800 });
    orbScale.value = withSpring(1, { damping: 12, stiffness: 80 });

    // Add intro messages
    let delay = 500;
    INTRO_MESSAGES.forEach((text, i) => {
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { id: `intro-${i}`, role: "assistant", text, timestamp: new Date() },
        ]);
        scrollRef.current?.scrollToEnd({ animated: true });
      }, delay);
      delay += 800;
    });
  }, []);

  const animatedOrb = useAnimatedStyle(() => ({
    transform: [{ scale: pulse.value }],
    opacity: orbOpacity.value,
  }));
  const animatedOrbWrap = useAnimatedStyle(() => ({ transform: [{ scale: orbScale.value }], opacity: orbOpacity.value }));
  const ring1Style = useAnimatedStyle(() => ({ transform: [{ scale: ring1.value }] }));
  const ring2Style = useAnimatedStyle(() => ({ transform: [{ scale: ring2.value }] }));

  const sendMessage = async (text?: string) => {
    const msgText = text || input.trim();
    if (!msgText) return;
    setInput("");
    setShowSuggestions(false);
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: msgText, timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    scrollRef.current?.scrollToEnd({ animated: true });
    setLoading(true);

    // Simulate AI response (replace with actual API when available)
    setTimeout(() => {
      const responses: Record<string, string> = {
        "anxiety": "Take a few deep breaths — inhale for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system instantly. Regular meditation for just 10 minutes daily has been shown to reduce anxiety by up to 30%. Would you like a guided breathing exercise? 🌿",
        "dream": "Dreams are messages from your subconscious mind. Common symbols: water represents emotions, flying means a desire for freedom, falling indicates anxiety. Tell me what you dreamed about and I'll help you interpret it. 🌙",
        "affirmation": "Here is your affirmation for today:\n\n✨ 'I am worthy of love, peace, and abundance. Every day I grow stronger, wiser, and more aligned with my true purpose.'\n\nRepeat this 3 times every morning while looking in the mirror. 💜",
        "purpose": "Your life purpose is found at the intersection of what you love, what you're good at, what the world needs, and what you can be valued for — the Japanese call this 'Ikigai'. Let's explore each area. What activities make you lose track of time? 🌟",
        "meditat": "Let's start with a simple 5-minute meditation:\n\n1. Sit comfortably and close your eyes\n2. Breathe naturally and focus on your breath\n3. When thoughts arise, gently return to your breath\n4. Feel gratitude for this moment\n\nI'll guide you through a longer session if you'd like. 🧘",
        "chakra": "There are 7 main chakras — energy centers in your body:\n\n🔴 Root — Safety & grounding\n🟠 Sacral — Creativity & passion\n🟡 Solar Plexus — Confidence\n💚 Heart — Love & compassion\n💙 Throat — Expression\n🔵 Third Eye — Intuition\n🟣 Crown — Spiritual connection\n\nWhich chakra would you like to explore? ✨",
      };
      const key = Object.keys(responses).find((k) => msgText.toLowerCase().includes(k));
      const reply = key
        ? responses[key]
        : `Thank you for sharing that with me. 💜 Your feelings and questions are valid. I'm here to support your wellness journey. Could you tell me more about what you're experiencing so I can offer you the most helpful guidance?`;
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), role: "assistant", text: reply, timestamp: new Date() }]);
      setLoading(false);
      scrollRef.current?.scrollToEnd({ animated: true });
    }, 1200 + Math.random() * 800);
  };

  const formatTime = (d: Date) => d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>

        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <LinearGradient colors={["#7C3AED","#9333EA"]} style={styles.headerIcon}>
              <Sparkles size={18} color="#fff" />
            </LinearGradient>
            <View>
              <Text style={styles.headerTitle}>ZenAuraa AI</Text>
              <View style={{ flexDirection:"row", alignItems:"center", gap:5 }}>
                <View style={{ width:7, height:7, borderRadius:4, backgroundColor:"#10B981" }} />
                <Text style={styles.headerStatus}>Your wellness guide · Always here</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ORB (shown when no messages from user yet) */}
        {showSuggestions && (
          <View style={styles.orbSection}>
            <Animated.View style={[styles.orbWrap, animatedOrbWrap]}>
              <Animated.View style={[styles.orbRing2, ring2Style]} />
              <Animated.View style={[styles.orbRing1, ring1Style]} />
              <Animated.View style={[styles.orb, animatedOrb]}>
                <LinearGradient colors={["#7C3AED","#9333EA","#C084FC"]} start={{x:0,y:0}} end={{x:1,y:1}} style={styles.orbGradient}>
                  <Sparkles size={32} color="#fff" />
                </LinearGradient>
              </Animated.View>
            </Animated.View>
            <Text style={styles.orbTitle}>Ask me anything</Text>
            <Text style={styles.orbSubtitle}>Your AI guide for a calmer, clearer you</Text>
          </View>
        )}

        {/* MESSAGES */}
        <ScrollView
          ref={scrollRef}
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 16, gap: 12, paddingBottom: 8 }}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => (
            <View key={msg.id} style={[styles.messageRow, msg.role === "user" && styles.messageRowUser]}>
              {msg.role === "assistant" && (
                <LinearGradient colors={["#7C3AED","#9333EA"]} style={styles.avatarBubble}>
                  <Bot size={14} color="#fff" />
                </LinearGradient>
              )}
              <View style={[styles.messageBubble, msg.role === "user" ? styles.messageBubbleUser : styles.messageBubbleAI]}>
                <Text style={[styles.messageText, msg.role === "user" && styles.messageTextUser]}>{msg.text}</Text>
                <Text style={[styles.messageTime, msg.role === "user" && { color:"rgba(255,255,255,0.6)" }]}>{formatTime(msg.timestamp)}</Text>
              </View>
              {msg.role === "user" && (
                <View style={styles.userAvatarBubble}>
                  <User size={14} color="#fff" />
                </View>
              )}
            </View>
          ))}
          {loading && (
            <View style={styles.messageRow}>
              <LinearGradient colors={["#7C3AED","#9333EA"]} style={styles.avatarBubble}>
                <Bot size={14} color="#fff" />
              </LinearGradient>
              <View style={styles.typingBubble}>
                <ActivityIndicator size="small" color={PURPLE} />
                <Text style={{ color: TEXT_MUTED, fontSize: 13, marginLeft: 8 }}>Thinking…</Text>
              </View>
            </View>
          )}
        </ScrollView>

        {/* SUGGESTIONS */}
        {showSuggestions && (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionsRow}>
            {SUGGESTIONS.map((s) => (
              <TouchableOpacity key={s} style={styles.suggestionChip} onPress={() => sendMessage(s)}>
                <Text style={styles.suggestionText}>{s}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* INPUT BAR */}
        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Ask ZenAuraa anything…"
            placeholderTextColor={TEXT_MUTED}
            value={input}
            onChangeText={setInput}
            multiline
            returnKeyType="send"
            onSubmitEditing={() => sendMessage()}
          />
          <TouchableOpacity style={[styles.sendBtn, !input.trim() && styles.sendBtnDisabled]} onPress={() => sendMessage()} disabled={!input.trim()}>
            <LinearGradient colors={input.trim() ? ["#7C3AED","#9333EA"] : ["#E5E7EB","#E5E7EB"]} style={styles.sendBtnGrad}>
              <Send size={18} color={input.trim() ? "#fff" : TEXT_MUTED} />
            </LinearGradient>
          </TouchableOpacity>
        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection:"row", justifyContent:"space-between", alignItems:"center", paddingHorizontal:16, paddingVertical:12, borderBottomWidth:1, borderBottomColor:"rgba(124,58,237,0.08)" },
  headerLeft: { flexDirection:"row", alignItems:"center", gap:12 },
  headerIcon: { width:38, height:38, borderRadius:12, alignItems:"center", justifyContent:"center" },
  headerTitle: { fontSize:17, fontWeight:"800", color:TEXT },
  headerStatus: { fontSize:11, color:"#10B981", fontWeight:"600" },
  orbSection: { alignItems:"center", paddingVertical:24 },
  orbWrap: { position:"relative", width:120, height:120, alignItems:"center", justifyContent:"center", marginBottom:16 },
  orbRing2: { position:"absolute", width:120, height:120, borderRadius:60, borderWidth:1.5, borderColor:"rgba(124,58,237,0.1)" },
  orbRing1: { position:"absolute", width:90, height:90, borderRadius:45, borderWidth:1.5, borderColor:"rgba(124,58,237,0.2)" },
  orb: { width:68, height:68, borderRadius:34, shadowColor:PURPLE, shadowOffset:{width:0,height:8}, shadowOpacity:0.5, shadowRadius:20, elevation:12 },
  orbGradient: { width:68, height:68, borderRadius:34, alignItems:"center", justifyContent:"center" },
  orbTitle: { fontSize:20, fontWeight:"800", color:TEXT, marginBottom:4 },
  orbSubtitle: { fontSize:13, color:TEXT_MUTED },
  messageRow: { flexDirection:"row", alignItems:"flex-end", gap:8 },
  messageRowUser: { justifyContent:"flex-end" },
  avatarBubble: { width:28, height:28, borderRadius:14, alignItems:"center", justifyContent:"center", flexShrink:0 },
  userAvatarBubble: { width:28, height:28, borderRadius:14, backgroundColor:PURPLE, alignItems:"center", justifyContent:"center", flexShrink:0 },
  messageBubble: { maxWidth:width*0.72, borderRadius:18, padding:12, paddingHorizontal:14 },
  messageBubbleAI: { backgroundColor:CARD, borderBottomLeftRadius:4, shadowColor:"#7C3AED", shadowOffset:{width:0,height:2}, shadowOpacity:0.06, shadowRadius:8, elevation:2, borderWidth:1, borderColor:"rgba(124,58,237,0.06)" },
  messageBubbleUser: { backgroundColor:PURPLE, borderBottomRightRadius:4 },
  messageText: { fontSize:14, color:TEXT, lineHeight:21 },
  messageTextUser: { color:"#fff" },
  messageTime: { fontSize:10, color:TEXT_MUTED, marginTop:4, textAlign:"right" },
  typingBubble: { flexDirection:"row", alignItems:"center", backgroundColor:CARD, borderRadius:18, padding:12, borderBottomLeftRadius:4, borderWidth:1, borderColor:"rgba(124,58,237,0.06)" },
  suggestionsRow: { paddingHorizontal:16, paddingVertical:10, gap:8 },
  suggestionChip: { backgroundColor:CARD, borderRadius:20, paddingHorizontal:14, paddingVertical:8, borderWidth:1, borderColor:LAVENDER },
  suggestionText: { fontSize:13, color:PURPLE, fontWeight:"600" },
  inputBar: { flexDirection:"row", alignItems:"flex-end", paddingHorizontal:16, paddingVertical:10, borderTopWidth:1, borderTopColor:"rgba(124,58,237,0.08)", gap:10, backgroundColor:BG },
  input: { flex:1, backgroundColor:CARD, borderRadius:20, paddingHorizontal:16, paddingVertical:Platform.OS==="ios"?12:8, fontSize:14, color:TEXT, maxHeight:100, borderWidth:1, borderColor:LAVENDER },
  sendBtn: { width:44, height:44, borderRadius:22, overflow:"hidden" },
  sendBtnDisabled: { opacity:0.5 },
  sendBtnGrad: { width:44, height:44, alignItems:"center", justifyContent:"center" },
});