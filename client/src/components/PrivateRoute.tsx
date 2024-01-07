import { useAppSelector } from '../redux/hook'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  return currentUser._id ? <Outlet /> : <Navigate to={'/sign-in'} />
}

export default PrivateRoute
