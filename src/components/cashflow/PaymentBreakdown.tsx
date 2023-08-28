import { FC } from 'react'
import { formatCurrency } from '../../utils/FormatCurrency'
import usePaymentCalculator from '../../hook'
import { LoanDataTypes } from '../../types'

type Props = {
  results: LoanDataTypes
}

const PaymentBreakdown: FC<Props> = ({ results }) => {
  const { propertyData } = usePaymentCalculator({ results })

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
          {propertyData && formatCurrency(propertyData.principalAndInterest)}
        </span>
        <span className="text-white">
          {propertyData?.taxes ? formatCurrency(propertyData.taxes) : '-'}
        </span>
        <span className="text-white">
          {propertyData?.insurance
            ? formatCurrency(propertyData.insurance)
            : '-'}
        </span>
        <span className="text-white">
          {propertyData?.hoa ? formatCurrency(propertyData.hoa) : '-'}
        </span>
      </div>
    </div>
  )
}

export default PaymentBreakdown
