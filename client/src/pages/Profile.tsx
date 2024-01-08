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
import { currentUser as dispatchCurrentUser } from '../redux/user/userSlice'

const Profile = () => {
  const dispatch = useAppDispatch()
  const { currentUser } = useAppSelector((state) => state.user)

  const fileRef = useRef<HTMLInputElement | null>(null)
  const [file, setFile] = useState<File | undefined>(undefined)
  const [fileProgress, setFileProgress] = useState<number>(0)
  const [fileUploadError, setFileUploadError] = useState()
  const [formData, setFormData] = useState<FormData>({})

  const { updateUserProfile } = useUserAuth()
  const { isLoading, error }: { isLoading: boolean; error: any } =
    updateUserProfile

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

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 p-y max-w-lg pb-16 w-full">
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
          className="h-24 w-24 rounded-full border-2 border-primary object-cover self-center cursor-pointer"
        />
        <UserUploadFeedback />
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            id="username"
            defaultValue={currentUser.username}
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="email"
            placeholder="Email"
            id="email"
            defaultValue={currentUser.email}
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="border rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={isLoading}
            className={`py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg 
          ${
            isLoading
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 transition duration-300'
          }`}
          >
            {isLoading ? 'Updating...' : 'Update'}
          </button>
          <div className="flex flex-col gap-4 p-y max-w-lg pb-16 w-full">
            <div className="flex justify-between">
              <span className="text-red-500">Delete Account</span>
              <span className="text-red-500">Sign Out</span>
            </div>
            <button
              type="submit"
              // disabled={isLoading}
              className={`py-3 uppercase bg-blue-700 text-white font-semibold rounded-lg 
          ${
            true
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:bg-blue-500 transition duration-300'
          }`}
            >
              {false ? 'Updating...' : 'Create Listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Profile
