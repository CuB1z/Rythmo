import React, { useState, useEffect } from 'react';
import styles from '@styles/Timer/PomodoroTimer.module.css';

const PomodoroTimer = () => {
    const defaultTime = 25 * 60;
    const [timeLeft, setTimeLeft] = useState(defaultTime);
    const [isRunning, setIsRunning] = useState(false);

    // Conviertimos segundos a formato mm:ss
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Manejo del temporizador mientras está corriendo
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            // Detén el temporizador si llega a 0
            setIsRunning(false);
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);

    // Maneja el botón "Restart" para reiniciar el temporizador
    const handleRestart = () => {
        setIsRunning(false); // Detenemos el temporizador
        setTimeLeft(defaultTime); // Reiniciamos el tiempo al valor inicial
    };

    return (
        <div className={styles.timerContainer}>
            <h2 className={styles.timer}>{formatTime(timeLeft)}</h2>
            <div className={styles.buttons}>
                <button className={styles.button} onClick={() => setIsRunning(true)}>Play</button>
                <button className={styles.button} onClick={() => setIsRunning(false)}>Stop</button>
                <button className={styles.button} onClick={handleRestart}>Restart</button>
            </div>
        </div>
    );
};

export default PomodoroTimer;
