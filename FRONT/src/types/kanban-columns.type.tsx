// Define the type for the column structure
import {TaskInterface} from "./interfaces/task.interface.tsx";

export type KanbanColumnsType = {
    [key: string]: TaskInterface[]; // Key is the column name, value is an array of tasks
};