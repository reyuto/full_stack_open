import { useState } from "react"

const Header = ({message}) => <h2>{message}</h2>
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const StatisticsItem = ({text}) => <div>{text}</div>
const Statistics = ({good, neutral, bad}) => {
  const total = good + bad + neutral

  if (total === 0) return <div>No feedback given</div>;

  return (
    <div>
      <StatisticsItem text={`good ${good}`} />
      <StatisticsItem text={`neutral ${neutral}`} />
      <StatisticsItem text={`bad ${bad}`} />
      <StatisticsItem text={`all ${total}`} />

      {total > 0 ? (
        <>
          <StatisticsItem text={`average ${(good * 1 + bad * -1) / total}`} />
          <StatisticsItem text={`positive ${good * 100 / total} %`} />
        </>
      ) : null}

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
      <Header message="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
