import { FC } from 'react'
import { Button, Form, Input, InputNumber, Select } from 'antd'
import '../styles/CashFlowForm.css'

const CashFlowForm: FC = () => {
  const form = new FormData()

  const onFinish = (values: any) => {
    console.log(values)
  }

  return (
    <div className="form--wrapper">
      <h2>Property Details</h2>
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
        <p>Expenses</p>
        <Button
          type="primary"
          htmlType="submit"
          style={{ fontFamily: 'var(--secondary--font)' }}
        >
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default CashFlowForm
