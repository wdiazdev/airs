import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormData } from '../types'
import useUserAuth from '../query/useUserAuth'
import { toast } from 'sonner'
import GoogleAuth from '../components/GoogleAuth'

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
  })

  const navigate = useNavigate()

  const { signUpNewUser } = useUserAuth()

  const { isLoading, error }: { isLoading: boolean; error: any } = signUpNewUser

  let fetchError

  if (error) {
    fetchError = error.message.includes('duplicate')
      ? 'The username or email already exists, please try with different credentials.'
      : 'Unknown error, Please try again'
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await signUpNewUser.mutateAsync(formData)
      if (data.success !== false) {
        toast.success('User created successfully!')
      }
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
      toast.error('Unable to create user')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen p-2">
      <div className="flex flex-col p-y max-w-lg pb-16 w-full">
        <h1 className="text-center text-xl font-semibold mb-4">Sign Up</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border-2 border-slate-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="border-2 border-slate-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border-2 border-slate-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`py-3 uppercase bg-customBlue text-white font-semibold rounded-lg 
          ${
            isLoading
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 ease-in duration-200'
          }`}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
          <GoogleAuth loadingState={isLoading} />
          <p className="text-red-700">{fetchError}</p>
        </form>
        <div className="flex gap-2 mt-4">
          <p>Have an account?</p>
          <Link to="/sign-in">
            <span className="text-primary font-bold hover:opacity-75 ease-in duration-200">
              Sign In
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignUp
