import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div
      className="relative min-h-screen w-full p-4 
      bg-no-repeat bg-cover bg-center flex items-end justify-center
      bg-[url('/src/assets/homeBg.jpg')]"
    >
      <div className="fixed inset-0 bg-black bg-opacity-60 z-0"></div>
      <div className="flex flex-col items-center justify-center gap-3 py-20 z-30">
        <Link to="/dashboard">
          <button
            title="Start"
            className="text-md text-white bg-primary hover:bg-primary-hover transition delay-100"
          >
            Start
          </button>
        </Link>
        <h1 className="sm:text-2xl text-[20px] font-bold text-white text-center">
          Empower Deal Analysis with AI
        </h1>
      </div>
    </div>
  )
}

export default Home
