import { useState } from 'react'
import DashChart from './DashChart'
import { LoanDataTypes } from '../../types'
import useCashFlow from '../../hook/useCashFlow'
import { formatCurrency } from '../../utils/FormatCurrency'
import Stats from './Stats'
import { toast } from 'sonner'
import FormInput from './FormInput'
import PaymentBreakdown from './PaymentBreakdown'
import { FaHome } from 'react-icons/fa'

const CashFlow = () => {
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

  const { propertyData } = useCashFlow({ results })

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-white text-lg text-center mb-4 sm:text-lg text-md">
        Cash Flow Calculator
      </h2>

      <div
        className="flex items-center justify-center flex-wrap sm:flex gap-8 sm:gap-10 
      border-1 rounded-lg p-2 sm:p-6 border-zinc-800"
      >
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 min-w-full sm:min-w-[300px]"
        >
          <FormInput
            name="price"
            required={true}
            label={'Property Price'}
            symbol={'$'}
            defaultValue={results && results.propertyPrice}
          />
          <FormInput
            name="downpayment"
            required={false}
            label={'Down Payment'}
            symbol={'$'}
            defaultValue={results && results.downPayment}
          />
          <FormInput
            name="interest"
            required={true}
            defaultValue={results && results.interest}
            label={'Interest Rate'}
            symbol={'%'}
          />
          <FormInput
            name="taxes"
            required={false}
            defaultValue={results && results.taxes}
            label={'Property Taxes'}
            symbol={'$'}
            description="Monthly taxes payment."
          />

          <FormInput
            name="insurance"
            required={false}
            defaultValue={results && results.insurance}
            label={'Property Insurance'}
            symbol={'$'}
            description="Monthly insurance payment."
          />
          <FormInput
            name="hoa"
            required={false}
            defaultValue={results && results.hoa}
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
              value={results && results.loanType}
            >
              <option value="30">30-Year-Fixed</option>
              <option value="20">20-Year-Fixed</option>
              <option value="15">15-Year-Fixed</option>
              <option value="10">10-Year-Fixed</option>
            </select>
          </div>

          <FormInput
            name="rent"
            required={true}
            defaultValue={results && results.rent}
            label={'Monthly Rental Income'}
            symbol={'$'}
          />

          <button
            type="submit"
            className="py-2 px-4 uppercase bg-customBlue text-white font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200"
          >
            Calculate
          </button>
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
                  {formatCurrency(propertyData.monthlyPayment)}
                </p>
              </div>
              <DashChart results={results} />
              <PaymentBreakdown results={results} />
            </>
          ) : (
            <FaHome size={400} color="#475569" />
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
