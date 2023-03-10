import React, { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

function BankrollChart({ bankroll, bets, growthRate }) {
  const chartRef = useRef(null)

  useEffect(() => {
    const data = []
    let currentBankroll = bankroll

    for (let i = 0; i <= bets; i++) {
      data.push({ x: i, y: currentBankroll })
      currentBankroll *= growthRate
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
            title: {
              display: true,
              text: 'Number of Bets',
            },
          },
          y: {
            type: 'linear',
            position: 'left',
            title: {
              display: true,
              text: 'Expected Bankroll Value',
            },
            ticks: {
              callback: function (value, index, values) {
                return (
                  '$' +
                  value.toLocaleString('en-US', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })
                )
              },
            },
          },
        },
      },
    })

    return () => chart.destroy()
  }, [bankroll, bets, growthRate])

  return <canvas ref={chartRef} />
}

export default BankrollChart
