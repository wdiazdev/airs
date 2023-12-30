import { ChangeEvent, FormEvent, useState } from 'react'
import { Link } from 'react-router-dom'
import { FormData } from '../types'

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    username: '',
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    const data = await response.json()
    console.log('data:', data)
  }

  return (
    <div className="p-y max-w-lg mx-auto">
      <h1 className="text-center text-custom-black text-xl font-semibold">
        Sign Up
      </h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border rounded-lg p-3"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="py-3 uppercase bg-slate-500 text-white rounded-lg 
          hover:bg-primary-hover transition duration-300 disabled:opacity-80"
        >
          Sign Up
        </button>
      </form>
      <div className="flex gap-2 mt-4">
        <p>Have an account?</p>
        <Link to="/sign-in">
          <span className="text-blue-500">Sign In</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
