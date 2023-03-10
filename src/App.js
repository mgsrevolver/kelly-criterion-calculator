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
    const wagerAmount = betFraction * bankroll
    const expectedGrowthRate = 1 + betFraction * probability
    const finalBankroll = bankroll * expectedGrowthRate ** bets

    if (betFraction <= 0) {
      setResult(
        'This bet has a negative EV. This calculator is only helpful for bet sizing in games where the player believes they have an edge.'
      )
    } else {
      const roundedBetFraction = Math.round(betFraction * 100)
      setResult(
        `Bet ${roundedBetFraction}% of your bankroll per bet, starting with $${wagerAmount.toFixed(
          2
        )}. Your expected bankroll after ${bets} bet(s) is $${finalBankroll.toFixed(
          2
        )}.`
      )
    }
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
      <p>
        The Kelly Criterion is a formula used to determine the optimal bet size
        based on an estimated probability of winning and net payout odds.
      </p>
      <p>
        The calculator will recommend a bet size and provide an estimate of your
        expected bankroll growth if you follow the recommended sizing for a
        specified number of bets.
      </p>

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
