import React from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";
import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import schema from "./schema";
import Task from "./models/Task";
import { registerRootComponent } from "expo";

const adapter = new SQLiteAdapter({
  schema,
});

const database = new Database({
  adapter,
  modelClasses: [Task],
});

export default function Main() {
  return (
    <Provider store={store}>
      <App database={database} />
    </Provider>
  );
}

registerRootComponent(Main);
