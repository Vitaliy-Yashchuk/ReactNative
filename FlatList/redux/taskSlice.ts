import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  todo: string;
  date: string;
  priority: "low" | "medium" | "high";
  completed: boolean;
}

interface TaskState {
  items: Task[];
  uncompletedCount: number;
}

const initialState: TaskState = {
  items: [],
  uncompletedCount: 0,
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ todo: string; date: string; priority: string }>) => {
      const newTask: Task = {
        id: Date.now(),
        todo: action.payload.todo,
        date: action.payload.date,
        priority: action.payload.priority as "low" | "medium" | "high",
        completed: false,
      };
      state.items.push(newTask);
      state.uncompletedCount += 1;
    },
    toggleTask: (state, action: PayloadAction<number>) => {
      const task = state.items.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        state.uncompletedCount += task.completed ? -1 : 1;
      }
    },
  },
});

export const { addTask, toggleTask } = taskSlice.actions;
export default taskSlice.reducer;
