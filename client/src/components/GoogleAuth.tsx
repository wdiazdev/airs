import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase'

const GoogleAuth = () => {
  const handleGoogleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      //   console.log('result:', result)
    } catch (error) {
      console.log('Error with google auth: ', error)
    }
  }
  return (
    <button
      type="button"
      onClick={handleGoogleAuth}
      className="py-3 uppercase bg-red-700 text-white font-semibold rounded-lg hover:bg-red-500 transition duration-300"
    >
      Continue with google
    </button>
  )
}

export default GoogleAuth
