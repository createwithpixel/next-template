'use client'
import VisitorLayout from "../components/VisitorLayout"
import { useAppContext } from "../contexts/AppContext"

export default function Login() {
  const { login } = useAppContext()
  return (
    <VisitorLayout>
      <div className="min-h-[80vh] w-full flex items-center justify-center  ">
        <button
          className="px-4 py-3 bg-black text-white rounded-lg shadow-md"
          onClick={() => login('johndoe@example.com', 'Test1234')}
        >
          Fake login
        </button>
      </div>
    </VisitorLayout>
  )
}
