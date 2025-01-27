import {KanbanColumnEnum} from "../enums/kanban-columns.enum.tsx";

export interface TaskInterface {
    id: string,
    titulo: string,
    conteudo: string,
    lista: KanbanColumnEnum
}