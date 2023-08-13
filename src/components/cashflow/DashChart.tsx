import React from 'react'
import Chart from 'react-apexcharts'

export const DashChart = () => {
  const arrOfNames = [
    'Property Price',
    'Down Payment',
    'Interest Rate',
    'Property Insurance',
  ]

  const arrOfHoldings = [30, 15, 40, 15]

  return (
    <>
      <div className="flex flex-col gap-6">
        <h2 className="text-white text-center text-md">Loan Type</h2>
        <Chart
          type="donut"
          width={450}
          height={450}
          series={arrOfHoldings}
          options={{
            labels: arrOfNames,
            title: {
              text: undefined,
            },
            fill: {
              type: 'gradient',
            },
            plotOptions: {
              pie: {
                donut: {
                  labels: {
                    show: true,
                    total: {
                      show: true,
                    },
                  },
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            legend: {
              offsetX: 0,
              offsetY: 0,

              itemMargin: {
                horizontal: 1,
                vertical: 1,
              },
              markers: {
                width: 12,
                height: 12,
                radius: 12,
              },
              labels: {
                colors: undefined,
                useSeriesColors: true,
              },
            },
            yaxis: {
              labels: {
                formatter: function (val: any) {
                  return (
                    '$' +
                    val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                  )
                },
              },
            },
          }}
        />
      </div>
    </>
  )
}
