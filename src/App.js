import React, { useState } from 'react'
import './style.css'

function App() {
  const [bankroll, setBankroll] = useState('')
  const [payoff, setPayoff] = useState('')
  const [probability, setProbability] = useState('')
  const [instances, setInstances] = useState('')
  const [result, setResult] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const f = (payoff * probability - (1 - probability)) / payoff
    const betFraction = Math.min(f, 1)

    const wagerAmount = betFraction * bankroll
    setResult(
      `Bet ${betFraction.toFixed(
        2
      )} of your bankroll per instance, starting with $${wagerAmount.toFixed(
        2
      )} on the first bet.`
    )
  }

  const handleProbabilityChange = (e) => {
    const inputValue = e.target.value
    const percentageValue = parseFloat(inputValue) / 100
    setProbability(percentageValue)
  }

  return (
    <div className="container">
      <h1>Kelly Criterion Calculator</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="bankroll">Starting Bankroll:</label>
        <input
          type="number"
          id="bankroll"
          name="bankroll"
          value={bankroll}
          onChange={(e) => setBankroll(e.target.value)}
          required
        />

        <label htmlFor="payoff">Payoff Ratio:</label>
        <input
          type="number"
          id="payoff"
          name="payoff"
          value={payoff}
          onChange={(e) => setPayoff(e.target.value)}
          required
        />

        <label htmlFor="probability">Probability of Winning:</label>
        <input
          type="text"
          id="probability"
          name="probability"
          maxLength="3"
          pattern="[0-9]{1,3}"
          value={`${probability * 100}%`}
          onChange={handleProbabilityChange}
          required
        />

        <label htmlFor="instances">Number of Instances:</label>
        <input
          type="number"
          id="instances"
          name="instances"
          value={instances}
          onChange={(e) => setInstances(e.target.value)}
          required
        />

        <button type="submit">Calculate</button>
      </form>

      <div id="result">{result}</div>
    </div>
  )
}

export default App
