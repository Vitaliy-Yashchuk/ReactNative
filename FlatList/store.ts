import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./redux/taskSlice";

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

// Оголошуємо RootState, щоб типізувати `useSelector`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
