import { FC } from 'react'
import { LoanDataTypes } from '../../types'
import usePaymentCalculator from '../../hook/useCashflow'
import { formatCurrency } from '../../utils/FormatCurrency'

type props = {
  results?: LoanDataTypes
}

const Stats: FC<props> = ({ results }) => {
  const { propertyData } = usePaymentCalculator({
    results,
  })

  return (
    <div
      className="flex justify-evenly space-x-4 border-1 
      rounded-lg border-zinc-800 text-white bg-zinc-950"
    >
      <div className="w-[33%] border-r border-zinc-900 pr-4 p-4 text-sm">
        <p>Payment</p>
        <span>
          {propertyData.monthlyPayment
            ? formatCurrency(propertyData.monthlyPayment)
            : '-'}
        </span>
      </div>
      <div className="w-[33%] border-r border-zinc-900 px-4 p-4 text-sm">
        <p>Rental Income</p>
        <span>
          {propertyData.rent ? formatCurrency(propertyData.rent) : '-'}
        </span>
      </div>

      <div className="w-[33%] pl-4 p-4 text-sm">
        <p>Cash flow</p>
        <span
          className={
            propertyData.cashFlow > 0
              ? 'text-green-500'
              : propertyData.cashFlow < 0
              ? 'text-red-500'
              : 'text-white'
          }
        >
          {propertyData.cashFlow ? formatCurrency(propertyData.cashFlow) : '-'}
        </span>
      </div>
    </div>
  )
}

export default Stats
