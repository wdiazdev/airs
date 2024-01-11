import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'
import useUserAuth from '../query/useUserAuth'
import { useAppDispatch } from '../redux/hook'
import { useNavigate } from 'react-router-dom'
import { currentUser } from '../redux/user/userSlice'
import { toast } from 'sonner'

interface Props {
  loadingState?: boolean
}

const GoogleAuth = ({ loadingState }: Props) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { googleSignIn } = useUserAuth()

  const { isLoading }: { isLoading: boolean } = googleSignIn

  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      const data = await googleSignIn.mutateAsync({
        username: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      })
      if (data.success !== false) {
        dispatch(currentUser(data.userData))
        if (data.message.includes('User created through Google successfully')) {
          toast.success('Account created successfully! Welcome aboard.')
        } else if (data.message.includes('Login through Google successfully')) {
          toast.success('Login successful! Welcome back!')
        } else {
          toast.success('Login successful!')
        }
        navigate('/')
      }
    } catch (error) {
      console.log('Error with google auth: ', error)
    }
  }
  return (
    <button
      type="button"
      disabled={isLoading || loadingState}
      onClick={handleGoogleAuth}
      className={`py-3 uppercase bg-red-700 text-white font-semibold rounded-lg 
          ${
            isLoading || loadingState
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-red-500 transition duration-300'
          }`}
    >
      {isLoading ? 'Loading...' : 'Continue with google'}
    </button>
  )
}

export default GoogleAuth
