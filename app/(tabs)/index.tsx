import React from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { CATEGORIAS, PRODUTOS_DESTAQUE, SERVICOS_DESTAQUE } from '@/constants/MockData';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Banner principal */}
      <View style={styles.banner}>
        <Text style={styles.bannerTag}>🐾 Novidades da semana</Text>
        <Text style={styles.bannerTitle}>Cuide do seu pet{'\n'}com amor e qualidade</Text>
        <Text style={styles.bannerSubtitle}>
          Produtos, serviços e muito carinho para cães e gatos
        </Text>
        <TouchableOpacity
          style={styles.bannerButton}
          onPress={() => router.push('/(tabs)/produtos')}
        >
          <Text style={styles.bannerButtonText}>Ver Ofertas</Text>
        </TouchableOpacity>
      </View>

      {/* Categorias */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Categorias</Text>
        <FlatList
          horizontal
          data={CATEGORIAS}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.categoryCard}
              onPress={() => router.push('/(tabs)/produtos')}
            >
              <Text style={styles.categoryEmoji}>{item.emoji}</Text>
              <Text style={styles.categoryName}>{item.nome}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Produtos em destaque */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Destaques</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/produtos')}>
            <Text style={styles.sectionLink}>Ver todos</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          horizontal
          data={PRODUTOS_DESTAQUE}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 8 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.productCard}
              onPress={() => router.push(`/produto/${item.id}`)}
            >
              <View style={styles.productImagePlaceholder}>
                <Text style={styles.productEmoji}>{item.emoji}</Text>
              </View>
              <Text style={styles.productName} numberOfLines={2}>
                {item.nome}
              </Text>
              <Text style={styles.productBrand}>{item.marca}</Text>
              <Text style={styles.productPrice}>R$ {item.preco.toFixed(2)}</Text>
            </TouchableOpacity>
          )}
        />
      </View>

      {/* Banner de serviços */}
      <View style={styles.serviceBanner}>
        <Text style={styles.serviceBannerTitle}>Serviços para o seu pet</Text>
        <Text style={styles.serviceBannerSubtitle}>
          Banho, hospedagem, veterinário e mais
        </Text>
        <TouchableOpacity
          style={styles.serviceBannerButton}
          onPress={() => router.push('/(tabs)/servicos')}
        >
          <Text style={styles.serviceBannerButtonText}>Agendar agora</Text>
        </TouchableOpacity>
      </View>

      {/* Serviços em destaque */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nossos Serviços</Text>
        {SERVICOS_DESTAQUE.map((servico) => (
          <TouchableOpacity
            key={servico.id}
            style={styles.serviceCard}
            onPress={() => router.push('/(tabs)/servicos')}
          >
            <Text style={styles.serviceEmoji}>{servico.emoji}</Text>
            <View style={styles.serviceInfo}>
              <Text style={styles.serviceName}>{servico.nome}</Text>
              <Text style={styles.serviceDescription} numberOfLines={2}>
                {servico.descricao}
              </Text>
            </View>
            <Text style={styles.serviceChevron}>›</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ height: 24 }} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  banner: {
    backgroundColor: Colors.primary,
    padding: 24,
    paddingTop: 28,
    paddingBottom: 32,
  },
  bannerTag: {
    color: '#ffffffbb',
    fontSize: 12,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  bannerTitle: {
    color: Colors.white,
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    marginBottom: 8,
  },
  bannerSubtitle: {
    color: '#ffffffcc',
    fontSize: 13,
    marginBottom: 20,
    lineHeight: 18,
  },
  bannerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: 22,
    alignSelf: 'flex-start',
  },
  bannerButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  section: {
    padding: 16,
    paddingBottom: 4,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 12,
  },
  sectionLink: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
  },
  categoryCard: {
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 10,
    width: 76,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  categoryEmoji: {
    fontSize: 26,
  },
  categoryName: {
    fontSize: 11,
    color: Colors.text,
    marginTop: 5,
    textAlign: 'center',
    fontWeight: '500',
  },
  productCard: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 148,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  productImagePlaceholder: {
    height: 84,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  productEmoji: {
    fontSize: 36,
  },
  productName: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 2,
    lineHeight: 16,
  },
  productBrand: {
    fontSize: 10,
    color: Colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  productPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.primary,
  },
  serviceBanner: {
    backgroundColor: Colors.primaryLight,
    margin: 16,
    borderRadius: 16,
    padding: 20,
  },
  serviceBannerTitle: {
    color: Colors.white,
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  serviceBannerSubtitle: {
    color: '#ffffffcc',
    fontSize: 13,
    marginBottom: 14,
  },
  serviceBannerButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 18,
    paddingVertical: 9,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  serviceBannerButtonText: {
    color: Colors.primary,
    fontWeight: 'bold',
    fontSize: 13,
  },
  serviceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
    elevation: 2,
  },
  serviceEmoji: {
    fontSize: 30,
    marginRight: 14,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 2,
  },
  serviceDescription: {
    fontSize: 12,
    color: Colors.textSecondary,
    lineHeight: 17,
  },
  serviceChevron: {
    fontSize: 22,
    color: Colors.textSecondary,
    marginLeft: 6,
  },
});
