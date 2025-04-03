export interface Task {
    id?: number;
    title: string;
    date: string;
    priority: "low" | "medium" | "high";
    status?: "to-do" | "done";
  }
  