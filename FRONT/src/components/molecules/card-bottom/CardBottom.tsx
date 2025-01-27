import React from 'react';
import {FaTrash} from 'react-icons/fa';
import { FaArrowCircleRight } from 'react-icons/fa';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { TbCancel } from 'react-icons/tb';
import { FaSave } from 'react-icons/fa';
import {TaskInterface} from "../../../types/interfaces/task.interface.tsx";
import {KanbanColumnEnum} from "../../../types/enums/kanban-columns.enum.tsx";

type Props = {
    task: TaskInterface;
    isEditing: boolean;
    onButtonClick: (task: TaskInterface, btnType: string) => void;
}

const CardBottom: React.FC<Props> = (props) => {
    const isFirstColumn = props.task.lista === KanbanColumnEnum.New;
    const isLastColumn = props.task.lista === KanbanColumnEnum.Done;

    const handleLeftButtonClick = () => {
        if (!isFirstColumn) props.onButtonClick(props.task, 'left')
    }

    const handleRightButtonClick = () => {
        if (!isLastColumn) props.onButtonClick(props.task, 'right')
    }

    const navContainer = () => {
        return (
            <>
                <FaArrowCircleLeft size={20} style={isFirstColumn ? styles.iconDisabled : styles.icon}  onClick={() => handleLeftButtonClick()} />
                <FaTrash size={20} style={styles.icon} onClick={() => props.onButtonClick(props.task, 'delete')} />
                <FaArrowCircleRight size={20} style={isLastColumn ? styles.iconDisabled : styles.icon} onClick={() => handleRightButtonClick()} />
            </>
        )
    }

    const editContainer = () => {
        return (
            <>
                <TbCancel size={20} style={styles.icon} onClick={() => props.onButtonClick(props.task, 'cancel')} />
                <FaSave size={20} style={styles.icon} onClick={() => props.onButtonClick(props.task, 'save')} />
            </>
        )
    }

    return (
        <div style={styles.container}>
            { props.isEditing ? editContainer() : navContainer() }
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    heading: {
        flexGrow: 3,
    },
    icon: {
        cursor: 'pointer',
    },
    iconDisabled: {
        cursor: 'not-allowed',
        disabled: 'disabled',
    }
} as const;

export default CardBottom;