import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import CountryFlag from 'react-native-country-flag';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getRates } from '../utils/api';
import { saveHistory } from '../utils/storage';

export default function ConverterScreen({ navigation }) {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState('');
  const [rate, setRate] = useState(null);

  useEffect(() => {
    (async () => {
      const data = await getRates('USD');
      if (data) setRate(data.rates['EUR']);
    })();
  }, []);

  const convert = async () => {
    if (!amount || isNaN(amount)) {
      Alert.alert('Invalid amount');
      return;
    }
    const res = (parseFloat(amount) * rate).toFixed(2);
    setResult(res);
    await saveHistory({ from: 'USD', to: 'EUR', amount, result: res });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Currency Converter</Text>
      <CountryFlag isoCode="us" size={25} />
      <TextInput
        placeholder="Amount in USD"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />
      <Button title="Convert to EUR" onPress={convert} />
      <Text style={styles.result}>Result: {result} EUR</Text>
      <Button title="View History" onPress={() => navigation.navigate('History')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 8, marginVertical: 10 },
  result: { marginTop: 20, fontSize: 20 }
});
