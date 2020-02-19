import { useState, useEffect } from "react";

const useTimer = () => {
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (isTimerActive) {
      interval = setInterval(
        () => setElapsedTime(prevElapsedTime => prevElapsedTime + 0.1),
        100
      );
    }
    return () => clearInterval(interval);
  }, [isTimerActive]);
  return {
    isTimerActive,
    elapsedTime: elapsedTime.toFixed(1),
    startTimer: () => setIsTimerActive(true),
    stopTimer: () => setIsTimerActive(false)
  };
};

export default useTimer;
