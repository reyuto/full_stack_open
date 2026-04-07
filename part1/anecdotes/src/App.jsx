import { useState } from 'react'

const MostVotedAnecdote = ({message}) => {
  return <p>{message}</p>
}

const AnecdoteOfTheDay = ({message, votes}) => {
  return (
  <>
    <p>{message}</p>
    <p>has {votes} votes</p>
  </>)
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [totalVotes, setTotalVotes] = useState(0)

  const handleButtonClick = () => {
    const nextSelection = ((anecdotes.length - 1) * Math.random()).toFixed(0)
    setSelected(nextSelection)
  }

  const handleVoting = (selected) => {
    const nextVotes = [...votes]
    nextVotes[Number(selected)] += 1
    setVotes(nextVotes)
    setTotalVotes(totalVotes + 1)
  }

  const getTopVotedAnecdote = () => {
    let id = 0;
    let val = votes[id];

    for (let i = 0; i < votes.length; i++) {
      if (val < votes[i]) {
        id = i
        val = votes[id]
      }
    }

    return id
  }

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <AnecdoteOfTheDay message={anecdotes[selected]} votes={votes[selected]} />
      <div>
        <button onClick={() => handleVoting(selected)}>vote</button>
        <button onClick={handleButtonClick}>next anecdote</button>
      </div>
      <h2>Anecdote with most votes</h2>
      {totalVotes > 0 ? <MostVotedAnecdote message={anecdotes[getTopVotedAnecdote()]} /> : <p>Voting has not started</p>}
    </div>
  )
}

export default App
