import { Stack } from "expo-router";
import { TerminiProvider } from "../context/TerminiContext";

export default function RootLayout() {
  return (
    <TerminiProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="biznes/[id]"
          options={{ title: "Biznesi", headerBackTitle: "Mbrapa" }}
        />
      </Stack>
    </TerminiProvider>
  );
}