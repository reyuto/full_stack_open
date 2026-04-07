import { useState } from "react"

const Header = ({message}) => <h2>{message}</h2>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Statistics = ({good, neutral, bad}) => {
  return (
    <div>
      <Header message="statistics" />
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}


const App = () => {
  const [ good, setGood ] = useState(0);
  const [ neutral, setNeutral ] = useState(0);
  const [ bad, setBad ] = useState(0);

  return (
    <div>
      <Header message="give feedback" />
      <Button onClick={() => setGood(good+1)} text="good" />
      <Button onClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button onClick={() => setBad(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
