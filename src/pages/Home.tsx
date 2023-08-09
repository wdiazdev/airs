import { FC } from 'react'
import '../styles/Home.css' // Import React

const Home: FC = () => {
  return (
    <div className="home--container">
      <div className="home--wrapper">
        <button className="btn">Start</button>
        <h1>Empower Deal Analysis with AI</h1>
      </div>
    </div>
  )
}

export default Home
