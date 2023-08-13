import { FC, useEffect, useState } from 'react'
import { LoanDataTypes } from '../../types'
import usePaymentCalculator from '../../hook'
import { formatCurrency } from '../../utils/FormatCurrency'

type props = {
  results?: LoanDataTypes
}

const Stats: FC<props> = ({ results }) => {
  const [cashflow, setCashFlow] = useState<number>(0)
  const monthlyPayment = usePaymentCalculator({ results })

  useEffect(() => {
    if (typeof monthlyPayment === 'number' && results) {
      const calculatedCashFlow = results.rent - monthlyPayment
      setCashFlow(calculatedCashFlow)
    }
  }, [monthlyPayment, results])

  return (
    <div
      className="flex justify-evenly space-x-4 border-1 
    rounded-lg border-zinc-800 text-white bg-zinc-950"
    >
      <div className="w-[33%] border-r border-zinc-900 pr-4 p-4 text-sm">
        <p>Payment</p>
        <span>{results ? formatCurrency(monthlyPayment) : '-'}</span>
      </div>
      <div className="w-[33%] border-r border-zinc-900 px-4 p-4 text-sm">
        <p>Rental Income</p>
        <span>{results ? formatCurrency(results?.rent) : '-'}</span>
      </div>

      <div className="w-[33%] pl-4 p-4 text-sm">
        <p>Cash flow</p>
        <span
          className={
            cashflow > 0
              ? 'text-green-500'
              : cashflow < 0
              ? 'text-red-500'
              : 'text-white'
          }
        >
          {results ? formatCurrency(cashflow) : '-'}
        </span>
      </div>
    </div>
  )
}

export default Stats
