import { FC } from 'react'
import { Link } from 'react-router-dom'
import '../styles/Navbar.css'

const Navbar: FC = () => {
  return (
    <div className="nav--container">
      <Link to="/">
        <h3 className="nav--brand">AI Real State</h3>
      </Link>
      <div>
        <Link to="/dashboard" className="nav--item">
          Dashboard
        </Link>
      </div>
    </div>
  )
}

export default Navbar
