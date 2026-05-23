import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { PRODUTOS, CATEGORIAS } from '@/constants/MockData';

export default function ProdutosScreen() {
  const router = useRouter();
  const [busca, setBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('todos');

  const produtosFiltrados = PRODUTOS.filter((p) => {
    const matchBusca = p.nome.toLowerCase().includes(busca.toLowerCase());
    const matchCategoria =
      categoriaSelecionada === 'todos' || p.categoria === categoriaSelecionada;
    return matchBusca && matchCategoria;
  });

  const filtros = [{ id: 'todos', nome: 'Todos', emoji: '🐾' }, ...CATEGORIAS];

  return (
    <View style={styles.container}>
      {/* Barra de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="🔍  Buscar produtos..."
          value={busca}
          onChangeText={setBusca}
          placeholderTextColor={Colors.textSecondary}
        />
      </View>

      {/* Filtro de categorias */}
      <FlatList
        horizontal
        data={filtros}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.filterChip,
              categoriaSelecionada === item.id && styles.filterChipActive,
            ]}
            onPress={() => setCategoriaSelecionada(item.id)}
          >
            <Text
              style={[
                styles.filterChipText,
                categoriaSelecionada === item.id && styles.filterChipTextActive,
              ]}
            >
              {item.nome}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Lista de produtos */}
      <FlatList
        data={produtosFiltrados}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productCard}
            onPress={() => router.push(`/produto/${item.id}`)}
          >
            <View style={styles.productImagePlaceholder}>
              <Text style={styles.productEmoji}>{item.emoji}</Text>
            </View>
            <Text style={styles.productBrand}>{item.marca}</Text>
            <Text style={styles.productName} numberOfLines={2}>
              {item.nome}
            </Text>
            <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🔍</Text>
            <Text style={styles.emptyText}>Nenhum produto encontrado</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  searchContainer: {
    padding: 16,
    paddingBottom: 8,
  },
  searchInput: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 11,
    fontSize: 14,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterList: {
    paddingVertical: 8,
    maxHeight: 52,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    backgroundColor: Colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  filterChipText: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  productList: {
    padding: 12,
    paddingBottom: 24,
  },
  productCard: {
    flex: 1,
    backgroundColor: Colors.white,
    borderRadius: 12,
    margin: 6,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  productImagePlaceholder: {
    height: 90,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productEmoji: {
    fontSize: 40,
  },
  productBrand: {
    fontSize: 10,
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
    marginBottom: 2,
  },
  productName: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 6,
    lineHeight: 16,
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    color: Colors.textSecondary,
    fontSize: 15,
  },
});
