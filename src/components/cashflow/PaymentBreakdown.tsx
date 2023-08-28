import { FC } from 'react'
import { formatCurrency } from '../../utils/FormatCurrency'
import usePaymentCalculator from '../../hook'
import { LoanDataTypes } from '../../types'

type Props = {
  results: LoanDataTypes
}

const PaymentBreakdown: FC<Props> = ({ results }) => {
  const { principalAndInterest } = usePaymentCalculator({ results })

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
          {results && formatCurrency(principalAndInterest)}
        </span>
        <span className="text-white">
          {results?.taxes ? formatCurrency(results.taxes) : '-'}
        </span>
        <span className="text-white">
          {results?.insurance ? formatCurrency(results.insurance) : '-'}
        </span>
        <span className="text-white">
          {results?.hoa ? formatCurrency(results.hoa) : '-'}
        </span>
      </div>
    </div>
  )
}

export default PaymentBreakdown
