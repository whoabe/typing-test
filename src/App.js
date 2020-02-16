import React, { useState } from "react";
import "./App.css";
import useKeyPress from "./hooks/useKeyPress";
import { blurbs } from "./utils/blurbs";

// setting blurb as a const
// blurb is an array
const blurb = blurbs[0];
// console.log(blurb);

function App() {
  const [index, setIndex] = useState(0);
  const [incorrectCharCount, setIncorrectCharCount] = useState(0);
  const [outgoingChars, setOutgoingChars] = useState("");
  // outgoing chars is the characters of the blurb that have been passed through, only kept as state for css purposes (to grey out)
  const [currentChar, setCurrentChar] = useState(blurb[index]);
  const [incomingChars, setIncomingChars] = useState(blurb.slice(index + 1));
  // currentChar is the character the user has to input next
  const [userInput, setUserInput] = useState("");
  // userInput used to go back and edit errors

  const [isError, setIsError] = useState(false);

  // const [incomingChar, setIncomingChar] = useState(blurb.substr(1));
  // const [startTime, setStartTime] = useState();
  useKeyPress(key => {
    // adding the user's keypress into the userInput state
    setIsError(false);
    setUserInput(userInput.concat(key));

    // let updatedOutgoingChars = outgoingChars;

    setIndex(index + 1);
    setCurrentChar(blurb[index + 1]);

    // updatedOutgoingChars += currentChar;
    setOutgoingChars(outgoingChars.concat(blurb[index]));
    setIncomingChars(blurb.slice(index + 2));
    // let updatedIncomingChars = incomingChars;

    //2
    if (key === currentChar) {
      console.log(key + " is the correct character");
      // increment the
    } else {
      console.log(key + " is not the correct character");
      setIncorrectCharCount(incorrectCharCount + 1);
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
          <span style={{ opacity: 0.5 }}>{outgoingChars}</span>
          <span style={{ color: "#b8bb26" }}>{currentChar}</span>
          <span>{incomingChars}</span>
        </p>
      </section>
      <section className="text-input"></section>
      <section className="stats">
        <div className="time">
          <h3>Time</h3>
          <div className="error-count">0</div>
        </div>
        <div className="wpm">
          <h3>WPM</h3>
          <div className="error-count">0</div>
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
