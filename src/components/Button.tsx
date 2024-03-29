import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
  label: string
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  outline?: boolean
  disabled?: boolean
  icon?: IconType
  small?: boolean
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  outline,
  disabled,
  icon : Icon,
  small,
}) => {
  return (
    <button
      type='submit'
      onClick={onClick}
      disabled={disabled}
      className={`
        relative
        disabled:opacity-70
        disabled;cursor-not-allowed
        rounded-lg
        hover:opacity-80
        transition
        w-full
        ${outline ? 'bg-white' : 'bg-orange-500'}
        ${outline ? 'border-black' : 'border-orange-500'}
        ${outline ? 'text-black' : 'text-white'}
        ${small ? 'text-sm' : 'text-md'}
        ${small ? 'py-1' : 'py-3'}
        ${small ? 'font-light' : 'font-semibold'}
        ${small ? 'border-[1px]' : 'border-2'}
      `}
    >
      {Icon && (
        <Icon 
          size={24}
          className='absolute left-4 top-3'
        />
      )}
      {label}
    </button>
  )
}

export default Button