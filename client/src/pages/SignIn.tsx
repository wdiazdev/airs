import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormData } from '../types'
import useUserAuth from '../query/useUserAuth'
import { toast } from 'sonner'

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { signInUser } = useUserAuth()

  const {
    isError,
    isLoading,
    error,
  }: { isError: boolean; isLoading: boolean; error: any } = signInUser

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      await signInUser.mutateAsync(formData)
      if (!isError) {
        toast.success('Login successfully!')
      }
      setTimeout(() => {
        navigate('/')
      }, 1000)
    } catch (error) {
      console.log(error)
      toast.error('Unable to login!')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col p-y max-w-lg pb-16 w-full">
        <h1 className="text-center text-custom-black text-xl font-semibold">
          Sign In
        </h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg 
          ${
            isLoading
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 transition duration-300'
          }`}
          >
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
          <p className="text-red-500">{error && error.message}</p>
        </form>
        <div className="flex gap-2 mt-4">
          <p>Dont have an account?</p>
          <Link to="/sign-up">
            <span className="text-primary">Sign Up</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
