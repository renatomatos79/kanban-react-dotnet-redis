// Alert.tsx
import React, { useState } from 'react';

type AlertProps = {
    message: string | null;
    status: 'error' | 'success';
    style?: React.CSSProperties | undefined
};

const Alert: React.FC<AlertProps> = ({ message, status }) => {
    const [visible, setVisible] = useState(true);

    // Function to hide the alert when close button is clicked
    const handleClose = () => {
        setVisible(false);
    };

    if (!visible || !message) return null; // Don't render the alert if it's not visible

    return (
        <div style={status === 'error' ? styles.error : styles.success}>
            <span>{message}</span>
            <button
                onClick={handleClose}
                style={styles.button}
            >
                &times; {/* The close icon */}
            </button>
        </div>
    );
};

// Set styles based on the status
const styles = {
    error: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
    },
    success: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'baseline',
        backgroundColor: 'limegreen',
        color: 'white',
        padding: '8px',
        borderRadius: '5px',
    },
    button: {
        background: 'transparent',
        border: 'none',
        color: 'black',
        fontSize: '16px',
        cursor: 'pointer',
        width: '20px',
    }
} as const;

export default Alert;