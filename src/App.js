import React, { useState } from 'react'
import './style.css'

function App() {
  const [bankroll, setBankroll] = useState(100)
  const [payoff, setPayoff] = useState(1)
  const [probability, setProbability] = useState(0.6)
  const [bets, setbets] = useState(1)
  const [result, setResult] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    const f = (payoff * probability - (1 - probability)) / payoff
    const betFraction = Math.min(f, 1)
    console.log(betFraction)

    const wagerAmount = betFraction * bankroll
    const expectedGrowthRate = 1 + betFraction * probability
    console.log(expectedGrowthRate)
    const finalBankroll = bankroll * expectedGrowthRate ** bets

    setResult(
      `Bet ${(betFraction * 100).toFixed(
        0
      )}% of your bankroll per instance, starting with $${wagerAmount.toFixed(
        2
      )} on the first bet. Your expected bankroll after ${bets} bet(s) is $${finalBankroll.toFixed(
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
          type="text"
          id="bankroll"
          name="bankroll"
          value={`$${bankroll}`}
          onChange={(e) =>
            setBankroll(parseFloat(e.target.value.replace('$', '')))
          }
          required
        />

        <label htmlFor="payoff">Net Payout Odds (X:1):</label>
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
          maxLength="4"
          pattern="^[0-9]{1,3}%?$"
          value={probabilityFormatted}
          onChange={handleProbabilityChange}
          required
        />

        <label htmlFor="bets">Number of Bets:</label>
        <input
          type="number"
          id="bets"
          name="bets"
          value={bets}
          onChange={(e) => setbets(e.target.value)}
          required
        />

        <button type="submit">Calculate</button>
      </form>

      <div id="result">{result}</div>
    </div>
  )
}

export default App
