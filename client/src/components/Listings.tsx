import { FaPen, FaRegTrashAlt } from 'react-icons/fa'
import { CreateListingFormData, ListingDataResponse } from '../types'

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
              key={index}
              className="flex justify-between p-3 border items-center hover:shadow-lg ease-in duration-200"
            >
              <img
                src={listing.imageUrls[0]}
                alt="listing image"
                className="h-40- w-40 rounded-lg object-cover"
              />
              <span>{listing.address}</span>

              <div className="flex flex-col">
                <button
                  type="button"
                  className="p-3 text-red-700 rounded-lg uppercase hover:opacity-75 ease-in duration-200"
                >
                  <FaRegTrashAlt size={22} />
                </button>
                <button
                  type="button"
                  className="p-3 text-primary rounded-lg uppercase hover:opacity-75 ease-in duration-200"
                >
                  <FaPen size={22} />
                </button>
              </div>
            </div>
          )
        }
      )}
    </>
  )
}

export default Listings
