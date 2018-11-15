import React from "react";
import Rememberer, { useRemember } from "../lib";

const Number = () => {
  const [the, remember] = useRemember();
  return <p>{the.number || 0}</p>;
};

const Button = () => {
  const [the, remember] = useRemember();
  return (
    <button onClick={() => remember({ number: Math.random() })}>regen</button>
  );
};

const App = () => {
  return (
    <Rememberer defaults={{ number: 1 }}>
      <h1>number</h1>
      <Number />
      <Number />
      <Button />
    </Rememberer>
  );
};

export default App;
