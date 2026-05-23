import React from 'react';
import { ScrollView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { SERVICOS } from '@/constants/MockData';

export default function ServicosScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Serviços Pet 🐾</Text>
        <Text style={styles.headerSubtitle}>
          Cuidado completo para o seu melhor amigo
        </Text>
      </View>

      {/* Lista de serviços */}
      <View style={styles.servicesList}>
        {SERVICOS.map((servico) => (
          <TouchableOpacity key={servico.id} style={styles.serviceCard} activeOpacity={0.8}>
            <View style={styles.serviceTop}>
              <View style={styles.serviceEmojiContainer}>
                <Text style={styles.serviceEmoji}>{servico.emoji}</Text>
              </View>
              <View style={styles.serviceInfo}>
                <Text style={styles.serviceName}>{servico.nome}</Text>
                <Text style={styles.servicePrice}>
                  A partir de{' '}
                  <Text style={styles.servicePriceValue}>
                    R$ {servico.preco.toFixed(2)}
                  </Text>
                </Text>
              </View>
            </View>
            <Text style={styles.serviceDescription}>{servico.descricao}</Text>
            <View style={styles.agendarButton}>
              <Text style={styles.agendarButtonText}>Agendar</Text>
            </View>
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
  header: {
    backgroundColor: Colors.primary,
    padding: 22,
    paddingTop: 24,
    paddingBottom: 28,
  },
  headerTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: '#ffffffcc',
    fontSize: 14,
  },
  servicesList: {
    padding: 16,
    gap: 12,
  },
  serviceCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  serviceTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  serviceEmojiContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: Colors.backgroundSecondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  serviceEmoji: {
    fontSize: 28,
  },
  serviceInfo: {
    flex: 1,
  },
  serviceName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 4,
  },
  servicePrice: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  servicePriceValue: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 19,
    marginBottom: 14,
  },
  agendarButton: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
  },
  agendarButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 14,
  },
});
