import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAsyncStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    load();
  }, [key]);

  const load = async () => {
    try {
      const data = await AsyncStorage.getItem(key);
      if (data !== null) {
        setValue(JSON.parse(data));
      }
    } catch (error) {
      console.error(`Erro ao carregar ${key}:`, error);
    } finally {
      setLoading(false);
    }
  };

  const save = async (newValue: T) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(newValue));
      setValue(newValue);
    } catch (error) {
      console.error(`Erro ao salvar ${key}:`, error);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(defaultValue);
    } catch (error) {
      console.error(`Erro ao remover ${key}:`, error);
    }
  };

  return { value, loading, save, remove };
}
