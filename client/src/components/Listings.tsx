import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { CreateListingFormData, ListingDataResponse } from '../types'
import { Link } from 'react-router-dom'
import useCreateListing from '../query/useCreateListing'
import { toast } from 'sonner'
import Spinner from './Spinner'
import { useState } from 'react'

interface Props {
  userListingsData: ListingDataResponse
}

const Listings = ({ userListingsData }: Props) => {
  const [deletingStatus, setDeletingStatus] = useState<boolean[]>(
    Array(userListingsData.data.length).fill(false)
  )

  const { deleteListing } = useCreateListing()

  const handleDelete = async (listingId: string, index: number) => {
    setDeletingStatus((prevDeletingStatus) => {
      const updatedLoadingStatus = [...prevDeletingStatus]
      updatedLoadingStatus[index] = true
      return updatedLoadingStatus
    })
    try {
      const res = await deleteListing.mutateAsync(listingId)
      if (res.success !== false) {
        toast.success('Listing deleted successfully')
      } else {
        toast.error('Error deleting your listing')
      }
    } catch (error) {
      console.log(`Error at ${index}:`, error)
    } finally {
      setDeletingStatus((prevDeletingStatus) => {
        const updatedLoadingStatus = [...prevDeletingStatus]
        updatedLoadingStatus[index] = false
        return updatedLoadingStatus
      })
    }
  }

  return (
    <div className="mt-6">
      {userListingsData.data.length > 0 ? (
        <>
          <h2 className="text-center font-semibold text-md">Your Listings</h2>
          {userListingsData.data.map(
            (listing: CreateListingFormData, index: number) => {
              return (
                <div
                  key={listing._id}
                  className={`flex w-full h-36 ${
                    deletingStatus[index]
                      ? 'justify-center'
                      : ' justify-between'
                  } p-3 border items-center hover:shadow-lg ease-in duration-200 my-2`}
                >
                  {deletingStatus[index] ? (
                    <Spinner />
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <img
                          src={listing.imageUrls[0]}
                          alt="listing image"
                          className="h-36- w-36 rounded-lg object-contain"
                        />
                        <span className="font-semibold">{listing.address}</span>
                      </div>

                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 ease-in duration-200"
                          onClick={() => handleDelete(listing._id ?? '', index)}
                        >
                          <FaRegTrashAlt size={22} />
                        </button>
                        <Link to={`/update-listing/${listing._id}`}>
                          <button
                            type="button"
                            className="p-3 text-primary rounded-lg uppercase hover:opacity-75 ease-in duration-200"
                          >
                            <FaPen size={22} />
                          </button>
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              )
            }
          )}
        </>
      ) : (
        <h2 className="text-center font-semibold text-md">No Listings found</h2>
      )}
    </div>
  )
}

export default Listings
