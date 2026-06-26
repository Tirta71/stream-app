const variantClasses = {
  primary:
    'border border-transparent bg-[#2f3334] font-semibold hover:-translate-y-px hover:bg-[#3a4042]',
  outline:
    'border border-[rgba(255,255,255,0.42)] bg-transparent font-semibold hover:-translate-y-px hover:border-white/70',
}

const sizeClasses = {
  auth: 'w-full min-h-[50px] px-5 py-3.5 max-[640px]:min-h-11 max-[640px]:px-4 max-[640px]:py-2.5 max-[640px]:text-sm',
  authCompact:
    'w-full min-h-[50px] px-5 py-3.5 max-[640px]:min-h-[42px] max-[640px]:px-4 max-[640px]:py-[9px] max-[640px]:text-sm',
}

function Button({
  children,
  type = 'button',
  variant = 'primary',
  size = 'auth',
  className = '',
  onClick,
  ...props
}) {
  const buttonClassName = [
    'inline-flex items-center justify-center gap-3 rounded-full text-[rgba(255,255,255,0.96)] transition-[transform,background,border-color] duration-[160ms]',
    variantClasses[variant] ?? variantClasses.primary,
    sizeClasses[size] ?? '',
    props.disabled ? 'cursor-not-allowed opacity-60 hover:translate-y-0' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={type} className={buttonClassName} onClick={onClick} {...props}>
      {children}
    </button>
  )
}

export default Button
