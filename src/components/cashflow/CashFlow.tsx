import { FC } from 'react'

const CashFlow: FC = () => {
  const form = new FormData()

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="">
      <h2 className="text-white text-lg text-center mb-4">
        Cash Flow Calculator
      </h2>

      <div className="flex gap-4 border-1 rounded-lg p-4 border-zinc-800">
        <form className="flex flex-col gap-5 min-w-[250px]">
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
              />
            </div>
          </div>

          <div className="flex flex-col gap-0">
            <label htmlFor="loan" className="block text-md text-white">
              Loan Type
            </label>
            <select
              name="loan"
              id="loan"
              className="w-full border-none rounded-md bg-zinc-800
              hover:bg-zinc-700  text-white tracking-wider
              py-3 px-1 pl-7 cursor-pointer "
            >
              {[
                '30-Year-Fixed',
                '20-Year-Fixed',
                '15-Year-Fixed',
                '10-Year-Fixed',
              ].map((loanType) => {
                return (
                  <option key={loanType} value={loanType} className="p-1">
                    {loanType}
                  </option>
                )
              })}
            </select>
          </div>
        </form>
        <div></div>
      </div>
    </div>
  )
}

export default CashFlow
