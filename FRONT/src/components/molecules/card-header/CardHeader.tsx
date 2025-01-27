import React, {useState} from 'react';
import {FaEdit} from 'react-icons/fa';
import Heading from "../../atoms/heading/Heading.tsx";

type Props = {
    title: string;
    isEditing: boolean,
    maxLength?: number,
    onButtonClick: () => void;
    onTitleChange: (title: string) => void;
}

const CardHeader: React.FC<Props> = (props) => {
    const [title, setTitle] = useState<string>(props.title);
    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
        props.onTitleChange(title);
    };

    return (
        <div style={styles.container}>
            {!props.isEditing && <Heading tamanho={3} titulo={title} style={styles.heading}></Heading>}
            { props.isEditing && <input type="text" value={title} onChange={handleTitleChange} onBlur={handleTitleChange} maxLength={props.maxLength ?? 30} style={styles.input} />}
            {!props.isEditing && <FaEdit size={20} style={styles.icon} onClick={() => props.onButtonClick()} />}
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
    input: {
        width: '100%',
        marginBottom: 3,
        marginLeft: 1
    },
    heading: {
        flexGrow: 3,
    },
    icon: {
        cursor: 'pointer',
    }
} as const;

export default CardHeader;