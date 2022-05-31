import "./App.css";
import { useState, useEffect } from "react";

function useTimer() {
  const [count, setCount] = useState(0);
  const [stopped, setStopped] = useState();

  function stopCounter() {
    setStopped(true);
    setCount(0);
    console.log(`Sopped at ${count}`);
  }

  function startCounter() {
    setStopped(false);
  }

  useEffect(() => {
    let interval;
    if (!stopped) {
      interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [stopped]);

  return { count, stopCounter, startCounter };
}
function App() {
  const timer = useTimer();

  const start = () => {
    console.log("start");
    timer.startCounter();
  };

  const stop = () => {
    console.log("stopping");
    timer.stopCounter();
  };
  return (
    <div className="App">
      <h1>{timer.count}</h1>

      <div>
        <button
          onClick={stop}
          style={{
            border: "0px",
            background: "#333",
            margin: "60px",
            padding: "20px",
            color: "#fff",
            fontSize: "40px",
          }}
        >
          Stop
        </button>
        <button
          onClick={start}
          style={{
            border: "0px",
            background: "#999",
            margin: "60px",
            padding: "20px",
            color: "#fff",
            fontSize: "40px",
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
}

export default App;
