import { appSchema, tableSchema } from "@nozbe/watermelondb";

export default appSchema({
  version: 1,
  tables: [
    tableSchema({
      name: "tasks",
      columns: [
        { name: "title", type: "string" },
        { name: "date", type: "string" },
        { name: "priority", type: "string" },
        { name: "completed", type: "boolean" },
      ],
    }),
  ],
});
