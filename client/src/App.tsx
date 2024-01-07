import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import NavBar from './components/Navbar'
import {
  Home,
  Profile,
  SignIn,
  SignUp,
  Dashboard,
  About,
  PrivateRoute,
} from './pages'

const App = () => {
  return (
    <div className="bg-primary h-screen">
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route element={<PrivateRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
        <Toaster richColors />
      </BrowserRouter>
    </div>
  )
}

export default App
