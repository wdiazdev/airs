import { Input } from '@nextui-org/react'
import { FC } from 'react'

type props = {
  type: string
  label: string
  name: string
  placeholder: string
}

const FormInput: FC<props> = ({ type, label, name, placeholder }) => {
  const styles = {
    label: 'text-white text-sm ',
    input: ['text-white', 'placeholder:text-white', 'bg-default-200/50'],

    innerWrapper: ['bg-zinc-800', 'hover:bg-zinc-800'],
    inputWrapper: [
      'bg-zinc-800',
      'hover:bg-zinc-800',
      'hover:bg-default-200/70',
      'dark:hover:bg-default/70',
      'group-data-[focused=true]:bg-default-200/50',
      'dark:group-data-[focused=true]:bg-default/60',
    ],
  }

  return (
    <>
      <Input
        type="number"
        label="Property price"
        name="propertyPrice"
        placeholder="0.00"
        labelPlacement="outside"
        classNames={styles}
        min="0"
        startContent={
          <div className="pointer-events-none flex items-center">
            <span className="text-white text-small">$</span>
          </div>
        }
      />
    </>
  )
}

export default FormInput
