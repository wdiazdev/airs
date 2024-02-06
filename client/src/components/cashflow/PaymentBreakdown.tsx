import { formatCurrency } from '../../utils/FormatCurrency'
import useCashFlow from '../../hook/useCashFlow'
import { LoanDataTypes } from '../../types'

type Props = {
  results: LoanDataTypes
}

const PaymentBreakdown = ({ results }: Props) => {
  const { propertyData } = useCashFlow({ results })

  return (
    <div className="w-full flex gap-4 justify-between items-center px-4">
      <div className="flex flex-col gap-2">
        <span className="text-[#0070F0]">Principal & Interest</span>
        <span className="text-[#FF9C00]">Property Taxes</span>
        <span className="text-[#FF0000]">Home Insurance</span>
        <span className="text-[#008000]">HOA</span>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-slate-500">
          {propertyData && formatCurrency(propertyData.principalAndInterest)}
        </span>
        <span className="text-slate-500">
          {propertyData?.taxes ? formatCurrency(propertyData.taxes) : '-'}
        </span>
        <span className="text-slate-500">
          {propertyData?.insurance
            ? formatCurrency(propertyData.insurance)
            : '-'}
        </span>
        <span className="text-slate-500">
          {propertyData?.hoa ? formatCurrency(propertyData.hoa) : '-'}
        </span>
      </div>
    </div>
  )
}

export default PaymentBreakdown
