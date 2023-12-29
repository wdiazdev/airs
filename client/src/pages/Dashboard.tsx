import { FC, useState } from 'react'
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
        <p className="text-md text-white text-center">
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
      <div
        className="relative min-h-screen w-full p-4 
        bg-no-repeat bg-cover bg-center flex items-start justify-center z-30
        bg-[url('/src/assets/dashBg.jpg')]"
      >
        <div className="fixed inset-0 bg-black bg-opacity-80 z-0"></div>
        <div className="flex flex-col justify-center gap-2 z-40">
          <h2 className=" text-white text-center mt-20 sm:text-xl text-lg text-lg">
            Analize Rental Properties
          </h2>
          <div className="flex justify-center items-center gap-4 mb-10">
            <button
              name="cashFlow"
              onClick={() => handleClick('cashFlow')}
              title=" Cash Flow"
              className="text-md text-white bg-primary hover:bg-primary-hover transition delay-100"
            >
              Cash Flow
            </button>

            <button
              name="cashOnCash"
              onClick={() => handleClick('cashOnCash')}
              title="Cash on Cash"
              className="text-md text-white bg-primary hover:bg-primary-hover transition delay-100"
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
