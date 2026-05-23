import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';

const USUARIO_KEY = '@kodapet:usuario';

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  senha: string;
  confirmarSenha: string;
}

export default function CadastroScreen() {
  const router = useRouter();
  const [form, setForm] = useState<FormState>({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
    confirmarSenha: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCadastro = async () => {
    if (!form.nome.trim() || !form.email.trim() || !form.senha || !form.confirmarSenha) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos marcados com *.');
      return;
    }
    if (form.senha.length < 6) {
      Alert.alert('Senha fraca', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (form.senha !== form.confirmarSenha) {
      Alert.alert('Senhas diferentes', 'As senhas não conferem. Verifique e tente novamente.');
      return;
    }

    setLoading(true);
    try {
      const usuario = {
        nome: form.nome.trim(),
        email: form.email.trim().toLowerCase(),
        telefone: form.telefone.trim(),
      };
      await AsyncStorage.setItem(USUARIO_KEY, JSON.stringify(usuario));
      Alert.alert('Conta criada! 🐾', `Bem-vindo(a), ${usuario.nome}!`, [
        { text: 'Continuar', onPress: () => router.replace('/(tabs)/perfil') },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível criar a conta. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>Criar Conta</Text>
        <Text style={styles.subtitle}>Junte-se à família KodaPet 🐾</Text>

        <View style={styles.form}>
          <Text style={styles.label}>Nome completo *</Text>
          <TextInput
            style={styles.input}
            placeholder="Seu nome"
            value={form.nome}
            onChangeText={(v) => handleChange('nome', v)}
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>E-mail *</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            value={form.email}
            onChangeText={(v) => handleChange('email', v)}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Telefone</Text>
          <TextInput
            style={styles.input}
            placeholder="(00) 00000-0000"
            value={form.telefone}
            onChangeText={(v) => handleChange('telefone', v)}
            keyboardType="phone-pad"
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Senha * (mín. 6 caracteres)</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            value={form.senha}
            onChangeText={(v) => handleChange('senha', v)}
            secureTextEntry
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Confirmar senha *</Text>
          <TextInput
            style={styles.input}
            placeholder="Repita a senha"
            value={form.confirmarSenha}
            onChangeText={(v) => handleChange('confirmarSenha', v)}
            secureTextEntry
            placeholderTextColor={Colors.textSecondary}
          />

          {/* Preview em tempo real — demonstra manipulação de estado */}
          {form.nome.length > 0 && (
            <View style={styles.preview}>
              <Text style={styles.previewTitle}>Preview do seu perfil</Text>
              <Text style={styles.previewItem}>👤  {form.nome}</Text>
              {form.email.length > 0 && (
                <Text style={styles.previewItem}>📧  {form.email}</Text>
              )}
              {form.telefone.length > 0 && (
                <Text style={styles.previewItem}>📱  {form.telefone}</Text>
              )}
            </View>
          )}

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.buttonDisabled]}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Criando conta...' : 'Criar Conta'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Já tem conta? </Text>
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.footerLink}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 24,
    paddingTop: 12,
    paddingBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 24,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 7,
    marginTop: 14,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1.5,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 13,
    fontSize: 15,
    color: Colors.text,
  },
  preview: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 14,
    marginTop: 18,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  previewTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  previewItem: {
    fontSize: 14,
    color: Colors.text,
    marginBottom: 3,
  },
  registerButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 22,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  registerButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerText: {
    color: Colors.textSecondary,
    fontSize: 14,
  },
  footerLink: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: 'bold',
  },
});
