import { useParams } from 'react-router-dom'
import useGetListing from '../query/useGetListing'
import Spinner from '../components/Spinner'
import { CreateListingFormData } from '../types'
import {
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
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/swiper-bundle.css'

const Listing = () => {
  const params = useParams()

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
          <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
            {listingData.imageUrls.map((url, index) => {
              return (
                <div className="relative" key={index}>
                  <SwiperSlide>
                    <img
                      src={
                        url ||
                        'https://www.ssn.no/build/images/temp/placeholder-house.5fe09041.png'
                      }
                      alt="listing image"
                      className=" h-[600px] w-full object-cover"
                    />
                    <button
                      onClick={() => history.back()}
                      className="absolute bottom-4 left-4 hover:opacity-75 ease-in duration-200"
                    >
                      <MdArrowCircleLeft className="text-sm sm:text-[38px] text-primary" />
                    </button>
                  </SwiperSlide>
                </div>
              )
            })}
          </Swiper>

          <div className="flex flex-col gap-4 p-6 mt-6 border-b-2">
            <div className="flex items-center gap-1">
              <div
                className={`w-2 h-2 sm:h-3 sm:w-3 ${
                  listingData.offer ? 'bg-amber-500' : 'bg-green-500'
                } rounded-full`}
              />
              <p className="text-sm sm:text-[20px]">
                {listingData.propertyType.charAt(0).toUpperCase() +
                  listingData.propertyType.slice(1)}
                {' for '}
                {listingData.listingType.charAt(0).toUpperCase() +
                  listingData.listingType.slice(1)}
                {listingData.offer && (
                  <span className="text-amber-500"> - Pending</span>
                )}
              </p>
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
