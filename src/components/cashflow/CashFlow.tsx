import { FC, useState } from 'react'
import { Button } from '@nextui-org/react'
import DashChart from './DashChart'
import { LoanDataTypes } from '../../types'
import { HouseIcon } from '../../icons/Icons'
import usePaymentCalculator from '../../hook'
import { formatCurrency } from '../../utils/FormatCurrency'
import Stats from './Stats'
import { toast } from 'sonner'
import FormInput from './FormInput'

const CashFlow: FC = () => {
  const [results, setResults] = useState<LoanDataTypes>()

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
      taxes: parseFloat(formData.get('taxes') as string) || 0,
      hoa: parseFloat(formData.get('hoa') as string) || 0,
      rent: parseFloat(formData.get('rent') as string) || 0,
    }

    setResults(formParams)
    toast.success('Success!')
    form.reset()
  }

  const monthlyPayment = usePaymentCalculator({ results })

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-lg text-center mb-4 sm:text-lg text-md">
        Cash Flow Calculator
      </h2>

      <div
        className="flex items-center justify-center flex-wrap sm:flex gap-8 sm:gap-4 
      border-1 rounded-lg p-2 sm:p-6 border-zinc-800"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 min-w-full sm:min-w-[300px]"
        >
          <FormInput
            type="number"
            name="price"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={true}
            defaultValue=""
            label={'Property Price'}
            symbol={'$'}
          />
          <FormInput
            type="number"
            name="downpayment"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={false}
            defaultValue=""
            label={'Down Payment'}
            symbol={'$'}
          />
          <FormInput
            type="number"
            name="interest"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={true}
            defaultValue=""
            label={'Interest Rate'}
            symbol={'%'}
          />
          <FormInput
            type="number"
            name="taxes"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={false}
            defaultValue=""
            label={'Property Taxes'}
            symbol={'$'}
            description="Monthly taxes payment."
          />

          <FormInput
            type="number"
            name="insurance"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={false}
            defaultValue=""
            label={'Property Insurance'}
            symbol={'$'}
            description="Monthly insurance payment."
          />
          <FormInput
            type="number"
            name="hoa"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={false}
            defaultValue=""
            label={'HOA Fee'}
            symbol={'$'}
            description="Monthly HOA payment."
          />

          <div className="flex flex-col gap-0">
            <label htmlFor="loanType" className="block text-sm text-white">
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

          <FormInput
            type="number"
            name="rent"
            placeholder="0"
            min="0"
            step="0.01"
            autoComplete="off"
            required={true}
            defaultValue=""
            label={'Monthly Rental Income'}
            symbol={'$'}
          />

          <Button
            type="submit"
            className="text-sm text-white bg-primary hover:bg-primary-hover 
            transition delay-100"
          >
            Calculate
          </Button>
        </form>

        <div className="flex flex-col justify-between items-center gap-6">
          {results ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <h3 className="text-md text-white">Monthly payment</h3>
                <span className="flex justify-end text-sm text-zinc-500">
                  {`${results.loanType}-Year-Fixed`}
                </span>
                <p className="text-md text-white">
                  {formatCurrency(monthlyPayment)}
                </p>
              </div>
              <DashChart data={results} />
            </>
          ) : (
            <HouseIcon width={350} stroke={'0.5'} color={'rgb(39 39 42)'} />
          )}
        </div>
      </div>
      <div className="my-4">
        <Stats results={results} />
      </div>
    </div>
  )
}

export default CashFlow
