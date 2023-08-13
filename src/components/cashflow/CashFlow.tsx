import { FC, useEffect, useState } from 'react'

import { Button } from '@nextui-org/react'
import DashChart from './DashChart'
import { LoanDataTypes } from '../../types'
import { HouseIcon } from '../../icons/Icons'

const CashFlow: FC = () => {
  const [results, setResults] = useState<LoanDataTypes>()
  const [monthlyPayment, setMonthlyPayment] = useState<number>()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = event.target as HTMLFormElement

    const formData = new FormData(form)

    const formParams = {
      propertyPrice: parseFloat(formData.get('price') as string) || 0,
      downPayment: parseFloat(formData.get('downpayment') as string) || 0,
      interest: parseFloat(formData.get('interest') as string) || 0,
      insurance: parseFloat(formData.get('insurance') as string) || 0,
      loanType: parseFloat(formData.get('loanType') as string) || 0,
    }

    setResults(formParams)
    form.reset()
  }

  useEffect(() => {
    let principal
    let rate
    let term

    if (results) {
      principal = results.propertyPrice
      rate = results.interest / 100 / 12
      term = results.loanType * 12
    }
    if (principal && rate && term) {
      const monthlyPayment =
        (principal * rate) / (1 - Math.pow(1 + rate, -term))
      setMonthlyPayment(parseInt(monthlyPayment.toFixed(2)))
    }
  }, [results])

  return (
    <div className="">
      <h2 className="text-white text-lg text-center mb-4 sm:text-lg text-md">
        Cash Flow Calculator
      </h2>

      <div className="flex items-center justify-center flex-wrap sm:flex gap-8 sm:gap-4 border-1 rounded-lg p-2 sm:p-6 border-zinc-800">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5 min-w-full sm:min-w-[300px]"
        >
          <div className="flex flex-col gap-0">
            <label htmlFor="price" className="block text-md text-white">
              Property Price
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-white sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="price"
                id="price"
                className="w-full rounded-md bg-zinc-800 hover:bg-zinc-700 
                text-white placeholder-white py-3 pl-7 border-none [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
                min="0"
                step="0.01"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="downpayment" className="block text-md text-white">
              Down Payment
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-white sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="downpayment"
                id="downpayment"
                className="w-full rounded-md bg-zinc-800 hover:bg-zinc-700 
                text-white placeholder-white py-3 pl-7 border-none [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
                min="0"
                step="0.01"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="interest" className="block text-md text-white">
              Interest Rate
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-white sm:text-sm">%</span>
              </div>
              <input
                type="number"
                name="interest"
                id="interest"
                className="w-auto rounded-md bg-zinc-800 hover:bg-zinc-700 
                text-white placeholder-white py-3 pl-7 border-none [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
                min="0"
                step="0.01"
                autoComplete="off"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="insurance" className="block text-md text-white">
              Property Insurance
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-white sm:text-sm">$</span>
              </div>
              <input
                type="number"
                name="insurance"
                id="insurance"
                className="w-full rounded-md bg-zinc-800 hover:bg-zinc-700 
                text-white placeholder-white py-3 pl-7 border-none [appearance:textfield]
                 [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="0.00"
                min="0"
                step="0.01"
                autoComplete="off"
              />
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="loanType" className="block text-md text-white">
              Loan Type
            </label>
            <select
              name="loanType"
              id="loanType"
              className="w-full border-none rounded-md bg-zinc-800
              hover:bg-zinc-700  text-white tracking-wider
              py-3 px-1 pl-7 cursor-pointer "
              required
            >
              <option value="30">30-Year-Fixed</option>
              <option value="20">20-Year-Fixed</option>
              <option value="15">15-Year-Fixed</option>
              <option value="10">10-Year-Fixed</option>
            </select>
          </div>
          <Button
            type="submit"
            className="text-md text-white bg-primary hover:bg-primary-hover 
            transition delay-100"
          >
            Calculate
          </Button>
        </form>

        <div className="flex flex-col justify-between items-center gap-6">
          {results ? (
            <>
              <div className="flex flex-col items-center justify-center text-md text-white">
                <h3>Monthly payment</h3>
                <span className="flex justify-end text-sm text-zinc-600">{`${results.loanType}-Year-Fixed`}</span>
                <p>{monthlyPayment && `$ ${Math.ceil(monthlyPayment)}`}</p>
              </div>
              <DashChart data={results} />
            </>
          ) : (
            <HouseIcon width={350} stroke={'0.5'} color={'rgb(39 39 42)'} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CashFlow
