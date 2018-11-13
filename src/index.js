//Remember
import React from "react";
import ReactDOM from "react-dom";
import Rememberer, { useRemember } from "./react-remember";

const Number = () => {
  const [remember, the] = useRemember();
  return <p>{the.number || 0}</p>;
};

const Button = () => {
  const [remember, the] = useRemember();
  return (
    <button onClick={() => remember({ number: Math.random() })}>regen</button>
  );
};

const App = () => {
  return (
    <Rememberer>
      <h1>number</h1>
      <Number />
      <Number />
      <Button />
    </Rememberer>
  );
};

ReactDOM.render(<App />, document.getElementById("root")); // 100
