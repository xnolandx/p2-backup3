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
          labels: {
            color: 'white'
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
              // color: 'white',
              // backdropColor: 'rgba(10,175,101, 1)'
              font: 'Times New Roman',
              // stepSize: 10
            }, 
            myScale: {
              scaleStartValue: 0,
            }
          }
      },     
      
    }}
    />
  )
}

export default BarChart

