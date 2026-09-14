import React, { useState } from "react";
import {
  Image, View, Text, TextInput, TouchableOpacity,
  KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator, StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { authApi, tokenStore } from "../../lib/api";
import * as SecureStore from "expo-secure-store";

type Role = "user" | "expert";

const PURPLE = "#8B5CF6";
const LAVENDER = "#6D28D9";
const BG = "#F9F5FF";
const CARD_BG = "#FFFFFF";
const BORDER = "#E9D8FD";
const TEXT = "#2D1B4E";
const TEXT_MUTED = "#6B5E80";

export default function SignupScreen() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("user");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) { setError("Please fill all fields"); return; }
    if (password.length < 8) { setError("Password must be at least 8 characters"); return; }
    setError("");
    setLoading(true);
    try {
      if (role === "expert") {
        setError("Expert registration is done via the web portal. Please visit our website.");
        return;
      }
      const today = new Date();
      const defaultDob = new Date(today.getFullYear() - 25, 0, 1).toISOString().split("T")[0];
      const res = await authApi.register({
        name,
        email,
        password,
        dob: defaultDob,
        acceptTerms: true,
        acceptPrivacy: true,
      });
      if (!res.success) { setError(res.message || "Registration failed"); return; }
      if (res.data?.accessToken) {
        await tokenStore.setTokens(res.data.accessToken, res.data.refreshToken);
        await SecureStore.setItemAsync("hc_role", "user");
        router.replace("/(tabs)");
      } else {
        setSuccess("Account created! Please log in.");
        setTimeout(() => router.replace("/(auth)/login"), 1500);
      }
    } catch (e: any) { setError(e?.message || "Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <StatusBar barStyle="dark-content" backgroundColor={BG} />
      <View style={{ position: "absolute", top: -60, right: -60, width: 250, height: 250, borderRadius: 125, backgroundColor: "rgba(124,58,237,0.12)" }} />
      <View style={{ position: "absolute", bottom: 100, left: -40, width: 180, height: 180, borderRadius: 90, backgroundColor: "rgba(79,70,229,0.1)" }} />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", paddingHorizontal: 24, paddingVertical: 40 }} keyboardShouldPersistTaps="handled">
          <View style={{ alignItems: "center", marginBottom: 32 }}>
            <Image source={require("../../assets/images/main_logo.png")} style={{ width: 120, height: 60, resizeMode: "contain", marginBottom: 16 }} />
            <Text style={{ fontSize: 26, fontWeight: "800", color: TEXT, letterSpacing: -0.5 }}>Create account</Text>
            <Text style={{ fontSize: 14, color: TEXT_MUTED, marginTop: 4 }}>Begin your healing journey</Text>
          </View>

          {/* Role Toggle */}
          <View style={{ flexDirection: "row", backgroundColor: CARD_BG, borderRadius: 16, padding: 4, marginBottom: 24, borderWidth: 1, borderColor: BORDER }}>
            {(["user", "expert"] as Role[]).map((r) => (
              <TouchableOpacity key={r} onPress={() => { setRole(r); setError(""); }}
                style={{ flex: 1, paddingVertical: 12, borderRadius: 12, alignItems: "center", backgroundColor: role === r ? PURPLE : "transparent", elevation: role === r ? 6 : 0 }}>
                <Text style={{ fontWeight: "700", fontSize: 14, color: role === r ? "#fff" : TEXT_MUTED }}>
                  {r === "user" ? "👤 User" : "🌟 Expert"}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Error / Success */}
          {error !== "" && (
            <View style={{ backgroundColor: "rgba(239,68,68,0.1)", borderColor: "rgba(239,68,68,0.3)", borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <Text style={{ color: "#DC2626", fontSize: 13, textAlign: "center" }}>{error}</Text>
            </View>
          )}
          {success !== "" && (
            <View style={{ backgroundColor: "rgba(16,185,129,0.1)", borderColor: "rgba(16,185,129,0.3)", borderWidth: 1, borderRadius: 12, padding: 12, marginBottom: 16 }}>
              <Text style={{ color: "#059669", fontSize: 13, textAlign: "center" }}>{success}</Text>
            </View>
          )}

          {/* Fields */}
          <View style={{ gap: 16 }}>
            {[
              { label: "Full Name", placeholder: "Your name", value: name, setter: setName, type: "default", secure: false },
              { label: "Email address", placeholder: "you@example.com", value: email, setter: setEmail, type: "email-address", secure: false },
              { label: "Password (min 8 chars)", placeholder: "••••••••", value: password, setter: setPassword, type: "default", secure: true },
            ].map((field) => (
              <View key={field.label}>
                <Text style={{ fontSize: 13, fontWeight: "600", color: TEXT_MUTED, marginBottom: 8, marginLeft: 4 }}>{field.label}</Text>
                <TextInput
                  placeholder={field.placeholder}
                  placeholderTextColor={TEXT_MUTED}
                  value={field.value}
                  onChangeText={field.setter}
                  keyboardType={field.type as any}
                  autoCapitalize="none"
                  secureTextEntry={field.secure}
                  style={{ backgroundColor: CARD_BG, borderWidth: 1, borderColor: BORDER, borderRadius: 14, paddingHorizontal: 18, height: 56, color: TEXT, fontSize: 15 }}
                />
              </View>
            ))}
            <Text style={{ fontSize: 11, color: TEXT_MUTED, textAlign: "center", lineHeight: 16 }}>
              By creating an account you agree to our Terms of Service and Privacy Policy
            </Text>
            <TouchableOpacity onPress={handleSignup} disabled={loading}
              style={{ backgroundColor: PURPLE, borderRadius: 14, height: 56, alignItems: "center", justifyContent: "center", marginTop: 4, shadowColor: PURPLE, shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 10 }}>
              {loading ? <ActivityIndicator color="white" /> : <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>Create Account →</Text>}
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 28 }}>
            <Text style={{ color: TEXT_MUTED, fontSize: 14 }}>Already have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
              <Text style={{ color: LAVENDER, fontWeight: "700", fontSize: 14 }}>Log in</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}