import { Tabs } from "expo-router";
import { View, Platform, Dimensions } from "react-native";
import { Home, Compass, User, Clock, Bell } from "lucide-react-native";

const PURPLE = "#7C3AED";
const BG = "#F5F3FF";
const INACTIVE = "#9CA3AF";
const { width } = Dimensions.get('window');

function TabIcon({ focused, icon: Icon, color, size }) {
  return (
    <View style={{ alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 24, backgroundColor: focused ? "#EDE9FE" : "transparent" }}>
      <Icon color={focused ? PURPLE : INACTIVE} size={focused ? 22 : 24} strokeWidth={focused ? 2.5 : 2} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: BG }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            position: 'absolute',
            bottom: Platform.OS === 'ios' ? 24 : 16,
            left: 16,
            right: 16,
            backgroundColor: "#FFFFFF",
            borderRadius: 30,
            borderTopWidth: 0,
            height: 64,
            paddingBottom: 0,
            paddingTop: 0,
            shadowColor: "#7C3AED",
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 20,
            elevation: 10,
          },
          tabBarShowLabel: false,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size, focused }) => <TabIcon focused={focused} icon={Home} color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Explore",
            tabBarIcon: ({ color, size, focused }) => <TabIcon focused={focused} icon={Compass} color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: "History",
            tabBarIcon: ({ color, size, focused }) => <TabIcon focused={focused} icon={Clock} color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: "Alerts",
            tabBarIcon: ({ color, size, focused }) => <TabIcon focused={focused} icon={Bell} color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size, focused }) => <TabIcon focused={focused} icon={User} color={color} size={size} />,
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{ href: null }}
        />
      </Tabs>
    </View>
  );
}