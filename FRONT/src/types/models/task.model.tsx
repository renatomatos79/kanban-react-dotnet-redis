import { KanbanColumnEnum } from "../enums/kanban-columns.enum.tsx";
import {TaskInterface} from "../interfaces/task.interface.tsx";

export class TaskModel implements TaskInterface {
    id: string;
    titulo: string;
    conteudo: string;
    lista: KanbanColumnEnum;
    constructor(payload: Partial<TaskInterface>) {
        this.id = payload.id ?? ''
        this.titulo = payload.titulo ?? ''
        this.conteudo = payload.conteudo ?? ''
        this.lista = payload.lista ?? KanbanColumnEnum.Todo
    }

    static fromString(str: string): TaskInterface
    {
        return JSON.parse(str) as TaskInterface
    }

    static build(id: string, titulo: string, conteudo?: string, lista?: KanbanColumnEnum): TaskInterface {
        return new TaskModel({
            id, titulo, conteudo, lista
        })
    }
}