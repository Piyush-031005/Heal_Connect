import { Tabs } from "expo-router";
import { View, Platform } from "react-native";
import { Home, Compass, MessageCircle, User } from "lucide-react-native";
import { LinearGradient } from "expo-linear-gradient";

const PURPLE = "#7C3AED";
const BG = "#F5F3FF";
const INACTIVE = "#9CA3AF";

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#FFFFFF",
            borderTopWidth: 0,
            height: Platform.OS === "ios" ? 88 : 68,
            paddingBottom: Platform.OS === "ios" ? 28 : 10,
            paddingTop: 10,
            shadowColor: "#7C3AED",
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.12,
            shadowRadius: 16,
            elevation: 16,
          },
          tabBarActiveTintColor: PURPLE,
          tabBarInactiveTintColor: INACTIVE,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: "700",
            marginTop: 2,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                {focused && (
                  <View style={{ position: "absolute", top: -8, width: 28, height: 3, borderRadius: 2, backgroundColor: PURPLE }} />
                )}
                <Home color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                {focused && (
                  <View style={{ position: "absolute", top: -8, width: 28, height: 3, borderRadius: 2, backgroundColor: PURPLE }} />
                )}
                <Compass color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "AI Guide",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                {focused && (
                  <View style={{ position: "absolute", top: -8, width: 28, height: 3, borderRadius: 2, backgroundColor: PURPLE }} />
                )}
                <MessageCircle color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} fill={focused ? PURPLE + "20" : "transparent"} />
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) => (
              <View style={{ alignItems: "center" }}>
                {focused && (
                  <View style={{ position: "absolute", top: -8, width: 28, height: 3, borderRadius: 2, backgroundColor: PURPLE }} />
                )}
                <User color={color} size={size} strokeWidth={focused ? 2.5 : 1.8} />
              </View>
            ),
          }}
        />
      </Tabs>
    </View>
  );
}