# 🤔 React Remember

[![GitHub license](https://img.shields.io/github/license/Naereen/StrapDown.js.svg)](https://github.com/Naereen/StrapDown.js/blob/master/LICENSE)

> Persistent global state in React using Hooks & Context. ([Demo](https://codesandbox.io/s/nnvzpkjxj))

### Quick start

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

### Installation & Usage

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

### Explorer

View a list of what's been remembered by adding the `show` property to the Rememberer.

```js
<Rememberer show />
```

### FAQ

> I thought global state was bad.

Yes.
