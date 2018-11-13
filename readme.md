# 🤔 React Remember

> Global state in React using Hooks & Context. ([Demo](https://codesandbox.io/s/pjn96q43m)).

From anywhere in your application:

```
remember({answer: 42})
```

From anywhere else in your application:

```
<div>{the.answer}</div>
// displays 42
```

### Installation & Usage

Install with `yarn add react-remember` or `npm install react-remember`.

Wrap your app with the Rememberer:

```
import Rememberer from ‘react-remember’
const App = () => {
    return (
        <Rememberer>
            // Wrap your app with Rememberer
        </Rememberer>
    )
}
ReactDOM(<App />, root)
```

Now you can useRemember in any component.

```
const Button = () => {
   const [the, remember] = useRemember()
   return (
        <button onClick={() => remember({count: ++the.count || 1})}>
            click me
        <button>
    )
}

const Info = () => {
    const [the, remember] = useRemember()
    return <div>Button clicked {the.count} times</div>
}
```

### FAQ

> I thought global state was bad.

Yes.
