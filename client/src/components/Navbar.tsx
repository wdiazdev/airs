import { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAppSelector } from '../redux/hook'
import { FaUserCircle, FaHome, FaBars, FaTimes, FaSearch } from 'react-icons/fa'

const NavBar: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  const navigate = useNavigate()

  const [menuOpen, setMenuOpen] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')

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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    console.log('urlParams:', urlParams)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermInUrl = urlParams.get('searchTerm')
    if (searchTermInUrl && typeof searchTermInUrl === 'string') {
      setSearchTerm(searchTermInUrl)
    }
  }, [location.search])

  return (
    <nav>
      <div
        className="h-16 absolute z-40 w-full bg-zinc-950 bg-opacity-80 border-b 
      border-primary shadow-sm shadow-primary flex items-center justify-between px-12"
      >
        <div className="flex justify-between items-center">
          <Link to="/" className="text-white text-[25px]">
            <div className="flex items-center">
              <FaHome size={28} />
              <h2 className="mt-1 ml-1 font-bold">AIRA</h2>
            </div>
          </Link>
        </div>
        <form
          onSubmit={handleSubmit}
          className="bg-white flex items-center p-2 rounded-lg"
        >
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent focus:outline-none w-18 sm:w-64"
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e.target.value)
            }
            value={searchTerm}
          />
          <button>
            <FaSearch size={26} />
          </button>
        </form>
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
              <FaUserCircle size={28} />
            </Link>
          )}
        </div>

        <div
          className="absolute left-2.5 bottom-4 cursor-pointer sm:hidden"
          onClick={handleClick}
        >
          {menuOpen ? (
            <FaBars size={28} color="white" />
          ) : (
            <FaTimes size={28} color="white" />
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
