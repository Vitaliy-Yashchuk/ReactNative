import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, ActivityIndicator, StyleSheet, 
  TouchableOpacity, Modal, TextInput, Button 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.todos.slice(0, 5)); // Беремо 5 завдань
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка завантаження:", error);
        setLoading(false);
      });
  }, []);

  // 🟢 Функція для зміни статусу завдання
  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // 🟢 Додати нове завдання
  const addTask = () => {
    if (newTask.trim() !== "") {
      const newTaskObj = {
        id: tasks.length + 1,
        todo: newTask,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      setModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Верхня частина */}
      <View style={styles.header}>
        <Text style={styles.title}>ODOT List</Text>
        <Text style={styles.date}>4th March 2018</Text>
      </View>

      {/* Список завдань */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => toggleTask(item.id)}>
            <View style={styles.taskItem}>
              <Ionicons
                name={item.completed ? "checkmark-circle" : "ellipse-outline"}
                size={24}
                color={item.completed ? "green" : "gray"}
              />
              <Text style={[styles.taskText, item.completed && styles.completedText]}>
                {item.todo}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Кнопка додавання */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      {/* Модальне вікно */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Нове завдання</Text>
            <TextInput
              style={styles.input}
              placeholder="Введіть завдання"
              value={newTask}
              onChangeText={setNewTask}
            />
            <View style={styles.modalButtons}>
              <Button title="Скасувати" onPress={() => setModalVisible(false)} color="red" />
              <Button title="Додати" onPress={addTask} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3E7F1",
    paddingTop: 40,
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  date: {
    fontSize: 16,
    color: "gray",
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginVertical: 5,
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007AFF",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
