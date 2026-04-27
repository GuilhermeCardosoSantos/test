export default function NotFound() {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-4 bg-black text-white">
        <h1 className="text-5xl font-bold">404</h1>
        <p className="text-lg text-gray-300">
          Ops! A página que você procura não existe.
        </p>
      </div>
    )
  }