import React from 'react'
import ReactDOM from 'react-dom/client'


const App = () => {
    return (
        <div>
            <h1>Hello</h1>
            <h2>Hello 222222</h2>
        </div>
    )
}

// React@17
// ReactDOM.render(<App />, document.getElementById("root"));

// React@18
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);