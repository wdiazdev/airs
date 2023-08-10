import { FC, useState } from 'react'
import '../styles/Dashboard.css'
import { styled } from 'styled-components'
import CashOnCash from '../components/CashOnCash'
import CashFlow from '../components/CashFlow'

const Dashboard: FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<string>()

  const RenderComponent = () => {
    if (selectedComponent === 'cashFlow') {
      return <CashFlow />
    } else if (selectedComponent === 'cashOnCash') {
      return <CashOnCash />
    } else {
      return <p>Please select a component to display.</p>
    }
  }

  const handleClick = (componentName: string) => {
    setSelectedComponent(componentName)
  }
  return (
    <>
      <div className="dash--container">
        <div className="dash--wrapper">
          <h2>Analize Rental Properties</h2>
          <div className="dash--btn">
            <StyledButton
              name="cashFlow"
              onClick={() => handleClick('cashFlow')}
            >
              Cash Flow
            </StyledButton>
            <StyledButton
              name="cashOnCash"
              onClick={() => handleClick('cashOnCash')}
            >
              Cash on Cash
            </StyledButton>
          </div>
          <div className="forms--wrapper">
            <RenderComponent />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard

export const StyledButton = styled.button`
  font-size: 0.8;
  letter-spacing: 1px;
  color: var(--secondary--color);
  padding: 1rem 1.5rem;
  border: none;
  background: var(--orange--color);
  cursor: pointer;
  transition: 0.2s ease-in;
  text-transform: uppercase;
  font-family: var(--secondary--font);
  font-weight: bold;

  &:hover {
    background: #fd7c3c;
    border-radius: 0.8rem;
  }
`
