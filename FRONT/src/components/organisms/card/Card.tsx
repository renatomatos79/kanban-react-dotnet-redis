import React, {DragEvent, useState} from 'react';
import CardHeader from "../../molecules/card-header/CardHeader.tsx";
import CardBottom from "../../molecules/card-bottom/CardBottom.tsx";
import {TaskInterface} from "../../../types/interfaces/task.interface.tsx";
import CardContent from "../../molecules/card-content/CardContent.tsx";

type DragCardEventHandler = (
    event: DragEvent<HTMLDivElement>,
    task: TaskInterface,
) => void;

type Props = {
    task: TaskInterface,
    onDragStart: DragCardEventHandler,
    onSave: (task: TaskInterface) => void,
    onCancel: () => void,
    onDelete: (task: TaskInterface) => void,
    onMoveLeft: (task: TaskInterface) => void,
    onMoveRight: (task: TaskInterface) => void,
    style?: React.CSSProperties | undefined
}

const Card: React.FC<Props> = ( props ) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(props.task.titulo);
    const [content, setContent] = useState(props.task.conteudo);

    const handleEditButton = () => {
        setIsEditing(true);
        // restore original values
        setTitle(props.task.titulo);
        setContent(props.task.conteudo);
    }

    const handleTitleChange = (text: string) => {
        setTitle(text);
    }

    const handleContentChange = (text: string) => {
        setContent(text);
    }

    const handleBottomButtonClick = (task: TaskInterface, btnType: string) => {
        if (btnType === 'cancel' ) {
            // restore original values: title and body
            setTitle(props.task.titulo);
            setContent(props.task.conteudo);
            props.onCancel();
        }

        if (btnType === 'save' ) {
            const newTask = {...props.task, titulo: title, conteudo: content};
            props.onSave(newTask);
        }

        if (btnType === 'delete' ) {
            props.onDelete(task);
        }

        if (btnType === 'left' ) {
            props.onMoveLeft(task)
        }

        if (btnType === 'right' ) {
            props.onMoveRight(task)
        }

        setIsEditing(false);
    }

    return (
            <div
                key={props.task.id}
                style={props.style ?? styles.card}
                draggable={!isEditing} // Remove draggable when isEditing is true
                onDragStart={(event) => props.onDragStart(event, props.task)}
            >
                <CardHeader
                    title={title}
                    isEditing={isEditing}
                    onButtonClick={handleEditButton}
                    onTitleChange={handleTitleChange}
                ></CardHeader>
                <CardContent content={content} readOnly={!isEditing} onChange={handleContentChange} />
                <CardBottom task={props.task} isEditing={isEditing} onButtonClick={handleBottomButtonClick}/>
            </div>

    );
};

const styles = {
    card: {
        backgroundColor: '#fff',
        padding: '8px',
        borderRadius: '4px',
        boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)',
        cursor: 'grab'
    }
} as const

export default Card;