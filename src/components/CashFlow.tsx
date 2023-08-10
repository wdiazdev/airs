import { FC } from 'react'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import '../styles/CashFlowForm.css'
import { styled } from 'styled-components'

const CashFlow: FC = () => {
  const form = new FormData()

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="form--wrapper">
      <h2>Cash Flow Calculator</h2>
      <Form
        onFinish={onFinish}
        style={{ maxWidth: 600 }}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 16 }}
      >
        <Form.Item label="Property price" name="propertyPrice">
          <Input />
        </Form.Item>
        <Form.Item label="Down payment" name="downPayment">
          <Input />
        </Form.Item>
        <Form.Item label="Interest rate" name="interest">
          <InputNumber min={0} step={0.01} />
        </Form.Item>
        <Form.Item label="HOA fees" name="hoaFees">
          <Input />
        </Form.Item>
        <Form.Item label="Mortgage insurance" name="propertyInsurance">
          <Input />
        </Form.Item>
        <Form.Item label="Loan type">
          <Select>
            {[
              '30-Year-Fixed',
              '20-Year-Fixed',
              '15-Year-Fixed',
              '10-Year-Fixed',
            ].map((loanType) => (
              <Select.Option key={loanType} value={loanType}>
                {loanType}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <StyledAntdButton htmlType="submit" type="primary">
          Submit
        </StyledAntdButton>
      </Form>
    </div>
  )
}

export default CashFlow

const StyledAntdButton = styled(Button)`
  &&.ant-btn.ant-btn-primary {
    color: var(--secondary--color);
    background: var(--orange--color);
    border-radius: 0;
    transition: ease-in 0.2s;

    &:hover {
      border-color: 0;
      background-color: transparent;
      border-radius: 0.8rem;
    }
  }

  &&.ant-btn-primary:hover,
  &&.ant-btn-primary:hover:not(:disabled):not(.ant-btn-disabled) {
    background: #fd7c3c;
  }
`
