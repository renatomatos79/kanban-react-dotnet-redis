import React, {useEffect, useState} from 'react';
import Card from "../../organisms/card/Card.tsx";
import KanbanHeader from "../../molecules/kanban-header/KanbanHeader.tsx";
import { KanbanColumnEnum } from "../../../types/enums/kanban-columns.enum.tsx";
import {TaskInterface} from "../../../types/interfaces/task.interface.tsx";
import {KanbanColumnsType} from "../../../types/kanban-columns.type.ts";
import {useTask} from "../../../hooks/useTask";
import Alert from "../../atoms/alerts/Alert.tsx";
import ConfirmDialog from "../../organisms/modal/ConfirmDialog.tsx";
import Footer from "../../organisms/footer/Footer.tsx";

const Kanban: React.FC = () => {
    const links = [
        { label: "Linkedin", href: "https://www.linkedin.com/in/renatomatos/" },
        { label: "Youtube", href: "https://www.youtube.com/renatomatos79" },
        { label: "Gmail", href: "mailto:renato.matos79@gmail.com" },
        { label: "Github", href: "https://github.com/renatomatos79/kanban-react-dotnet-redis" },
    ];

    const [columns, setColumns] = useState<KanbanColumnsType>({
        [KanbanColumnEnum.New]: [],
        [KanbanColumnEnum.Todo]: [],
        [KanbanColumnEnum.Doing]: [],
        [KanbanColumnEnum.Done]: [],
    });

    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [selectedTask, setSelectedTask] = useState<TaskInterface | null>(null);
    const [kanbanVersion, setKanbanVersion] = useState<number>(0);
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const { error, buildTask, fetchTasks, updateTask, addTask, deleteTask } =
        useTask()

    const loadTasks = async () => {
        setTasks(await fetchTasks());
    }

    useEffect(() => {
        loadTasks();
    }, []);

    // refreshes the board when task list gets updated
    useEffect(() => {
        setColumns({
            [KanbanColumnEnum.New]: [...tasks.filter(f => f.lista === KanbanColumnEnum.New)],
            [KanbanColumnEnum.Todo]: [...tasks.filter(f => f.lista === KanbanColumnEnum.Todo)],
            [KanbanColumnEnum.Doing]: [...tasks.filter(f => f.lista === KanbanColumnEnum.Doing)],
            [KanbanColumnEnum.Done]: [...tasks.filter(f => f.lista === KanbanColumnEnum.Done)],
        })
        setKanbanVersion((prevVersion) => prevVersion + 1)
    }, [tasks])

    const nextColumn = (column: KanbanColumnEnum) => {
        switch (column)
        {
            case KanbanColumnEnum.New: return KanbanColumnEnum.Todo
            case KanbanColumnEnum.Todo: return KanbanColumnEnum.Doing
            default: {
                return KanbanColumnEnum.Done
            }
        }
    }

    const prevColumn = (column: KanbanColumnEnum) => {
        switch (column)
        {
            case KanbanColumnEnum.Done: return KanbanColumnEnum.Doing
            case KanbanColumnEnum.Doing: return KanbanColumnEnum.Todo
            default: {
                return KanbanColumnEnum.New
            }
        }
    }

    const handleDragStart = (
        event: React.DragEvent<HTMLDivElement>,
        task: TaskInterface
    ) => {
        event.dataTransfer.setData('task',JSON.stringify(task));
    };

    const handleSave = async (task: TaskInterface) => {
        const result = await updateTask(task.id, task)
        if (result !== null) {
            await loadTasks()
        }
    }

    const handleCancel = async () => {
        await loadTasks()
    }

    const handleDelete = async (task: TaskInterface) => {
        setSelectedTask(task)
        setIsOpen(true)
    }

    const handleMoveLeft = async (task: TaskInterface) => {
        const newTask = {
            ...task,
            lista: prevColumn(task.lista),
        }
        await updateTask(task.id, newTask)
        await loadTasks()
    }

    const handleMoveRight = async (task: TaskInterface) => {
        const newTask = {
            ...task,
            lista: nextColumn(task.lista),
        }
        await updateTask(task.id, newTask)
        await loadTasks()
    }

    const handleDrop = async (event: React.DragEvent<HTMLDivElement>, toColumn: KanbanColumnEnum) => {
        const task = JSON.parse(event.dataTransfer.getData('task')) as TaskInterface
        if (task.lista !== toColumn) {
            const newTask = {
                ...task,
                lista: toColumn
            }
            await updateTask(task.id, newTask)
            await loadTasks()
        }
    };

    const handleAddTaskButtonClick = async (column: KanbanColumnEnum) => {
        await addTask(buildTask(column))
        await loadTasks()
    }

    const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    // TODO: uar enums para pressedButton
    const handleCloseDialog = async (pressedButton: string, payload: unknown) => {
        if (pressedButton === 'yes') {
            await deleteTask((payload as TaskInterface).id)
            await loadTasks()
        }
        setIsOpen(false)
    }

    return (
        <>
            <ConfirmDialog isOpen={isOpen} payload={selectedTask} title='Atenção' message={`Confirma a exclusão da tarefa "${selectedTask?.titulo}?"`} onClose={handleCloseDialog} />
            <div style={styles.container}>
                <Alert message={error} status='error' style={styles.alert} />
                <div style={styles.board} key={kanbanVersion}>
                    {Object.entries(columns).map(([column, tasks]) => (
                        <div
                            key={column}
                            style={styles.column}
                            onDrop={(event) => handleDrop(event, column as KanbanColumnEnum)}
                            onDragOver={allowDrop}
                        >
                            <KanbanHeader titulo={column} lista={column as KanbanColumnEnum} onButtonClick={handleAddTaskButtonClick} />

                            {tasks.map((task) =>
                                <Card
                                    key={task.id}
                                    task={task}
                                    onDragStart={handleDragStart}
                                    onSave={handleSave}
                                    onCancel={handleCancel}
                                    onDelete={handleDelete}
                                    onMoveLeft={handleMoveLeft}
                                    onMoveRight={handleMoveRight}>
                                </Card>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <Footer links={links} copyright="Renato Matos 2025/01" />
        </>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '100%',

    },
    alert: {
        margin: '25px',
    },
    board: {
        display: 'flex',
        flexDirection: 'row',
        gap: '16px',
        padding: '16px',
        backgroundColor: '#f4f4f9'
    },
    column: {
        flex: 1,
        backgroundColor: '#e0e0e0',
        borderRadius: '8px',
        padding: '8px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        minHeight: '400px',
        minWidth: '250px'
    },
    columnHeader: {
        textAlign: 'center',
        fontWeight: 'bold',
        margin: '0 0 8px',
    }
} as const;

export default Kanban;