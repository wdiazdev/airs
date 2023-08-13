import { FC, useState, useEffect } from 'react'
import Chart from 'react-apexcharts'
import { LoanDataTypes } from '../../types'

type props = {
  data?: LoanDataTypes
}

const DashChart: FC<props> = ({ data }) => {
  const [hoa, setHoa] = useState<number>(0)
  const [insurance, setInsurance] = useState<number>(0)
  const [principalAndInterest, setPrincipalAndInterest] = useState<number>(0)
  const [propertyTaxes, setPropertyTaxes] = useState<number>(0)

  useEffect(() => {
    if (data) {
      const loanAmount = data.propertyPrice - data.downPayment
      const monthlyInterestRate = data.interest / 100 / 12
      const numberOfPayments = data.loanType * 12

      const monthlyPrincipalAndInterest =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))

      setInsurance(data.insurance)
      setHoa(data.hoa)
      setPropertyTaxes(data.taxes)
      setPrincipalAndInterest(monthlyPrincipalAndInterest)
    }
  }, [data])

  const arrOfHoldings = [principalAndInterest, propertyTaxes, insurance, hoa]

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
          colors: [],
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
