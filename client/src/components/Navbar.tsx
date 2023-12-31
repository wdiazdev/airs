import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { HouseIcon, BarIcon, XMark } from '../icons/Icons'
import { useAppSelector } from '../redux/hook'

const NavBar: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  const [menuOpen, setMenuOpen] = useState<boolean>(true)

  const handleClick = () => setMenuOpen(!menuOpen)

  const handleResize = () => {
    if (window.innerWidth > 640) {
      setMenuOpen(true)
    }
  }

  useEffect(() => {
    handleResize()

    // Add event listener for window resize
    window.addEventListener('resize', handleResize)

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <nav>
      <div
        className="h-16 absolute z-40 w-full bg-zinc-950 bg-opacity-80 border-b 
      border-primary shadow-sm shadow-primary flex items-center justify-between px-12"
      >
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-[25px]">
            <div className="flex justify-center items-center">
              <HouseIcon width={28} color="white" stroke="2" />
              <h2 className="mt-1 ml-1 font-bold">AIRA</h2>
            </div>
          </Link>
        </div>
        <div className="flex gap-4 items-center">
          <Link
            to="/dashboard"
            className="hidden sm:inline text-md text-white hover:text-primary ease-in duration-200"
          >
            Dashboard
          </Link>
          {currentUser._id ? (
            <Link to={'/profile'}>
              <img
                src={currentUser.avatar}
                alt="Profile avatar"
                className="h-12 w-12 rounded-full border-2 border-primary object-cover"
              />
            </Link>
          ) : (
            <Link
              to="/sign-in"
              className="hidden sm:inline text-md text-white hover:text-primary ease-in duration-200"
            >
              Sign In
            </Link>
          )}
        </div>

        <div
          className="absolute left-2.5 bottom-4 cursor-pointer sm:hidden"
          onClick={handleClick}
        >
          {menuOpen ? (
            <BarIcon width={28} color="white" stroke="1.5" />
          ) : (
            <XMark width={28} color="white" stroke="1.5" />
          )}
        </div>

        <div
          className={
            menuOpen
              ? 'hidden'
              : 'fixed top-[65px] right-0 w-full min-h-screen flex flex-col justify-center items-center bg-black bg-opacity-90'
          }
        >
          <div className="flex flex-col items-center justify-center text-white text-md gap-4 mb-12">
            <div
              onClick={handleClick}
              className="hover:text-primary ease-in duration-200"
            >
              <Link to="/">Home</Link>
            </div>
            <div
              onClick={handleClick}
              className="hover:text-primary ease-in duration-200"
            >
              <Link to="/dashboard">Dashboard</Link>
            </div>
            <div className="hover:text-red-500 ease-in duration-200 cursor-pointer">
              Logout
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
