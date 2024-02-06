type Props = {
  name?: string
  id?: string
  required?: boolean
  defaultValue?: number | string
  label?: string
  symbol?: string
  description?: string
}

const FormInput = ({
  name,
  id,
  required,
  defaultValue,
  label,
  symbol,
  description,
}: Props) => {
  return (
    <div className="flex flex-col gap-0">
      {label && (
        <label htmlFor={name} className="block text-sm text-slate-500">
          {label}
        </label>
      )}
      <div className="relative">
        {symbol && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <span className="text-slate-500 sm:text-sm">$</span>
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
          className="w-full border-2 border-slate-300 rounded-lg p-3 py-3 pl-7 focus:outline-none"
        />
      </div>
      {description && (
        <p className="text-[12px] text-slate-500">{description}</p>
      )}
    </div>
  )
}

export default FormInput
