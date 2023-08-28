import { useEffect, useState } from 'react'
import { LoanDataTypes } from '../types'

type Props = {
  results?: LoanDataTypes
}

const usePaymentCalculator = ({ results }: Props) => {
  const [monthlyPayment, setMonthlyPayment] = useState<number>()
  const [rent, setRent] = useState<number>()
  const [principalAndInterest, setPrincipalAndInterest] = useState<number>(0)

  useEffect(() => {
    if (results) {
      const downPayment = results.downPayment
      const insurance = results.insurance // Monthly Insurance Payment
      const taxes = results.taxes // Monthly Taxes Payment
      const propertyPrice = results.propertyPrice
      const rate = results.interest / 100 / 12 // Monthly Interest Rate
      const term = results.loanType * 12
      const hoa = results.hoa
      const loanAmount = results.propertyPrice - results.downPayment

      const monthlyPrincipalAndInterest =
        (loanAmount * rate) / (1 - Math.pow(1 + rate, -term))

      const totalMonthlyPayment =
        ((propertyPrice - downPayment) * rate) /
          (1 - Math.pow(1 + rate, -term)) +
        insurance +
        taxes +
        hoa

      setMonthlyPayment(totalMonthlyPayment)
      setRent(results.rent)
      setPrincipalAndInterest(monthlyPrincipalAndInterest)
    }
  }, [results])
  return { monthlyPayment, rent, principalAndInterest }
}

export default usePaymentCalculator
