import { ReactNode } from "react"

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  icon?: ReactNode
}

export default function Input({ icon, ...props }: InputProps) {
  return (
    <div className="relative w-full no-select">
      
      {icon && (
        <div className="absolute left-10 top-1/2 -translate-y-1/2 text-gray-500 no-select">
          {icon}
        </div>
      )}
      <input
        className="w-full bg-white rounded-3xl  h-14 pl-18 pr-3 border placeholder-gray-500 text-gray-600 focus:outline-none focus:ring-2 focus:ring-primary border-none"
        {...props}
      />
    </div>
  )
}