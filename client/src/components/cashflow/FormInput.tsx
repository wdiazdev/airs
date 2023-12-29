import { FC } from 'react'

type Props = {
  name?: string
  id?: string
  required?: boolean
  defaultValue?: number | string
  label?: string
  symbol?: string
  description?: string
}

const FormInput: FC<Props> = ({
  name,
  id,
  required,
  defaultValue,
  label,
  symbol,
  description,
}) => {
  return (
    <div className="flex flex-col gap-0">
      {label && (
        <label htmlFor={name} className="block text-sm text-white">
          {label}
        </label>
      )}
      <div className="relative">
        {symbol && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-white sm:text-sm">$</span>
          </div>
        )}

        <input
          type="number"
          name={name}
          id={id}
          placeholder="0"
          min="0"
          step="0.01"
          autoComplete="off"
          required={required}
          defaultValue={defaultValue}
          className="w-full rounded-md bg-zinc-800 hover:bg-zinc-700 
        text-white placeholder-white py-3 pl-7 border-none [appearance:textfield]
        [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      {description && <p className="text-sm text-zinc-500">{description}</p>}
    </div>
  )
}

export default FormInput
