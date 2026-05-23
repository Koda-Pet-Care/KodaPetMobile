import { Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: Colors.primary },
        headerTintColor: Colors.white,
        headerTitleStyle: { fontWeight: 'bold' },
        headerBackTitle: 'Voltar',
      }}
    >
      <Stack.Screen name="login" options={{ title: 'Entrar' }} />
      <Stack.Screen name="cadastro" options={{ title: 'Criar Conta' }} />
    </Stack>
  );
}
