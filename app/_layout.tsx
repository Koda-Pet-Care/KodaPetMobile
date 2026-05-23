import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="produto/[id]"
          options={{ headerShown: true, title: 'Produto', headerBackTitle: 'Voltar' }}
        />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
