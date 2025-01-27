import {TaskInterface} from "./task.interface.tsx";
import {KanbanColumnEnum} from "../enums/kanban-columns.enum.tsx";

export interface UseTaskInterface {
    isLoading: boolean;
    error: string | null;
    fetchTasks: () => Promise<TaskInterface[]>;
    buildTask: (column: KanbanColumnEnum) => TaskInterface;
    addTask: (task: Omit<TaskInterface, "id">) => Promise<TaskInterface | null>;
    updateTask: (id: string, updatedTask: Partial<TaskInterface>) => Promise<TaskInterface | null>;
    deleteTask: (id: string) => Promise<void>;
}