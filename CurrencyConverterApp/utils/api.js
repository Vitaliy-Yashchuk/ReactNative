import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getRates = async (base = 'USD') => {
  try {
    const res = await axios.get(`https://api.exchangerate.host/latest?base=${base}`);
    await AsyncStorage.setItem('cachedRates', JSON.stringify(res.data));
    return res.data;
  } catch (err) {
    const cached = await AsyncStorage.getItem('cachedRates');
    return cached ? JSON.parse(cached) : null;
  }
};
