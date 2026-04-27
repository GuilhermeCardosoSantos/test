type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export default function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      className="py-4 w-12/12 select-none rounded-3xl transition  bg-white text-black"
      {...props}
    >
      {children}
    </button>
  )
}