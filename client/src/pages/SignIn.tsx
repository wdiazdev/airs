import { Link } from 'react-router-dom'

const SignIn = () => {
  return (
    <div className="p-y max-w-lg mx-auto">
      <h1 className="text-center text-custom-black text-xl font-semibold">
        Sign In
      </h1>
      <form className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <button
          type="submit"
          className="py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-500 transition duration-300"
        >
          Sign In
        </button>
        {/* <button
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
        </button> */}
        {/* <p className="text-red-500">{fetchError}</p> */}
      </form>
      <div className="flex gap-2 mt-4">
        <p>Dont have an account?</p>
        <Link to="/sign-up">
          <span className="text-blue-700">Sign Up</span>
        </Link>
      </div>
    </div>
  )
}

export default SignIn
