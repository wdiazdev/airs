import { ChangeEvent, useState } from 'react'
import { app } from '../firebase'
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage'
import Spinner from '../components/Spinner'
import { FaRegTrashAlt } from 'react-icons/fa'
import { CreateListingFormData } from '../types'
import { useAppSelector } from '../redux/hook'

const CreateListing = () => {
  const { currentUser } = useAppSelector((state) => state.user)

  const [files, setFiles] = useState([])
  const [imageUploadError, setImageUploadError] = useState<string>()
  const [isLoading, setIsisLoading] = useState<boolean>(false)

  const [formData, setFormData] = useState<CreateListingFormData>({
    type: 'sell',
    name: '',
    description: '',
    address: '',
    price: 0,
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    offer: false,
    imageUrls: [],
    userRef: '',
  })
  console.log('formData:', formData)

  const handleUploadImages = () => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setIsisLoading(true)
      const imagesToUpload = []

      for (let i = 0; i < files.length; i++) {
        imagesToUpload.push(uploadImage(files[i]))
      }
      Promise.all(imagesToUpload)
        .then((urls: any) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          })
        })
        .catch((err) => {
          console.log('err:', err)
          setImageUploadError('Error uploading images. Please try again.')
        })
        .finally(() => {
          setIsisLoading(false)
        })
    } else if (files.length === 0) {
      setImageUploadError('Please, upload at least one image.')
    } else {
      setImageUploadError('You can only upload 6 images.')
    }
  }

  const uploadImage = async (file: any) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const uniqueFileName = new Date().getTime() + file.name
      const storageRef = ref(storage, uniqueFileName)
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('progress:', progress)
        },
        (error) => {
          reject(error)
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
            resolve(downloadUrl)
          })
        }
      )
    })
  }

  //type guard checks whether the target is an HTMLInputElement
  const isInputElement = (target: EventTarget): target is HTMLInputElement => {
    return 'checked' in target
  }

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.id === 'rent' || e.target.id === 'sell') {
      setFormData({
        ...formData,
        type: e.target.id,
      })
    }
    if (isInputElement(e.target)) {
      if (e.target.id === 'parking' || e.target.id === 'offer') {
        setFormData({
          ...formData,
          [e.target.id]: e.target.checked,
        })
      }
    }
    if (
      e.target.type === 'number' ||
      e.target.type === 'text' ||
      e.target.type === 'textarea'
    ) {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      })
    }
  }

  const handleDeleteImage = (index: number) => {
    setImageUploadError('')
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen p-2 pb-16">
      <h1 className="text-center text-xl font-semibold mb-4">Create Listing</h1>
      <form className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 w-full sm:max-w-xl">
          <input
            type="text"
            placeholder="Enter the full address of the property"
            id="address"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
            value={formData.address}
          />
          <input
            type="text"
            placeholder="Name"
            id="name"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            value={formData.name}
            required
          />
          <textarea
            placeholder="Provide a detailed description of the property"
            id="description"
            className="border border-gray-300 rounded-lg p-3 focus:outline-none"
            onChange={handleChange}
            required
            value={formData.description}
          />
          <div className="flex sm:flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="sell"
                className="h-4 w-4"
                onChange={handleChange}
                checked={formData.type === 'sell'}
              />
              <span className="font-semibold">Sell</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="rent"
                className="h-4 w-4"
                onChange={handleChange}
                checked={formData.type === 'rent'}
              />
              <span className="font-semibold">Rent</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="parking"
                className="h-4 w-4"
                onChange={handleChange}
                checked={formData.parking}
              />
              <span className="font-semibold">Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="offer"
                className="h-4 w-4"
                onChange={handleChange}
                checked={formData.offer}
              />
              <span className="font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={0}
                max={15}
                step={1}
                className="w-18 p-3 border border-gray-300 rounded-lg focus:outline-none [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <span className="font-semibold">Beds</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={0}
                max={15}
                step={1}
                className="w-18 p-3 border border-gray-300 rounded-lg focus:outline-none [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                required
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <span className="font-semibold">Baths</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-black sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  id="price"
                  className="p-3 pl-7 border border-gray-300 rounded-lg focus:outline-none [appearance:textfield]
                [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  onChange={handleChange}
                  value={formData.price}
                />
              </div>
              {formData.type === 'rent' ? (
                <div className="flex flex-col items-center">
                  <span className="font-semibold">Price</span>
                  <span className="text-gray-500">($/Month)</span>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <span className="font-semibold">Price</span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full sm:max-w-xl">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Images:</span>
            <span className="text-gray-500">Max 6 images.</span>
          </div>
          <div className="flex gap-2 border border-gray-500 rounded-lg p-2">
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              className="p-3 border-gray-300 rounded-lg w-full"
              onChange={(e: any) => setFiles(e.target.files)}
              onClick={() => setImageUploadError('')}
            />
            <button
              type="button"
              className="flex items-center justify-center w-[100px] px-2 uppercase bg-customBlue text-white font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200"
              onClick={handleUploadImages}
            >
              {isLoading ? <Spinner /> : 'Upload'}
            </button>
          </div>
          {imageUploadError && (
            <p className="text-red-700">{imageUploadError}</p>
          )}
          {formData.imageUrls.length > 0 &&
            formData.imageUrls.map((imgUrl, index) => {
              return (
                <div
                  key={index}
                  className="flex justify-between p-3 border items-center hover:shadow-lg ease-in duration-200"
                >
                  <img
                    key={index}
                    src={imgUrl}
                    alt={`listing image ${index}`}
                    className="h-40- w-40 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleDeleteImage(index)}
                    className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 ease-in duration-200"
                  >
                    <FaRegTrashAlt size={22} />
                  </button>
                </div>
              )
            })}
          <button
            disabled={isLoading}
            className={`py-3 uppercase bg-green-700 text-white font-semibold rounded-lg w-full 
            ${
              isLoading
                ? 'opacity-80 cursor-not-allowed'
                : 'hover:bg-green-600 ease-in duration-200'
            }`}
          >
            Create Listing
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateListing
