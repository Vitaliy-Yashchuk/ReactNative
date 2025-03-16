import React, { useState } from 'react';
import { View, Text, Button, Alert } from 'react-native';

const questions = [
  { text: "Ви часто відчуваєте себе енергійним і активним?", type: "холерик" },
  { text: "Ви спокійні та врівноважені у будь-якій ситуації?", type: "флегматик" },
  { text: "Ви товариська та весела людина?", type: "сангвінік" },
  { text: "Ви часто відчуваєте сум і замислюєтесь над життям?", type: "меланхолік" },
];

export default function App() {
  const [results, setResults] = useState({ сангвінік: 0, меланхолік: 0, холерик: 0, флегматик: 0 });

  const startTest = () => {
    let newResults = { сангвінік: 0, меланхолік: 0, холерик: 0, флегматик: 0 };

    const askQuestion = (index = 0) => {
      if (index < questions.length) {
        Alert.alert(
          "Питання " + (index + 1),
          questions[index].text,
          [
            {
              text: "Так",
              onPress: () => {
                newResults[questions[index].type]++;
                askQuestion(index + 1);
              },
            },
            {
              text: "Ні",
              onPress: () => askQuestion(index + 1),
            },
          ]
        );
      } else {
        // Визначення темпераменту
        const temperament = Object.keys(newResults).reduce((a, b) => (newResults[a] > newResults[b] ? a : b));
        setResults(newResults);
        Alert.alert("Ваш темперамент", `Ви - ${temperament}!`);
      }
    };

    askQuestion();
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>Тест на темперамент</Text>
      <Button title="Старт" onPress={startTest} />
    </View>
  );
}
