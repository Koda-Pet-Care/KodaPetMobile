import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter, useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Usuario } from '@/types';

export const USUARIO_KEY = '@kodapet:usuario';

const MENU_ITEMS = [
  { id: '1', emoji: '📦', label: 'Meus Pedidos' },
  { id: '2', emoji: '🐶', label: 'Meus Pets' },
  { id: '3', emoji: '❤️', label: 'Favoritos' },
  { id: '4', emoji: '📍', label: 'Meus Endereços' },
  { id: '5', emoji: '💳', label: 'Formas de Pagamento' },
  { id: '6', emoji: '🔔', label: 'Notificações' },
  { id: '7', emoji: '⚙️', label: 'Configurações' },
];

export default function PerfilScreen() {
  const router = useRouter();
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  useFocusEffect(
    useCallback(() => {
      carregarUsuario();
    }, [])
  );

  const carregarUsuario = async () => {
    try {
      const data = await AsyncStorage.getItem(USUARIO_KEY);
      setUsuario(data ? JSON.parse(data) : null);
    } catch (error) {
      console.error('Erro ao carregar usuário:', error);
    }
  };

  const deslogar = () => {
    Alert.alert('Sair da conta', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem(USUARIO_KEY);
          setUsuario(null);
        },
      },
    ]);
  };

  if (!usuario) {
    return (
      <View style={styles.guestContainer}>
        <Text style={styles.guestEmoji}>🐾</Text>
        <Text style={styles.guestTitle}>Bem-vindo à KodaPet!</Text>
        <Text style={styles.guestSubtitle}>
          Faça login ou cadastre-se para acessar seu perfil, pedidos e muito mais.
        </Text>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => router.push('/(auth)/login')}
        >
          <Text style={styles.loginButtonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => router.push('/(auth)/cadastro')}
        >
          <Text style={styles.registerButtonText}>Criar conta grátis</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header do perfil */}
      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {usuario.nome.charAt(0).toUpperCase()}
          </Text>
        </View>
        <Text style={styles.userName}>{usuario.nome}</Text>
        <Text style={styles.userEmail}>{usuario.email}</Text>
        {usuario.telefone ? (
          <Text style={styles.userPhone}>{usuario.telefone}</Text>
        ) : null}
      </View>

      {/* Menu */}
      <View style={styles.menuSection}>
        {MENU_ITEMS.map((item, index) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.menuItem,
              index === MENU_ITEMS.length - 1 && styles.menuItemLast,
            ]}
          >
            <Text style={styles.menuEmoji}>{item.emoji}</Text>
            <Text style={styles.menuLabel}>{item.label}</Text>
            <Text style={styles.menuChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={deslogar}>
        <Text style={styles.logoutButtonText}>Sair da conta</Text>
      </TouchableOpacity>

      <View style={{ height: 32 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  guestContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.background,
  },
  guestEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  guestTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
  },
  guestSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 32,
    textAlign: 'center',
    lineHeight: 20,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginBottom: 12,
    width: '100%',
    alignItems: 'center',
  },
  loginButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerButton: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderColor: Colors.primary,
    width: '100%',
    alignItems: 'center',
  },
  registerButtonText: {
    color: Colors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  profileHeader: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
    padding: 28,
    paddingTop: 32,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 13,
    color: '#ffffffcc',
  },
  userPhone: {
    fontSize: 13,
    color: '#ffffffaa',
    marginTop: 2,
  },
  menuSection: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  menuItemLast: {
    borderBottomWidth: 0,
  },
  menuEmoji: {
    fontSize: 20,
    marginRight: 14,
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: Colors.text,
  },
  menuChevron: {
    fontSize: 22,
    color: Colors.textSecondary,
  },
  logoutButton: {
    margin: 16,
    marginTop: 16,
    padding: 15,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: Colors.error,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: Colors.error,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
