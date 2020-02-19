import React, { useState } from "react";
import "./App.css";
import useKeyPress from "./hooks/useKeyPress";
import useTimer from "./hooks/useTimer";
import { blurbs } from "./utils/blurbs";

// setting blurb as a const
// blurb is an array
const blurb = blurbs[0];

function App() {
  const [index, setIndex] = useState(0);
  const [incorrectCharCount, setIncorrectCharCount] = useState(0);
  const [outgoingChars, setOutgoingChars] = useState([]);
  // outgoing chars is the characters of the blurb that have been passed through, only kept as state for css purposes (to grey out)
  const [currentChar, setCurrentChar] = useState(blurb[index]);
  const [incomingChars, setIncomingChars] = useState(blurb.slice(index + 1));
  // currentChar is the character the user has to input next
  const [userInput, setUserInput] = useState("");
  // userInput used to go back and edit errors

  const [isError, setIsError] = useState(false);

  // const [cpm, setCpm] = useState(0);
  // const calculateCpm = (elapsedTime, userInput) => {
  //   let interval;
  //   interval = setInterval(
  //     () => setCpm((elapsedTime / userInput.length) => (elapsedTime +0.1/ userInput.length)),100
  //   )
  // };
  // const calculateWpm = calculateCpm / 5;

  // timer
  const { isTimerActive, elapsedTime, startTimer, stopTimer } = useTimer();
  const toggleTimer = () => {
    isTimerActive ? stopTimer() : startTimer();
  };

  // let rawCpm = 0;
  // if (elapsedTime > 0) {
  //   rawCpm = (userInput.length * 60) / elapsedTime;
  // }
  let netCpm = 0;
  netCpm = ((userInput.length - incorrectCharCount) * 60) / elapsedTime;
  let netWpm = 0;
  if (elapsedTime > 0) {
    netWpm = Math.floor(netCpm / 5);
  }

  // adding the user's keypress into the userInput state
  useKeyPress(key => {
    setIsError(false);
    setUserInput(userInput.concat(key));
    setIndex(index + 1);
    setCurrentChar(blurb[index + 1]);

    setIncomingChars(blurb.slice(index + 2));

    // check if index is 1, if yes, start timer ~~~~~~~~~~~~~~~~~~~~~~~
    if (index === 0) {
      // run startTimer function which sets the start time
      toggleTimer();
      // start calculating the cpm
      //
    }

    // stop timer when last key of blurb pressed
    if (index === blurb.length - 1) {
      toggleTimer();
      // stop calculating the cpm
    }

    // check if correct character
    if (key === currentChar) {
      setOutgoingChars([
        ...outgoingChars,
        <span style={{ opacity: "0.5" }}>{currentChar}</span>
      ]);
      // console.log(key + " is the correct character");
    } else {
      // console.log(key + " is not the correct character");
      setIncorrectCharCount(incorrectCharCount + 1);

      // space error
      if (currentChar === " ") {
        setOutgoingChars([
          ...outgoingChars,
          <span style={{ borderBottom: "1px solid red" }}>{currentChar}</span>
        ]);
      } else {
        // regular error
        setOutgoingChars([
          ...outgoingChars,
          <span style={{ opacity: "0.5", color: "red" }} className="incorrect">
            {currentChar}
          </span>
        ]);
      }
      setIsError(true);
    }
  });

  return (
    <div className="App">
      <header>
        <h1>Typing Speed Test</h1>
      </header>
      <section className="text-display">
        <p>
          {outgoingChars}
          <span style={{ color: "#b8bb26" }}>{currentChar}</span>
          <span>{incomingChars}</span>
        </p>
      </section>
      <section className="text-input"></section>
      <section className="stats">
        <div className="time">
          <h3>Time</h3>
          <div className="error-count">{elapsedTime}s</div>
        </div>
        <div className="wpm">
          <h3>WPM</h3>
          <div className="error-count">{netWpm}</div>
        </div>
        <div className="errors">
          <h3>ERRORS</h3>
          <div className="error-count">{incorrectCharCount}</div>
        </div>
      </section>
    </div>
  );
}

export default App;
