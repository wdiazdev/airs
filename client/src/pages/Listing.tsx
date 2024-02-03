import { useNavigate, useParams } from 'react-router-dom'
import useGetListing from '../query/useGetListing'
import Spinner from '../components/Spinner'
import { CreateListingFormData } from '../types'
import {
  MdSell,
  MdBathroom,
  MdHome,
  MdLocationOn,
  MdBed,
  MdChair,
  MdArrowCircleLeft,
} from 'react-icons/md'
import { FaParking } from 'react-icons/fa'
import { formatCurrency } from '../utils/FormatCurrency'
import { useAppSelector } from '../redux/hook'
import { useState } from 'react'
import ContactAgent from '../components/ContactAgent'

const Listing = () => {
  const params = useParams()

  const navigate = useNavigate()

  const [contact, setContact] = useState<boolean>(false)

  const listingId = params.id ?? ''

  const { currentUser } = useAppSelector((state) => state.user)

  const { getListing } = useGetListing(listingId)
  const { data: fetchedData, isLoading, isFetching, isError } = getListing

  const listingData = fetchedData?.data as CreateListingFormData | undefined

  if (isFetching || isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!listingData) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div>No data available</div>
      </div>
    )
  }

  return (
    <div className="h-screen">
      {listingData && !isLoading && !isError ? (
        <>
          <div className="relative">
            <img
              className="h-[550px] w-full object-cover"
              src={
                listingData.imageUrls[0] ||
                'https://www.ssn.no/build/images/temp/placeholder-house.5fe09041.png'
              }
              alt="listing image"
            />
            <button
              onClick={() => history.back()}
              className="absolute bottom-4 left-4 hover:opacity-75 ease-in duration-200"
            >
              <MdArrowCircleLeft className="text-sm sm:text-[38px] text-primary" />
            </button>
          </div>

          <div className="flex flex-col gap-4 p-2 mt-6 border-b-2">
            <div className="flex items-center gap-1">
              <MdSell className="text-sm sm:text-[20px] text-primary" />
              <span className="font-semibold text-sm sm:text-[20px]">
                {listingData.listingType.charAt(0).toUpperCase() +
                  listingData.listingType.slice(1)}
                {listingData.offer && (
                  <span className=" text-slate-400"> - Pending</span>
                )}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <MdLocationOn className="text-sm sm:text-[20px] text-primary" />
              <span className="font-semibold text-sm sm:text-[20px]">
                {listingData.address}
              </span>
              &nbsp; - &nbsp;
              <span className="font-semibold text-sm sm:text-[20px]">
                {listingData.listingType === 'sale'
                  ? formatCurrency(listingData.price)
                  : `${formatCurrency(listingData.price)}/Month`}
              </span>
            </div>

            <ul className="flex items-center flex-wrap gap-3">
              <li className="flex items-center gap-1" title="Property type">
                <MdHome className="text-sm sm:text-[18px] text-primary" />
                <span className="font-semibold text-sm sm:text-[18px]">
                  {listingData.propertyType.charAt(0).toUpperCase() +
                    listingData.propertyType.slice(1)}
                </span>
              </li>
              <li className="flex items-center gap-1" title="Bedrooms">
                <MdBed className="text-sm sm:text-[18px] text-primary" />
                <span className="font-semibold text-sm sm:text-[18px]">
                  {listingData.bedrooms}
                </span>
              </li>
              <li className="flex items-center gap-1" title="Bathroom">
                <MdBathroom className="text-sm sm:text-[18px] text-primary" />
                <span className="font-semibold text-sm sm:text-[18px]">
                  {listingData.bathrooms}
                </span>
              </li>
              {listingData.listingType === 'rent' && (
                <li className="flex items-center gap-1" title="Furnished">
                  <MdChair className="text-sm sm:text-[18px] text-primary" />
                  <span className="font-semibold text-sm sm:text-[18px]">
                    {listingData.furnished ? 'Yes' : 'No'}
                  </span>
                </li>
              )}
              <li className="flex items-center gap-1" title="Parking">
                <FaParking className="text-sm sm:text-[18px] text-primary" />
                <span className="font-semibold text-sm sm:text-[18px]">
                  {listingData.parking === true ? 'Yes' : 'No parking'}
                </span>
              </li>
            </ul>

            <div className="">
              <span className="font-semibold text-sm sm:text-[20px]">
                Property Details:
              </span>

              <p className="text-sm sm:text-[20px] text-justify">
                {listingData.description}
              </p>
            </div>
            {currentUser &&
              currentUser._id !== listingData.userId &&
              !contact && (
                <button
                  type="button"
                  className="py-3 px-4 uppercase bg-customBlue text-white text-[14px] sm:text-[18px] font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200 m-auto"
                  onClick={() => setContact(true)}
                >
                  Contact agent
                </button>
              )}
            {contact && (
              <ContactAgent
                userId={listingData.userId}
                address={listingData.address}
              />
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Listing
