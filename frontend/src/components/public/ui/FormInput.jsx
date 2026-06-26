import { useState } from 'react'

function EyeToggle({ isVisible, onToggle }) {
  return (
    <button
      type="button"
      aria-label={isVisible ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
      aria-pressed={isVisible}
      className="absolute right-5 top-1/2 grid h-[22px] w-[22px] -translate-y-1/2 place-items-center border-0 bg-transparent p-0 text-[rgba(193,194,196,0.88)] transition-colors duration-[160ms] hover:text-white max-[640px]:right-4 max-[640px]:h-5 max-[640px]:w-5"
      onClick={onToggle}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-full w-full fill-none stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:1.8]"
      >
        <path d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" />
        <circle cx="12" cy="12" r="3" />
        {isVisible ? <path d="M4 4l16 16" /> : null}
      </svg>
    </button>
  )
}

const sizeClasses = {
  default:
    'min-h-[50px] px-5 py-3.5 max-[640px]:min-h-11 max-[640px]:px-4 max-[640px]:py-2.5 max-[640px]:text-sm',
  compact:
    'min-h-[50px] px-5 py-3.5 max-[640px]:min-h-[42px] max-[640px]:px-4 max-[640px]:py-[9px] max-[640px]:text-sm',
}

function FormInput({
  label,
  type = 'text',
  name,
  placeholder,
  value,
  onChange,
  required = false,
  autoComplete,
  size = 'default',
}) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const isPassword = type === 'password'
  const resolvedType = isPassword && isPasswordVisible ? 'text' : type
  const inputClassName = [
    'w-full rounded-full border border-[rgba(255,255,255,0.42)] bg-transparent text-[rgba(255,255,255,0.96)] outline-none transition-[border-color,box-shadow] duration-[160ms] placeholder:text-[rgba(193,194,196,0.75)] focus:border-white/70 focus:shadow-[0_0_0_3px_rgba(255,255,255,0.12)]',
    sizeClasses[size] ?? sizeClasses.default,
    isPassword ? 'pr-14 max-[640px]:pr-12' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const inputElement = (
    <input
      type={resolvedType}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      autoComplete={autoComplete}
      className={inputClassName}
    />
  )

  return (
    <label className="flex flex-col gap-1.5 text-lg font-medium text-[rgba(255,255,255,0.96)] max-[640px]:gap-[5px] max-[640px]:text-sm">
      <span>{label}</span>
      {isPassword ? (
        <span className="relative block">
          {inputElement}
          <EyeToggle
            isVisible={isPasswordVisible}
            onToggle={() => setIsPasswordVisible((currentValue) => !currentValue)}
          />
        </span>
      ) : (
        inputElement
      )}
    </label>
  )
}

export default FormInput
