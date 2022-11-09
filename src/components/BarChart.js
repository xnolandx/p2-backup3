import React from 'react'
import {Bar, Radar} from "react-chartjs-2"
import {Chart as ChartJS} from 'chart.js/auto'


function BarChart({chartData}, ) {
    
  return (
    <Radar 
    data={chartData} 
    options={ {
      
      plugins: {
        legend:{
          reverse: true,
          position: 'top',
          align: 'start',
          labels: {
            color: 'white',
            
          }
        }
        
      },
      scales: {
          r: {
            angleLines: {
              color: 'rgba(27,26,27, 0.8)'
            },
            grid: {
              color: 'rgba(27,26,27, 0.8)'
            }, 
            pointLabels: {
              color: 'white',
              font: 'Times New Roman',
              padding: 6
            },
            ticks: {
              color: 'white',
              backdropColor: 'rgba(10,175,101, 0)',
              font: 'Times New Roman',
              stepSize: 20
            },
            suggestedMin: 0,
            suggestedMax: 100

          }
      },
      layout: {
        padding: 5,
        // autoPadding: true
      }     
      
    }}
    />
  )
}

export default BarChart

