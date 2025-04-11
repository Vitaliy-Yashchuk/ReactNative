import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { getHistory } from '../utils/storage';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      const data = await getHistory();
      setHistory(data);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Conversion History</Text>
      <FlatList
        data={history}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <Text>{item.amount} {item.from} → {item.result} {item.to}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, marginBottom: 16 }
});
