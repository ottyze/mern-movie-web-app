import React, { useState, useEffect} from 'react';

function CookieBanner(){
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        const cookiesAccepted = localStorage.getItem('cookiesAccepted');
        if (!cookiesAccepted) {
            setIsVisible(true);
        }
    }, []);

    const onCookieAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setIsVisible(false);
    };
    const onLeavePage = () => {
        window.location.href = 'https://www.google.com';
    };

    if (!isVisible) return null;

    return (
        <div style={styles.banner}>
            <p style={styles.text}>
                This app uses cookies to facilitate login and other core features.
            </p>
            <div style={styles.buttonContainer}>

                <button style={styles.acceptButton} onClick={onCookieAccept}>
                    Accept
                </button>
                <button style={styles.leaveButton} onClick={onLeavePage}>
                    Leave Page
                </button>
            </div>
        </div>
    );
};
const styles = {
    banner: {
        position: 'fixed',
        bottom: 0,
        width: '100%',
        backgroundColor: '#333',
        color: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        boxShadow: '0 -2px 5px rgba(0, 0, 0, 0.2)',
        boxSizing: 'border-box',
        zIndex: 1000,
    },
    text: {
        margin: 0,
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px',
    },
    acceptButton: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
    leaveButton: {
        backgroundColor: '#f44336',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
    },
};

export default CookieBanner;
