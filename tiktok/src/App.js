import './App.css';
import { useState } from 'react'

const gifts = [
  "Car",
  "Motor",
  "Plane"
]

function App() {

  // useState: dung de set gia tri cho bien
  // const [state, setState] = useState(initState)
  let [counter, setCounter] = useState(1);

  let handleClick = () => {
    setCounter(counter + 1)
  }

  // VD: 2
  let [gift, setGift] = useState();

  const getGift = () => {
    let random = Math.floor(Math.random() * 3);
    setGift(gifts[random]);
  }

  // Two-way binding
  const [name, setName] = useState("");

  const handleGetName = () => {
    console.log("get name:", name);
  }

  return (
    <div className="App">
      <h1>{counter}</h1>
      <button onClick={handleClick}>Click</button>
      <br />

      <h1>{gift || "Not found"}</h1>
      <button onClick={getGift}>Get gift</button>
      <br />

      <input
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={handleGetName}>Get name</button>
    </div>
  );
}

export default App;
