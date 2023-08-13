import { FC, useState } from 'react'
import Chart from 'react-apexcharts'
import { LoanDataTypes } from '../../types'

type props = {
  data?: LoanDataTypes
}

const DashChart: FC<props> = ({ data }) => {
  const [dataArray, setDataArray] = useState<number[]>([])
  console.log('data:', data)

  const arrOfNames = [
    'Principal & Interest',
    'Property Taxes',
    'Home Insurance',
    'HOA',
  ]

  const arrOfHoldings = [30, 15, 120, 50]

  return (
    <>
      <Chart
        type="donut"
        width={450}
        height={450}
        series={dataArray}
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
              startAngle: -90,
              endAngle: 270,
              donut: {
                labels: {
                  show: true,
                  total: {
                    show: false,
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
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
                  '$' + val.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
                )
              },
            },
          },
        }}
      />
    </>
  )
}

export default DashChart
