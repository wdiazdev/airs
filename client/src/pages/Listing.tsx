import { useParams } from 'react-router-dom'
import useGetListing from '../query/useGetListing'
import Spinner from '../components/Spinner'
import { CreateListingFormData } from '../types'
import { MdSell, MdBathtub, MdHome, MdLocationOn, MdBed } from 'react-icons/md'
import { FaParking } from 'react-icons/fa'
import { formatCurrency } from '../utils/FormatCurrency'

const Listing = () => {
  const params = useParams()

  const listingId = params.id ?? ''

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
          <img
            className="h-[550px] w-full object-cover"
            src={listingData.imageUrls[0]}
            alt="listing image"
          />

          <div className="flex flex-col gap-6 p-2 mt-6 border-b border-gray-300">
            <div className="flex items-center gap-1">
              <MdSell className="text-sm sm:text-[26px] text-primary" />
              <span className="font-semibold text-sm sm:text-[26px]">
                {listingData.listingType}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <MdLocationOn className="text-sm sm:text-[26px] text-primary" />
              <span className="font-semibold text-sm sm:text-[26px]">
                {listingData.address}
              </span>
              &nbsp; - &nbsp;
              <span className="font-semibold text-sm sm:text-[26px]">
                {listingData.listingType === 'sell'
                  ? formatCurrency(listingData.price)
                  : `${formatCurrency(listingData.price)}/Month`}
              </span>
            </div>

            <ul className="flex items-center flex-wrap gap-3">
              <li className="flex items-center gap-1">
                <MdHome className="text-sm sm:text-[20px] text-primary" />
                <span className="font-semibold text-sm sm:text-[20px]">
                  {listingData.propertyType.charAt(0).toUpperCase() +
                    listingData.propertyType.slice(1)}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <MdBed className="text-sm sm:text-[20px] text-primary" />
                <span className="font-semibold text-sm sm:text-[20px]">
                  {listingData.bedrooms}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <MdBathtub className="text-sm sm:text-[20px] text-primary" />
                <span className="font-semibold text-sm sm:text-[20px]">
                  {listingData.bathrooms}
                </span>
              </li>
              <li className="flex items-center gap-1">
                <FaParking className="text-sm sm:text-[20px] text-primary" />
                <span className="font-semibold text-sm sm:text-[20px]">
                  {listingData.parking === true ? 'Yes' : 'No parking'}
                </span>
              </li>
            </ul>

            <div className="">
              <span className="font-semibold text-sm sm:text-[26px]">
                Property Details:
              </span>

              <p className="text-sm sm:text-[26px] text-justify">
                {listingData.description}
              </p>
            </div>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Listing
