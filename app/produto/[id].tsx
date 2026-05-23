import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { PRODUTOS } from '@/constants/MockData';

const CARRINHO_KEY = '@kodapet:carrinho';

export default function ProdutoDetalheScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [quantidade, setQuantidade] = useState(1);

  const produto = PRODUTOS.find((p) => p.id === id);

  if (!produto) {
    return (
      <View style={styles.notFound}>
        <Text style={styles.notFoundEmoji}>😕</Text>
        <Text style={styles.notFoundText}>Produto não encontrado</Text>
      </View>
    );
  }

  const adicionarAoCarrinho = async () => {
    try {
      const data = await AsyncStorage.getItem(CARRINHO_KEY);
      const carrinho = data ? JSON.parse(data) : [];
      const itemExistente = carrinho.find((item: { id: string }) => item.id === produto.id);

      if (itemExistente) {
        itemExistente.quantidade += quantidade;
      } else {
        carrinho.push({ ...produto, quantidade });
      }

      await AsyncStorage.setItem(CARRINHO_KEY, JSON.stringify(carrinho));
      Alert.alert('Adicionado! 🛒', `${produto.nome} foi adicionado ao carrinho.`, [
        { text: 'Continuar comprando', style: 'cancel' },
        { text: 'Ver Carrinho', onPress: () => router.push('/(tabs)/carrinho') },
      ]);
    } catch {
      Alert.alert('Erro', 'Não foi possível adicionar ao carrinho.');
    }
  };

  const subtotal = produto.preco * quantidade;

  return (
    <>
      <Stack.Screen options={{ title: produto.nome.slice(0, 24) + '...' }} />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Imagem / placeholder */}
        <View style={styles.imageContainer}>
          <Text style={styles.productEmoji}>{produto.emoji}</Text>
        </View>

        <View style={styles.content}>
          {/* Info */}
          <Text style={styles.brand}>{produto.marca}</Text>
          <Text style={styles.name}>{produto.nome}</Text>
          <Text style={styles.price}>R$ {produto.preco.toFixed(2)}</Text>

          <View style={styles.divider} />

          {/* Descrição */}
          <Text style={styles.sectionLabel}>Descrição</Text>
          <Text style={styles.description}>{produto.descricao}</Text>

          <View style={styles.divider} />

          {/* Seletor de quantidade */}
          <Text style={styles.sectionLabel}>Quantidade</Text>
          <View style={styles.quantityRow}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantidade((q) => Math.max(1, q - 1))}
            >
              <Text style={styles.qtyButtonText}>−</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantidade}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => setQuantidade((q) => q + 1)}
            >
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          {/* Subtotal */}
          <View style={styles.subtotalRow}>
            <Text style={styles.subtotalLabel}>Subtotal</Text>
            <Text style={styles.subtotalValue}>R$ {subtotal.toFixed(2)}</Text>
          </View>

          {/* Botão */}
          <TouchableOpacity style={styles.addButton} onPress={adicionarAoCarrinho}>
            <Text style={styles.addButtonText}>Adicionar ao Carrinho 🛒</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  notFound: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
  },
  notFoundEmoji: {
    fontSize: 48,
    marginBottom: 12,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  imageContainer: {
    backgroundColor: Colors.backgroundSecondary,
    height: 240,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productEmoji: {
    fontSize: 90,
  },
  content: {
    padding: 20,
  },
  brand: {
    fontSize: 12,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 4,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 10,
    lineHeight: 26,
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 18,
  },
  sectionLabel: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 24,
  },
  qtyText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20,
    color: Colors.text,
    minWidth: 24,
    textAlign: 'center',
  },
  subtotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  subtotalLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  subtotalValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
