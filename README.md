# 🤔 React Remember

> Persistent global state in React using Local Storage, Hooks & Context. ([Demo](https://codesandbox.io/s/nnvzpkjxj))

[![npm version](https://badge.fury.io/js/react-remember.svg)](https://badge.fury.io/js/react-remember) [![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

## Quick start

Include the useRemember hook in a component:

```js
const [the, remember] = useRemember();
```

From anywhere in your application:

```js
remember({ answer: 42 });
```

From anywhere else in your application:

```js
<div>{the.answer}</div>
// displays 42
```

This value is saved in local storage and will persist until you change or reset it.

## Installation & Usage

> 🚨🚨🚨 Hooks are a new feature proposal that lets you use state and other React features without writing a class. They’re currently in React v16.7.0-alpha and being discussed in [an open RFC](https://github.com/reactjs/rfcs/pull/68). **If you're using a React version < 16.7, this module will not work.** 🚨🚨🚨

Install with `yarn add react-remember` or `npm install react-remember`.

Wrap your top-level app with the Rememberer™:

```js
import Rememberer from ‘react-remember’

const App = () => {
    return (
        <Rememberer>
            // standard app.js stuff in here
        </Rememberer>
    )
}
ReactDOM(<App />, root)
```

Now you can useRemember in any component. The data will be available everywhere, updatable from anywhere and will persist between refreshes.

```js
import { useRemember } from ‘react-remember’

const Button = () => {
  const [the, remember] = useRemember();
  return (
    <button onClick={() => remember({ count: ++the.count || 1 })}>
      click me
    </button>
  );
};

const Info = () => {
  const [the, remember] = useRemember();
  return <div>Button clicked {the.count} times</div>;
};
```

## Defaults

Defaults are the values that are instantiated on first launch. 

```js
<Rememberer
  defaults={{
    count: 42,
    user: {}
  }}
>
  ...
</Rememberer>
```

## Explorer

View a list of what's been remembered by adding the `show` property to the Rememberer.

```js
<Rememberer show defaults={{number: 1}}>...</Rememberer>
```
<img src="https://i.imgur.com/VTqPMZG.png" width="480px" />


## FAQ

> I thought global state was bad.

Yes.
