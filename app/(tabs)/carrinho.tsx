import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { CarrinhoItem } from '@/types';

export const CARRINHO_KEY = '@kodapet:carrinho';

export default function CarrinhoScreen() {
  const [itens, setItens] = useState<CarrinhoItem[]>([]);

  // Recarrega o carrinho sempre que a tela ganhar foco
  useFocusEffect(
    useCallback(() => {
      carregarCarrinho();
    }, [])
  );

  const carregarCarrinho = async () => {
    try {
      const data = await AsyncStorage.getItem(CARRINHO_KEY);
      if (data) {
        setItens(JSON.parse(data));
      } else {
        setItens([]);
      }
    } catch (error) {
      console.error('Erro ao carregar carrinho:', error);
    }
  };

  const salvarCarrinho = async (novosItens: CarrinhoItem[]) => {
    try {
      await AsyncStorage.setItem(CARRINHO_KEY, JSON.stringify(novosItens));
      setItens(novosItens);
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  };

  const alterarQuantidade = (id: string, delta: number) => {
    const novosItens = itens
      .map((item) =>
        item.id === id ? { ...item, quantidade: item.quantidade + delta } : item
      )
      .filter((item) => item.quantidade > 0);
    salvarCarrinho(novosItens);
  };

  const removerItem = (id: string) => {
    const novosItens = itens.filter((item) => item.id !== id);
    salvarCarrinho(novosItens);
  };

  const limparCarrinho = async () => {
    await AsyncStorage.removeItem(CARRINHO_KEY);
    setItens([]);
  };

  const finalizarPedido = () => {
    Alert.alert(
      'Pedido Confirmado! 🐾',
      `Seu pedido de R$ ${total.toFixed(2)} foi realizado com sucesso!`,
      [{ text: 'OK', onPress: limparCarrinho }]
    );
  };

  const total = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  if (itens.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🛒</Text>
        <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
        <Text style={styles.emptySubtitle}>
          Adicione produtos para continuar comprando
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View style={styles.itemCard}>
            <View style={styles.itemImageContainer}>
              <Text style={styles.itemEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemName} numberOfLines={2}>
                {item.nome}
              </Text>
              <Text style={styles.itemPrice}>R$ {item.preco.toFixed(2)}</Text>
            </View>
            <View style={styles.itemActions}>
              <View style={styles.quantityControl}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => alterarQuantidade(item.id, -1)}
                >
                  <Text style={styles.qtyButtonText}>−</Text>
                </TouchableOpacity>
                <Text style={styles.qtyText}>{item.quantidade}</Text>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => alterarQuantidade(item.id, 1)}
                >
                  <Text style={styles.qtyButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => removerItem(item.id)}>
                <Text style={styles.removeText}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total ({itens.length} {itens.length === 1 ? 'item' : 'itens'})</Text>
          <Text style={styles.totalValue}>R$ {total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={finalizarPedido}>
          <Text style={styles.checkoutButtonText}>Finalizar Pedido</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: Colors.background,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  list: {
    padding: 16,
    paddingBottom: 8,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 14,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImageContainer: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  itemEmoji: {
    fontSize: 28,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 13,
    color: Colors.text,
    marginBottom: 4,
    lineHeight: 17,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  itemActions: {
    alignItems: 'flex-end',
    gap: 6,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 20,
  },
  qtyText: {
    fontSize: 15,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: Colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
  removeText: {
    fontSize: 11,
    color: Colors.error,
  },
  footer: {
    backgroundColor: Colors.white,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  totalLabel: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  checkoutButton: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
