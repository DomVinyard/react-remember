import React from "react";
import ReactDOM from "react-dom";
import Rememberer, { useRemember } from "../lib";

// Click to remember() a number
const Button = () => {
  const [the, remember] = useRemember();
  return (
    <button
      onClick={() => {
        const randomNumber = Math.floor(Math.random() * 100);
        remember({ number: randomNumber });
      }}
    >
      Press me
    </button>
  );
};

// Display the.number as soon as it's been remembered
const Number = () => {
  const [the, remember] = useRemember();
  if (!the.number) return null;
  return <p style={{ color: "darkgreen" }}>✅remembered {the.number}</p>;
};

// It's all the same number.
// Don't forget to wrap your app in the Rememberer
const App = () => {
  return (
    <Rememberer url>
      <div style={{ maxWidth: 500 }}>
        <h2>react-remember demo</h2>
        <a href="https://badge.fury.io/js/react-remember">
          <img src="https://badge.fury.io/js/react-remember.svg" />
        </a>
        <p>
          Press the button below to generate and remember a random number.
          Notice how the <code>Button</code> and <code>Number</code> components
          are completely decoupled in the code but use the same global variable.
          Now refresh this page to see that the number has persisted.
        </p>
        <Number />
        <Button />
      </div>
    </Rememberer>
  );
};
ReactDOM.render(<App />, document.getElementById("root"));
