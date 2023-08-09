import { FC } from 'react'
import '../styles/Home.css' // Import React
import { Link } from 'react-router-dom'

const Home: FC = () => {
  return (
    <div className="home--container">
      <div className="home--wrapper">
        <Link to="/dashboard">
          <button className="btn">Start</button>
        </Link>
        <h1>Empower Deal Analysis with AI</h1>
      </div>
    </div>
  )
}

export default Home
