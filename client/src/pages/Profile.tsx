import { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../redux/hook'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../firebase'
import useUserAuth from '../query/useUserAuth'
import { FormData } from '../types'
import { toast } from 'sonner'
import {
  currentUser as dispatchCurrentUser,
  deleteCurrentUser,
  singOutCurrentUser,
} from '../redux/user/userSlice'
import { Link, useNavigate } from 'react-router-dom'
import useGetUserListing from '../query/useGetUserListing'
import ProfileListingCard from '../components/ProfileListingCard'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileProgress, setFileProgress] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState()
  const [formData, setFormData] = useState<FormData>({})
  const [showListings, setShowListings] = useState<boolean>(false)

  const navigate = useNavigate()

  const { updateUserProfile, deleteUserProfile } = useUserAuth()
  const { isLoading, error }: { isLoading: boolean; error: any } =
    updateUserProfile

  const { getListing } = useGetUserListing(currentUser._id!)
  const { data: userListingsData } = getListing

  useEffect(() => {
    if (file) {
      handleFileUpload(file)
    }
  }, [file])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleFileUpload = (file: File | undefined) => {
    if (file) {
      const storage = getStorage(app)
      const uniqueFileName = new Date().getTime() + file.name
      const storageRef = ref(storage, uniqueFileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          setFileProgress(Math.round(progress))
        },
        (error: any) => {
          setFileUploadError(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            setFormData({ ...formData, avatar: downloadUrl })
          })
        }
      )
    }
  }

  const UserUploadFeedback = () => {
    if (fileUploadError) {
      return (
        <span className="text-red-500 text-center">
          Error uploading your image.
        </span>
      )
    } else if (fileProgress > 0 && fileProgress !== 100) {
      return <span className="text-green-500 text-center">{fileProgress}%</span>
    } else if (fileProgress === 100) {
      return (
        <span className="text-green-500 text-center">
          Photo uploaded successfully!
        </span>
      )
    } else {
      return null
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const data = await updateUserProfile.mutateAsync({
        id: currentUser._id,
        formData,
      })

      if (data.success !== false && data.userData) {
        dispatch(dispatchCurrentUser(data.userData))
        toast.success('Profile updated successfully!')
      } else {
        toast.error('Error updating profile. Please try again.')
      }
    } catch (err) {
      if (error) {
        toast.error('Invalid or missing authentication credentials.')
      }
      console.log(err)
    }
  }

  const handleDeleteUser = async () => {
    try {
      const data = await deleteUserProfile.mutateAsync(currentUser._id)
      if (data.success !== false) {
        toast.success('User deleted successfully!')
      } else {
        toast.error('Error deleting profile. Please try again.')
      }
      dispatch(deleteCurrentUser())
      navigate('/')
    } catch (error) {
      console.log('error:', error)
      if (error) {
        toast.error('Invalid or missing authentication credentials.')
      }
    }
  }

  const handleSignOut = async () => {
    try {
      const res = await fetch('/api/auth/signout')
      const data = await res.json()
      if (data.success !== false) {
        toast.success('User signed out successfully.')
      } else {
        toast.error('Error signing out. Please try again.')
      }
      dispatch(singOutCurrentUser())
      navigate('/')
    } catch (error) {
      console.log('error:', error)
    }
  }

  return (
    <div className="flex justify-center items-center p-2">
      <div className="flex flex-col gap-4 max-w-lg w-full mt-40">
        <h1 className="text-center text-xl font-semibold">Profile</h1>
        <input
          type="file"
          ref={fileRef}
          hidden
          accept="image/*"
          onChange={handleFileChange}
        />

        <img
          onClick={() => {
            if (fileRef.current) {
              fileRef.current.click()
            }
          }}
          src={formData.avatar || currentUser.avatar}
          alt="Profile avatar"
          className="h-28 w-28 object-cover rounded-full border-2 border-primary self-center cursor-pointer"
        />

        <UserUploadFeedback />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser.username}
            className="border-2 border-slate-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            className="border-2 border-slate-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border-2 border-slate-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isLoading || deleteUserProfile.isLoading}
            className={`py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg 
          ${
            isLoading || deleteUserProfile.isLoading
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 ease-in duration-200'
          }`}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          <div className="flex flex-col gap-4 p-y max-w-lg w-full">
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handleDeleteUser}
                className="text-red-700 font-bold hover:opacity-75 ease-in duration-200"
              >
                Delete Account
              </button>
              <button
                type="button"
                onClick={handleSignOut}
                className="text-red-700 font-bold hover:opacity-75 ease-in duration-200"
              >
                Sign Out
              </button>
            </div>
            <Link to={'/create-listing'}>
              <button
                type="button"
                disabled={isLoading}
                className={`py-3 uppercase bg-green-700 text-white font-semibold rounded-lg w-full 
                ${
                  isLoading
                    ? 'opacity-80 cursor-not-allowed'
                    : 'hover:bg-green-600 ease-in duration-200'
                }`}
              >
                New Listing
              </button>
            </Link>
          </div>
        </form>
        <button
          type="button"
          className="text-primary font-bold hover:opacity-75 ease-in duration-200 m-auto"
          onClick={() => setShowListings(!showListings)}
        >
          <div className="flex items-center">
            {showListings ? <FaAngleUp size={18} /> : <FaAngleDown size={18} />}
            Manage Listing
          </div>
        </button>

        {userListingsData?.data && showListings && (
          <ProfileListingCard userListingsData={userListingsData} />
        )}
      </div>
    </div>
  )
}

export default Profile
