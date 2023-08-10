import { FC, useState } from 'react'
import '../styles/Dashboard.css'
import { styled } from 'styled-components'
import CashFlowForm from '../components/CashFlowForm'

const Dashboard: FC = () => {
  const [showCashFlow, setShowCashFlow] = useState<boolean>(false)

  const handleClick = () => {
    setShowCashFlow(!showCashFlow)
  }
  return (
    <>
      <div className="dash--container">
        <div className="dash--wrapper">
          <h2>Analize Rental Properties</h2>
          <div className="dash--btn">
            <StyledButton name="Cash Flow" onClick={handleClick}>
              Cash Flow
            </StyledButton>
          </div>
        </div>
        {showCashFlow && <CashFlowForm />}
      </div>
    </>
  )
}

export default Dashboard

const StyledButton = styled.button`
  font-size: 0.8;
  letter-spacing: 1px;
  color: var(--secondary--color);
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.8rem;
  background: var(--blue--color);
  cursor: pointer;
  transition: 0.2s ease-in;
  text-transform: uppercase;
  font-family: var(--secondary--font);
  font-weight: bold;

  &:hover {
    background: #388bff;
  }
`
