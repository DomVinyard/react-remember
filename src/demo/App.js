import React from "react";
// import Rememberer, { useRemember } from "../lib";
import Rememberer, { useRemember } from "react-remember";

const Number = () => {
  const [the, remember] = useRemember();
  return <p>{the.number || 0}</p>;
};

const Button = () => {
  const [the, remember] = useRemember();
  console.log(the, remember);
  return (
    <button
      onClick={() => {
        console.log(the, remember);
        remember({ number: Math.random() });
      }}
    >
      regen
    </button>
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

export default App;
