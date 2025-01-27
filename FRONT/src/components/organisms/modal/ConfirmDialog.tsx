import React, {useEffect, useRef} from 'react';

type Props = {
    isOpen: boolean;
    title: string;
    message: string;
    payload: unknown,
    onClose: (pressedButton: string, payload: unknown) => void;
}

const ConfirmDialog: React.FC<Props> = (props) => {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (props.isOpen) {
            openDialog()
        }
    }, [props.isOpen]);

    const openDialog = () => {
        dialogRef.current?.showModal();
    };

    const closeDialog = (pressedButton: string) => {
        dialogRef.current?.close();
        props.onClose(pressedButton, props.payload);
    };

    return (
        <dialog ref={dialogRef} style={{ padding: '20px', borderRadius: '10px' }}>
            <h2>{props.title}</h2>
            <p>{props.message}</p>
            <div style={styles.container}>
                <button onClick={() => closeDialog('yes')}>Yes</button>
                <button onClick={() => closeDialog('no')}>No</button>
            </div>
        </dialog>
    );
};

// Set styles based on the status
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'baseline',
    }
} as const;

export default ConfirmDialog;