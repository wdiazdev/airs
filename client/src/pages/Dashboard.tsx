import { useState } from 'react'
import CashOnCash from '../components/cashoncash/CashOnCash'
import CashFlow from '../components/cashflow/CashFlow'

const Dashboard = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>()

  const RenderComponent = () => {
    if (selectedComponent === 'cashFlow') {
      return <CashFlow />
    } else if (selectedComponent === 'cashOnCash') {
      return <CashOnCash />
    } else {
      return (
        <p className="text-md text-center">
          Please choose a calculation method.
        </p>
      )
    }
  }

  const handleClick = (componentName: string) => {
    setSelectedComponent(componentName)
  }
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex flex-col justify-center gap-2 mt-40">
          <h2 className="text-center text-lg mb-6">
            Analyze Rental Properties
          </h2>
          <div className="flex justify-center items-center gap-4 mb-10">
            <button
              name="cashFlow"
              onClick={() => handleClick('cashFlow')}
              title=" Cash Flow"
              className="text-sm py-2 px-4 uppercase bg-customBlue text-white font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200"
            >
              Cash Flow
            </button>
            <button
              name="cashOnCash"
              onClick={() => handleClick('cashOnCash')}
              title="Cash on Cash"
              className="text-sm py-2 px-4 uppercase bg-customBlue text-white font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200"
            >
              Cash on Cash
            </button>
          </div>
          <div>
            <RenderComponent />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard
