import { FC, useEffect, useState } from 'react'
import { LoanDataTypes } from '../../types'
import { formatCurrency } from '../../utils/FormatCurrency'

type Props = {
  data?: LoanDataTypes
}

const PaymentBreakdown: FC<Props> = ({ data }) => {
  const [principalAndInterest, setPrincipalAndInterest] = useState<number>(0)
  console.log('data:', data)
  // colors: ['#0070F0', '#FF9C00', '#FF0000', '#008000']

  useEffect(() => {
    if (data) {
      const loanAmount = data.propertyPrice - data.downPayment
      const monthlyInterestRate = data.interest / 100 / 12
      const numberOfPayments = data.loanType * 12

      const monthlyPrincipalAndInterest =
        (loanAmount * monthlyInterestRate) /
        (1 - Math.pow(1 + monthlyInterestRate, -numberOfPayments))

      setPrincipalAndInterest(monthlyPrincipalAndInterest)
    }
  }, [data])
  return (
    <div className="w-full flex gap-4 justify-between items-center px-4">
      <div className="flex flex-col gap-2">
        <span className="text-[#0070F0]">Principal & Interest</span>
        <span className="text-[#FF9C00]">Property Taxes</span>
        <span className="text-[#FF0000]">Home Insurance</span>
        <span className="text-[#008000]">HOA</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-white">
          {data && formatCurrency(principalAndInterest)}
        </span>
        <span className="text-white">
          {data?.taxes ? formatCurrency(data.taxes) : '-'}
        </span>
        <span className="text-white">
          {data?.insurance ? formatCurrency(data.insurance) : '-'}
        </span>
        <span className="text-white">
          {data?.hoa ? formatCurrency(data.hoa) : '-'}
        </span>
      </div>
    </div>
  )
}

export default PaymentBreakdown
