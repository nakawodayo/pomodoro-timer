import { useState, useEffect, useRef } from "react";
import Draggable from "react-draggable";

const POMODORO_TIME = 25 * 60; // 25分（秒換算）
const BREAK_TIME = 5 * 60; // 5分（秒換算）

function App() {
  const [time, setTime] = useState(POMODORO_TIME); // カウントダウン用
  const [isRunning, setIsRunning] = useState(false); // タイマーの状態
  const nodeRef = useRef<HTMLDivElement>(null);

  // 画面の中央位置を計算して初期位置として設定
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setPosition({
      x: window.innerWidth / 2 - 100, // 幅の中央
      y: window.innerHeight / 2 - 50, // 高さの中央
    });
  }, []); // 初回マウント時のみ実行

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
    <Draggable nodeRef={nodeRef} defaultPosition={position}>
      <div ref={nodeRef} div style={styles.container}>
        <h1>🍅 ポモドーロタイマー</h1>
        <h2>{formatTime(time)}</h2>
        <div>
          <button onClick={startTimer} disabled={isRunning}>
            開始
          </button>
          <button onClick={pauseTimer} disabled={!isRunning}>
            一時停止
          </button>
          <button onClick={resetTimer}>リセット</button>
        </div>
      </div>
    </Draggable>
  );
}

const styles = {
  container: {
    position: "fixed" as const,
    top: "10px",
    right: "10px",
    background: "white",
    padding: "10px",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    textAlign: "center" as const,
    cursor: "grab",
  },
};

export default App;
