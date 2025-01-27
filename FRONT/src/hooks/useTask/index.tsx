import { useState} from "react";
import {UseTaskInterface} from "../../types/interfaces/task-hook.interface.tsx";
import {TaskInterface} from "../../types/interfaces/task.interface.tsx";
import {KanbanColumnEnum} from "../../types/enums/kanban-columns.enum.tsx";
import {TaskModel} from "../../types/models/task.model.tsx";
import {
    DEFAULT_REQUEST_HEADER_WITH_TOKEN,
} from "../../constants/access.constants.tsx";
import {useAuth} from "../useAuth";
import axios, {AxiosError} from 'axios';
import {AppSettings} from "../../configs";

export const useTask = (): UseTaskInterface => {
    const appSettings = new AppSettings();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const { login } = useAuth();

    const handleError = (error: AxiosError) => {
        setError(String(error?.response?.data ?? error.message ?? ''));
        setIsLoading(false);
    };

    const validateRequest = () => {
        const result = appSettings.validate()
        if (result.length > 0) {
            setError(result.join(','));
            return false
        }
        return true
    }

    const buildTask = (column: KanbanColumnEnum): TaskInterface => {
        const taskId = crypto.randomUUID();
        return TaskModel.build(taskId, 'New Task', '', column);
    }

    // Fetch all tasks (GET)
    const fetchTasks = async () => {
        setIsLoading(true);
        setError(null);
        let result: TaskInterface[] = []
        try {
            if (!validateRequest()) return [];

            // get a fresh token
            const response = await login()

            // TODO: melhorar o header
            const cardsResponse =
                await axios.get<TaskInterface[]>(`${appSettings.baseURL}/cards`, {
                    headers: {
                      ...DEFAULT_REQUEST_HEADER_WITH_TOKEN(response?.token ?? '')
                    },
                })

            result = cardsResponse?.data ?? [];
        } catch (error) {
            handleError(error as AxiosError);
        } finally {
            setIsLoading(false);
        }
        return result
    };

    // Add a new task (POST)
    const addTask =
        async (payload: Omit<TaskInterface, "id">) => {
            setIsLoading(true);
            setError(null);
            try {
                if (!validateRequest()) return null;

                //const response = await axios.post<Task>(`${baseURL}/tasks`, task);
                const newTask = {
                    ...payload,
                    id: crypto.randomUUID()
                }

                // get a fresh token
                const response = await login()

                // TODO: melhorar o header
                const cardsResponse =
                    await axios.post<TaskInterface>(`${appSettings.baseURL}/cards`,
                        newTask, {
                          headers: {
                            ...DEFAULT_REQUEST_HEADER_WITH_TOKEN(response?.token ?? '')
                          }
                        }
                    )

                return cardsResponse.data
            } catch (error) {
                handleError(error as AxiosError);
            } finally {
                setIsLoading(false);
            }
            return null
        }


    // Update a task (PUT)
    const updateTask =
        async (id: string, payload: Partial<TaskInterface>) => {
            setIsLoading(true);
            setError(null);
            try {
                if (!validateRequest()) return null;

                // get a fresh token
                const response = await login()

                // TODO: melhorar o header
                const cardsResponse =
                    await axios.put<TaskInterface>(`${appSettings.baseURL}/cards/${id}`,
                    payload, {
                        headers: {
                            ...DEFAULT_REQUEST_HEADER_WITH_TOKEN(response?.token ?? '')
                        }
                    })
                return cardsResponse.data

            } catch (error) {
                handleError(error as AxiosError);
            } finally {
                setIsLoading(false);
            }
            return null
        }


    // Delete a task (DELETE)
    const deleteTask =
        async (id: string) => {
            setIsLoading(true);
            setError(null);
            try {
                if (!validateRequest()) return;

                // get a fresh token
                const response = await login()

                // TODO: melhorar o header
                await axios.delete(`${appSettings.baseURL}/cards/${id}`, {
                    headers: {
                        ...DEFAULT_REQUEST_HEADER_WITH_TOKEN(response?.token ?? '')
                    }
                });

            } catch (error) {
                handleError(error as AxiosError);
            } finally {
                setIsLoading(false);
            }
        }

    return { isLoading, error, fetchTasks, buildTask, addTask, updateTask, deleteTask };
};