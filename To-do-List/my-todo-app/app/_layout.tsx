import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, TextInput } from "react-native";
import * as SQLite from "expo-sqlite";
import { Provider, useDispatch, useSelector } from "react-redux";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useForm, Controller } from "react-hook-form";
import * as Notifications from "expo-notifications";
import type { Task } from "../types";

const db = SQLite.openDatabaseSync("tasks.db");

const initializeDB = async () => {
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      date TEXT NOT NULL,
      priority TEXT NOT NULL,
      status TEXT NOT NULL
    );
  `);
};

const todoSlice = createSlice({
  name: "todos",
  initialState: { incompleteCount: 0 },
  reducers: {
    setIncompleteCount: (state, action) => {
      state.incompleteCount = action.payload;
    },
  },
});

const { setIncompleteCount } = todoSlice.actions;
const store = configureStore({ reducer: { todos: todoSlice.reducer } });

const fetchTodos = async (setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  try {
    const response = await fetch("https://dummyjson.com/todos");
    const data = await response.json();
    setTasks(data.todos);
  } catch (error) {
    console.error(error);
  }
};

const getLocalTasks = async (setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  try {
    const result = await db.getAllAsync("SELECT * FROM tasks");
    setTasks(result as Task[]);
  } catch (error) {
    console.error(error);
  }
};

const addTaskToDB = async (task: Task, setTasks: React.Dispatch<React.SetStateAction<Task[]>>) => {
  try {
    await db.runAsync("INSERT INTO tasks (title, date, priority, status) VALUES (?, ?, ?, ?)", [
      task.title,
      task.date,
      task.priority,
      "to-do",
    ]);
    getLocalTasks(setTasks);
  } catch (error) {
    console.error(error);
  }
};

const scheduleNotification = async (task: Task) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Task Reminder",
      body: `${task.title} is due!`,
    },
    trigger: { seconds: 5, repeats: false },
  });
};

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    initializeDB();
    fetchTodos(setTasks);
    getLocalTasks(setTasks);
  }, []);

  useEffect(() => {
    const incompleteCount = tasks.filter((task) => task.status !== "done").length;
    dispatch(setIncompleteCount(incompleteCount));
  }, [tasks, dispatch]);

  return (
    <FlatList
      data={tasks}
      keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
      renderItem={({ item }) => (
        <View style={{ padding: 10, borderBottomWidth: 1 }}>
          <Text>{item.title}</Text>
          <Text>{item.date}</Text>
          <Text>{item.priority}</Text>
        </View>
      )}
    />
  );
};

const AddTaskForm = ({ setTasks }: { setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) => {
  const { control, handleSubmit, reset } = useForm<Task>();

  const onSubmit = async (data: Task) => {
    await addTaskToDB(data, setTasks);
    await scheduleNotification(data);
    reset();
  };

  return (
    <View>
      <Controller
        control={control}
        name="title"
        rules={{ required: "Title is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput value={value} onChangeText={onChange} placeholder="Task Title" />
        )}
      />
      <Controller
        control={control}
        name="date"
        rules={{ required: "Date is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput value={value} onChangeText={onChange} placeholder="Date (YYYY-MM-DD)" />
        )}
      />
      <Controller
        control={control}
        name="priority"
        rules={{ required: "Priority is required" }}
        render={({ field: { onChange, value } }) => (
          <TextInput value={value} onChangeText={onChange} placeholder="Priority (low, medium, high)" />
        )}
      />
      <TouchableOpacity onPress={handleSubmit(onSubmit)}>
        <Text>Add Task</Text>
      </TouchableOpacity>
    </View>
  );
};

export default function Layout() {
  const [tasks, setTasks] = useState<Task[]>([]);

  return (
    <Provider store={store}>
      <View style={{ flex: 1, padding: 20 }}>
        <TaskList />
        <AddTaskForm setTasks={setTasks} />
      </View>
    </Provider>
  );
}
