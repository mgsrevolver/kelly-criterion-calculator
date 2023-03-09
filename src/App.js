import React, { useState } from 'react'
import './style.css'

function App() {
  const [bankroll, setBankroll] = useState(100)
  const [payoff, setPayoff] = useState(1)
  const [probability, setProbability] = useState(0.6)
  const [instances, setInstances] = useState(1)
  const [result, setResult] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const f = (payoff * probability - (1 - probability)) / payoff
    const betFraction = Math.min(f, 1)

    const wagerAmount = betFraction * bankroll
    const finalBankroll =
      bankroll *
      (1 + (betFraction * payoff - 1) * probability - (1 - probability)) **
        instances

    setResult(
      `Bet ${betFraction.toFixed(
        2
      )} of your bankroll per instance, starting with $${wagerAmount.toFixed(
        2
      )} on the first bet. Your expected bankroll after ${instances} instances is $${finalBankroll.toFixed(
        2
      )}.`
    )
  }

  const handleProbabilityChange = (e) => {
    const inputValue = e.target.value.replace('%', '')
    const percentageValue = parseFloat(inputValue) / 100
    if (!isNaN(percentageValue)) {
      setProbability(percentageValue)
    }
  }

  const probabilityNumber = parseFloat(probability)
  const probabilityFormatted = (probabilityNumber * 100).toFixed(0) + '%'

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

        <label htmlFor="probability">
          Probability of Winning:
          <input
            type="text"
            id="probability"
            name="probability"
            maxLength="4"
            pattern="^[0-9]{1,3}%?$"
            value={probabilityFormatted}
            onChange={handleProbabilityChange}
            required
          />
        </label>

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
