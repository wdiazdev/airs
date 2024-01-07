import { useAppSelector } from '../redux/hook'

const Profile = () => {
  const { currentUser } = useAppSelector((state) => state.user)
  console.log('currentUser:', currentUser)
  const handleSubmit = () => {}

  const handleChange = () => {}
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-y max-w-lg pb-16 w-full">
        <h1 className="text-center text-xl font-semibold">Profile</h1>
        <img
          src={currentUser.avatar}
          alt="Profile avatar"
          className="h-24 w-24 rounded-full border-2 border-primary object-cover self-center"
        />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />
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
            // disabled={isLoading}
            className={`py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg 
          ${
            true
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 transition duration-300'
          }`}
          >
            {false ? 'Updating...' : 'Update'}
          </button>
          <div className="flex flex-col gap-4 p-y max-w-lg pb-16 w-full">
            <div className="flex justify-between">
              <span className="text-red-500">Delete Account</span>
              <span className="text-red-500">Sign Out</span>
            </div>
            <button
              type="submit"
              // disabled={isLoading}
              className={`py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg 
          ${
            true
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 transition duration-300'
          }`}
            >
              {false ? 'Updating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
