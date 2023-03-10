import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function BankrollChart({ bankroll, bets }) {
  const chartRef = useRef(null)

  useEffect(() => {
    const expectedGrowthRate = 1.02 // Replace with your own calculation

    const data = []
    let currentBankroll = bankroll

    for (let i = 0; i <= bets; i++) {
      data.push({ x: i, y: currentBankroll })
      currentBankroll *= expectedGrowthRate
    }

    const chart = new Chart(chartRef.current, {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'Bankroll Growth',
            data: data,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'linear',
            position: 'bottom',
          },
          y: {
            type: 'linear',
            position: 'left',
          },
        },
      },
    })

    return () => chart.destroy()
  }, [bankroll, bets])

  return <canvas ref={chartRef} />
}

export default BankrollChart
