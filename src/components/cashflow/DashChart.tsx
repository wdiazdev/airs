import { FC } from 'react'
import Chart from 'react-apexcharts'
import { LoanDataTypes } from '../../types'
import usePaymentCalculator from '../../hook'

type Props = {
  results?: LoanDataTypes
}

const DashChart: FC<Props> = ({ results }) => {
  const { propertyData } = usePaymentCalculator({
    results,
  })

  const arrOfHoldings = [
    propertyData.principalAndInterest,
    propertyData.taxes,
    propertyData.insurance,
    propertyData.hoa,
  ]

  return (
    <>
      <Chart
        type="donut"
        width={350}
        height={350}
        series={arrOfHoldings}
        options={{
          labels: [
            'Principal & Interest',
            'Property Taxes',
            'Home Insurance',
            'HOA',
          ],
          colors: ['#0070F0', '#FF9C00', '#FF0000', '#008000'],
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
                size: '60px',
                labels: {
                  show: false,
                  total: {
                    show: false,
                    showAlways: false,
                    label: 'Monthly payment',
                    fontSize: '22px',
                    fontFamily: 'DM Sans',
                    fontWeight: 'bold',
                    color: '#71717A ',
                  },
                },
              },
            },
          },
          dataLabels: {
            enabled: true,
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
