import { FC, useEffect, useState } from 'react'
import { LoanDataTypes } from '../types'

type Props = {
  results: LoanDataTypes | undefined
}

const usePaymentCalculator: FC<Props> = ({ results }) => {
  console.log('results:', results)
  const [monthlyPayment, setMonthlyPayment] = useState<number>()

  useEffect(() => {
    if (results) {
      const downPayment = results.downPayment
      const insurance = results.insurance // Monthly Insurance Payment
      const taxes = results.taxes // Monthly Taxes Payment
      const propertyPrice = results.propertyPrice
      const rate = results.interest / 100 / 12 // Monthly Interest Rate
      const term = results.loanType * 12

      const calculatedMonthlyPayment =
        ((propertyPrice - downPayment) * rate) /
          (1 - Math.pow(1 + rate, -term)) +
        insurance +
        taxes

      setMonthlyPayment(parseInt(calculatedMonthlyPayment.toFixed(2)))
    }
  }, [results])

  return monthlyPayment
}

export default usePaymentCalculator
