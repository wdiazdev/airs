import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { CreateListingFormData, ListingDataResponse } from '../types'
import { Link } from 'react-router-dom'

interface Props {
  userListingsData: ListingDataResponse
}

const Listings = ({ userListingsData }: Props) => {
  return (
    <>
      {userListingsData.data.map(
        (listing: CreateListingFormData, index: number) => {
          return (
            <div
              key={listing._id}
              className="flex justify-between p-3 border items-center hover:shadow-lg ease-in duration-200"
            >
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
                >
                  <FaRegTrashAlt size={22} />
                </button>
                <Link to={`/create-listing/${listing._id}`}>
                  <button
                    type="button"
                    className="p-3 text-primary rounded-lg uppercase hover:opacity-75 ease-in duration-200"
                  >
                    <FaPen size={22} />
                  </button>
                </Link>
              </div>
            </div>
          )
        }
      )}
    </>
  )
}

export default Listings
