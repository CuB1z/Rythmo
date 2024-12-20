import React, { useState, useEffect } from 'react';
import styles from '@styles/Timer/PomodoroTimer.module.css';

const PomodoroTimer = () => {
    const defaultTime = 25 * 60; // 25 minutos en segundos
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [isRunning, setIsRunning] = useState(false);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    const handleRestart = () => {
        setIsRunning(false);
        setTimeLeft(defaultTime);
    };

    return (
        <div className={styles.timerContainer}>
            <h2 className={styles.timer}>{formatTime(timeLeft)}</h2>
            <div className={styles.buttons}>
                <button className={`${styles.button} ${styles.primary}`} onClick={() => setIsRunning(true)}>
                    Play
                </button>
                <button className={`${styles.button} ${styles.primary}`} onClick={() => setIsRunning(false)}>
                    Stop
                </button>
                <button className={`${styles.button} ${styles.primary}`} onClick={handleRestart}>
                    Restart
                </button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
