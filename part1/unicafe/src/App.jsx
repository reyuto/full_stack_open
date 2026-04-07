import { useState } from "react"

const Header = ({message}) => <h2>{message}</h2>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticsItem = ({text, value}) => <tr><td>{text}</td><td>{value}</td></tr>
const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral

  if (total === 0) return <div>No feedback given</div>;
  
  const average = (good * 1 + bad * -1) / total
  const positive = good * 100 / total

  return (
    <table>
      <tbody>
        <StatisticsItem text="good" value={good} />
        <StatisticsItem text="neutral" value={neutral} />
        <StatisticsItem text="bad" value={bad} />
        <StatisticsItem text="all" value={total} />

        {total > 0 ? (
          <>
            <StatisticsItem text="average" value={average.toFixed(1)} />
            <StatisticsItem text="positive" value={`${positive.toFixed(2)} %`} />
          </>
        ) : null}
        </tbody>
    </table>
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
      <Header message="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
