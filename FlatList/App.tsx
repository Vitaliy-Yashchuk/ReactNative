import React, { useEffect, useState } from "react";
import { 
  View, Text, FlatList, ActivityIndicator, StyleSheet, 
  TouchableOpacity, Modal, TextInput, Button 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [newTask, setNewTask] = useState("");
  const [newDate, setNewDate] = useState("");
  const [priority, setPriority] = useState("low");

  useEffect(() => {
    fetch("https://dummyjson.com/todos")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.todos.slice(0, 5));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Помилка завантаження:", error);
        setLoading(false);
      });
  }, []);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const addTask = () => {
    if (newTask.trim() !== "" && newDate.trim() !== "") {
      const newTaskObj = {
        id: tasks.length + 1,
        todo: newTask,
        date: newDate,
        priority: priority,
        completed: false,
      };
      setTasks([...tasks, newTaskObj]);
      setNewTask("");
      setNewDate("");
      setPriority("low");
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
      <View style={styles.header}>
        <Text style={styles.title}>ODOT List</Text>
        <Text style={styles.date}>4th March 2018</Text>
      </View>

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
              <View style={{ flex: 1 }}>
                <Text style={[styles.taskText, item.completed && styles.completedText]}>
                  {item.todo}
                </Text>
                <Text style={styles.taskDate}>📅 {item.date || "Без дати"}</Text>
                <Text style={[styles.priority, styles[item.priority || "low"]]}>
                  {item.priority ? item.priority.toUpperCase() : "LOW"}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={30} color="white" />
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Нове завдання</Text>
            <TextInput
              style={styles.input}
              placeholder="Назва завдання"
              value={newTask}
              onChangeText={setNewTask}
            />
            <TextInput
              style={styles.input}
              placeholder="Дата (наприклад, 16.03.2025)"
              value={newDate}
              onChangeText={setNewDate}
            />
            <Picker
              selectedValue={priority}
              onValueChange={(itemValue) => setPriority(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Low" value="low" />
              <Picker.Item label="Medium" value="medium" />
              <Picker.Item label="High" value="high" />
            </Picker>
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
    fontSize: 16,
    marginLeft: 10,
  },
  taskDate: {
    fontSize: 12,
    color: "gray",
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
  picker: {
    width: "100%",
    height: 50,
    marginBottom: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  priority: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },
  low: { color: "green" },
  medium: { color: "orange" },
  high: { color: "red" },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
