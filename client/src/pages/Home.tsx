import { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import SearchBar from '../components/SearchBar'

const Home = () => {
  return (
    <div className="">
      <div
        className="h-[700px] relative p-2 
      bg-no-repeat bg-cover bg-center flex items-center justify-center
      bg-[url('/src/assets/homeBg.jpg')]"
      >
        <div className="h-[700px] fixed inset-0 bg-black bg-opacity-60 z-0"></div>
        <div className="flex flex-col items-center gap-3 z-30">
          <h1 className="sm:text-xl text-[26px] font-bold text-white text-center">
            The<span className="text-primary"> #1 </span>site real estate
            <br /> professionals trust
          </h1>
          <SearchBar fullWidth />
        </div>
      </div>
      <div>Test</div>
    </div>
  )
}

export default Home
