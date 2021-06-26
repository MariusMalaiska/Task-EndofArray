import { useState } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState();
  const [errors, setErrors] = useState([]);
  const [isWin, setIsWin] = useState("");

  let arr = [];

  const checkTheEnd = (arr, n, i) => {
    if (i < 0 || i >= n) return false;

    if (i === n - 1) return true;

    return checkTheEnd(arr, n, i + arr[i]);
  };

  const submit = (e) => {
    e.preventDefault();
    if (input) {
      arr = input.split(`,`).map((x) => +x);

      setErrors("");
      if (!input.match("^[0-9]+([0-9,])+[0-9]+$")) {
        setErrors("Please fill in like so 1,2,3,0,3");
      } else {
        checkTheEnd(arr, arr.length, arr[0])
          ? setIsWin("Win !!!")
          : setIsWin("Lost");
      }
    } else {
      setErrors("Field cannot be empty");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h6>
          Please fill as shown below to find out
          <br /> if you have reached the end of array
          <br />
          e.g. 5,3,2,0
        </h6>
        <div className="App-container">
          <div className="Box">
            <h3>{isWin}</h3>
            <h3>{input}</h3>
          </div>
          <input
            onChange={(e) => {
              setInput(e.target.value);
              setIsWin("");
            }}
            className="Input"
            type="text"
            placeholder="e.g. 5,3,2,0"
          />
          <button className="Button" onClick={submit}>
            Check
          </button>
        </div>
        <p className="Error">{errors}</p>
      </header>
    </div>
  );
}

export default App;
