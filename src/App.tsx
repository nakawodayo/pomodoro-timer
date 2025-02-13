import { useState, useEffect } from "react";

const POMODORO_TIME = 25 * 60; // 25分（秒換算）
const BREAK_TIME = 5 * 60; // 5分（秒換算）

function App() {
  const [time, setTime] = useState(POMODORO_TIME); // カウントダウン用
  const [isRunning, setIsRunning] = useState(false); // タイマーの状態

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
    } else {
      if (timer) clearInterval(timer);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const startTimer = () => setIsRunning(true);
  const pauseTimer = () => setIsRunning(false);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(POMODORO_TIME);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div style={styles.container}>
      <h1>🍅 ポモドーロタイマー</h1>
      <h2>{formatTime(time)}</h2>
      <div>
        <button onClick={startTimer} disabled={isRunning}>開始</button>
        <button onClick={pauseTimer} disabled={!isRunning}>一時停止</button>
        <button onClick={resetTimer}>リセット</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    textAlign: "center" as const,
    padding: "20px",
  },
};

export default App;
