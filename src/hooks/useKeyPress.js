import { useState, useEffect } from "react";

const useKeyPress = callback => {
  const [keyPressed, setKeyPressed] = useState();
  useEffect(() => {
    // downHandler handles when a key is down/pressed
    const downHandler = ({ key }) => {
      // check if different key to prevent registering the same key stroke (user holds down key for too long, and check if it is a single character i.e. not CTRL, shift, del, return..)
      if (keyPressed !== key && key.length === 1) {
        setKeyPressed(key);
        callback && callback(key);
      }
    };
    //upHandler handles when a key is released
    // want to reset the seKeyPressed to null
    const upHandler = () => {
      setKeyPressed(null);
    };

    //add event listeners
    window.addEventListener("keydown", downHandler);
    window.addEventListener("keyup", upHandler);

    return () => {
      //remove event listeners
      window.removeEventListener("keydown", downHandler);
      window.removeEventListener("keyup", upHandler);
    };
  });
  //return keypressed state to caller
  return keyPressed;
};

export default useKeyPress;
