import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { ngjyrat } from "../../constants/ngjyrat";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ngjyrat.kryesore,
        tabBarInactiveTintColor: ngjyrat.gri,
        tabBarLabelStyle: { fontSize: 12, fontWeight: "700" },
        tabBarStyle: { backgroundColor: ngjyrat.bardhe, borderTopColor: ngjyrat.kufiri },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Kryefaqja",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="terminet"
        options={{
          title: "Terminet",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="calendar-outline" size={size} color={color as string} />
          ),
        }}
      />
      <Tabs.Screen
        name="pronari"
        options={{
          title: "Pronari",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="storefront-outline" size={size} color={color as string} />
          ),
        }}
      />
    </Tabs>
  );
}