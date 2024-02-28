import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FaSearch, FaRegTimesCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

interface Props {
  fullWidth?: boolean
}
const SearchBar = ({ fullWidth }: Props) => {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState<string>('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(location.search)
    urlParams.set('searchTerm', searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search)
    const searchTermInUrl = urlParams.get('searchTerm')
    if (searchTermInUrl && typeof searchTermInUrl === 'string') {
      setSearchTerm(searchTermInUrl)
    } else if (!searchTermInUrl) {
      setSearchTerm('')
    }
  }, [location.search])

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white flex items-center rounded-lg w-70 py-3 px-2"
    >
      <button type="submit">
        <FaSearch className="text-[20px] sm:text-[24px] text-slate-600 mr-2 hover:opacity-75 ease-in duration-200" />
      </button>

      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent focus:outline-none w-18 sm:w-64 flex-1"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        value={searchTerm}
      />
      {searchTerm.length > 0 ? (
        <button onClick={() => setSearchTerm('')}>
          <FaRegTimesCircle className="text-[20px] ml-1 text-slate-600 hover:opacity-75 ease-in duration-200" />
        </button>
      ) : (
        <div className="w-[24px]" />
      )}
    </form>
  )
}

export default SearchBar
