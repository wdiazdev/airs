import { useEffect, useState } from 'react'
import { LoanDataTypes } from '../types'

type Props = {
  results?: LoanDataTypes
}

const useCashFlow = ({ results }: Props) => {
  const [propertyData, setPropertyData] = useState({
    monthlyPayment: 0,
    rent: 0,
    principalAndInterest: 0,
    taxes: 0,
    insurance: 0,
    hoa: 0,
    cashFlow: 0,
  })

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
      const rent = results.rent

      const monthlyPrincipalAndInterest =
        (loanAmount * rate) / (1 - Math.pow(1 + rate, -term))

      const totalMonthlyPayment =
        ((propertyPrice - downPayment) * rate) /
          (1 - Math.pow(1 + rate, -term)) +
        insurance +
        taxes +
        hoa

      const calculatedCashFlow = rent - totalMonthlyPayment

      setPropertyData({
        ...propertyData,
        monthlyPayment: totalMonthlyPayment,
        rent: rent,
        principalAndInterest: monthlyPrincipalAndInterest,
        taxes: taxes,
        insurance: insurance,
        hoa: hoa,
        cashFlow: calculatedCashFlow,
      })
    }
  }, [results])
  return { propertyData }
}

export default useCashFlow
