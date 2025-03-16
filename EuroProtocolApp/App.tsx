import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Створіть ваші екрани для вкладок
function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Європротокол</Text>
      <Button title="Оформити протокол" onPress={() => alert('Перехід до екрану учасника A')} />
    </View>
  );
}

function ParticipantAScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Дані учасника А</Text>
      <TextInput style={styles.input} placeholder="Ім'я, прізвище" />
      <TextInput style={styles.input} placeholder="Дата народження" />
      <TextInput style={styles.input} placeholder="Телефон" />
      <TextInput style={styles.input} placeholder="Модель авто" />
      <TextInput style={styles.input} placeholder="Номер авто" />
      <Button title="Далі" onPress={() => alert('Перехід до екрану учасника B')} />
    </View>
  );
}

function ParticipantBScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Дані учасника Б</Text>
      <TextInput style={styles.input} placeholder="Ім'я, прізвище" />
      <TextInput style={styles.input} placeholder="Дата народження" />
      <TextInput style={styles.input} placeholder="Телефон" />
      <TextInput style={styles.input} placeholder="Модель авто" />
      <TextInput style={styles.input} placeholder="Номер авто" />
      <Button title="Далі" onPress={() => alert('Перехід до екрану опису пошкодження')} />
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

// Створення вкладок
const Tab = createBottomTabNavigator();

// Створення навігатора вкладок
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ParticipantA"
          component={ParticipantAScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="ParticipantB"
          component={ParticipantBScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-group" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="DamageDescription"
          component={DamageDescriptionScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="car-wrench" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
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
