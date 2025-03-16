import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';

// Створіть ваші екрани

function HomeScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Європротокол</Text>
      <Button title="Оформити протокол" onPress={() => navigation.navigate('ParticipantA')} />
    </View>
  );
}

function ParticipantAScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Дані учасника А</Text>
      <TextInput style={styles.input} placeholder="Ім'я, прізвище" />
      <TextInput style={styles.input} placeholder="Дата народження" />
      <TextInput style={styles.input} placeholder="Телефон" />
      <TextInput style={styles.input} placeholder="Модель авто" />
      <TextInput style={styles.input} placeholder="Номер авто" />
      <Button title="Далі" onPress={() => navigation.navigate('ParticipantB')} />
    </View>
  );
}

function ParticipantBScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Дані учасника Б</Text>
      <TextInput style={styles.input} placeholder="Ім'я, прізвище" />
      <TextInput style={styles.input} placeholder="Дата народження" />
      <TextInput style={styles.input} placeholder="Телефон" />
      <TextInput style={styles.input} placeholder="Модель авто" />
      <TextInput style={styles.input} placeholder="Номер авто" />
      <Button title="Далі" onPress={() => navigation.navigate('DamageDescription')} />
    </View>
  );
}

function DamageDescriptionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вид пошкодження</Text>
      <TextInput style={styles.input} placeholder="Сторона пошкодження" />
      <TextInput style={styles.input} placeholder="Короткий опис" />
      <Button title="Завершити" onPress={() => alert('Протокол оформлено')} />
    </View>
  );
}

// Створення навігатора
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ParticipantA" component={ParticipantAScreen} />
        <Stack.Screen name="ParticipantB" component={ParticipantBScreen} />
        <Stack.Screen name="DamageDescription" component={DamageDescriptionScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
});
