import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FormData } from '../types'
import useUserAuth from '../query/useUserAuth'
import { toast } from 'sonner'
import { useAppDispatch } from '../redux/hook'
import { currentUser } from '../redux/user/userSlice'
import GoogleAuth from '../components/GoogleAuth'

const SignIn = () => {
  const dispatch = useAppDispatch()

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const { signInUser } = useUserAuth()

  const { isLoading, error }: { isLoading: boolean; error: any } = signInUser

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    try {
      const data = await signInUser.mutateAsync(formData)
      if (data.success !== false && data.userData) {
        dispatch(currentUser(data.userData))
        toast.success('Login successfully!')
      }
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error('Unable to login!')
    }
  }

  return (
    <div className="flex items-center justify-center h-full p-2">
      <div className="flex flex-col p-y max-w-lg pb-16 w-full">
        <h1 className="text-center text-xl font-semibold mb-4">Sign In</h1>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
            {isLoading ? 'Loading...' : 'Sign In'}
          </button>
          <GoogleAuth loadingState={isLoading} />
          <p className="text-red-700">{error && error.message}</p>
        </form>
        <div className="flex gap-2 mt-4">
          <p>Don't have an account?</p>
          <Link to="/sign-up">
            <span className="text-primary font-bold hover:opacity-75 ease-in duration-200">
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default SignIn
