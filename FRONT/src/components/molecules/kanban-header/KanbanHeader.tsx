import React from 'react';
import {FaPlusCircle} from 'react-icons/fa';
import Heading from "../../atoms/heading/Heading.tsx";
import {KanbanColumnEnum} from "../../../types/enums/kanban-columns.enum.tsx";

type Props = {
    titulo: string,
    lista: KanbanColumnEnum,
    onButtonClick: (column: KanbanColumnEnum) => void;
}

const KanbanHeader: React.FC<Props> = (props) => {
    return (
        <div style={styles.container}>
            <Heading tamanho={3} titulo={props.titulo} style={styles.heading}></Heading>
            <FaPlusCircle data-testid="btnAdd" size={20} style={styles.icon} onClick={() => props.onButtonClick(props.lista)} />
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
    }
} as const;

export default KanbanHeader;