import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import NavBar from './components/Navbar'
import { Toaster } from 'sonner'

const App: FC = () => {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route index path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Toaster richColors />
    </div>
  )
}

export default App
