import { FC, HTMLAttributes } from 'react'
import { FieldError } from 'react-hook-form'
import { cn } from '~/utils/classNames'
import ErrorAlert from './ErrorAlert'

interface ISelector extends HTMLAttributes<HTMLDivElement> {
  options: { value: string; label: string }[]
  label: string
  value: string
  setValue: (value: string) => void
  error?: FieldError
}

const Selector: FC<ISelector> = ({
  options,
  label,
  setValue,
  value,
  error,
}) => {
  return (
    <div className="flex w-full flex-col">
      <div className="flex flex-row items-center gap-2">
        <label>{label}</label>
        {error && <ErrorAlert error={error} />}
      </div>

      <div className="flex flex-row justify-around gap-4 py-1">
        {options.map((item) => (
          <div
            className="flex cursor-pointer flex-row items-center gap-1"
            key={`${item.label}-${item.value}`}
          >
            <div
              className={cn([
                'h-3 w-3 rounded-full border border-black',
                { 'bg-gray-400': item.value === value },
              ])}
              onClick={() => setValue(item.value)}
            />
            <label>{item.label}</label>
          </div>
        ))}
      </div>
    </div>
  )
}
export default Selector
