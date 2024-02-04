import SearchBar from '../components/SearchBar'
import useGetFilterListing from '../query/useGetFilterListing'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import { Link } from 'react-router-dom'
import Spinner from '../components/Spinner'

const Home = () => {
  const { getCreatedAtData, getSaleData, getRentData } = useGetFilterListing()

  const {
    data: createdAtResults,
    isLoading: createdAtIsLoading,
    isError: createdAtIsError,
  } = getCreatedAtData

  const {
    data: saleResults,
    isLoading: saleIsLoading,
    isError: saleIsError,
  } = getSaleData

  const {
    data: rentResults,
    isLoading: rentIsLoading,
    isError: rentIsError,
  } = getRentData

  return (
    <div className="flex flex-col gap-8">
      <div
        className="h-screen relative p-2 
      bg-no-repeat bg-cover bg-center flex items-center justify-center
      bg-[url('/src/assets/homeBg.jpg')]"
      >
        <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>
        <div className="flex flex-col items-center gap-3 z-30">
          <h1 className="sm:text-xl text-[26px] font-bold text-white text-center">
            The<span className="text-primary"> #1 </span>site real estate
            <br /> professionals trust
          </h1>
          <SearchBar fullWidth />
        </div>
      </div>
      <h2 className="text-lg font-semibold px-6 text-slate-600">
        Recent listings added
      </h2>
      <div className="flex justify-center items-center p-2 h-[500px]">
        {createdAtResults?.data && !createdAtIsLoading && !createdAtIsError && (
          <Swiper navigation={true} modules={[Navigation]} slidesPerView={1}>
            {createdAtResults.data.map((element) => {
              return (
                <SwiperSlide key={element._id}>
                  <Link to={`/listing/${element._id}`}>
                    <img
                      src={
                        element.imageUrls[0] ||
                        'https://www.ssn.no/build/images/temp/placeholder-house.5fe09041.png'
                      }
                      alt="listing image"
                      className=" h-[500px] w-[1200px] m-auto object-cover"
                    />
                  </Link>
                </SwiperSlide>
              )
            })}
          </Swiper>
        )}
        {createdAtIsLoading && !createdAtIsError && !createdAtResults && (
          <Spinner />
        )}
        {!createdAtIsLoading && !createdAtIsError && !createdAtResults && (
          <p className="font-semibold">No results found</p>
        )}
        {createdAtIsError && !createdAtIsLoading && !createdAtResults && (
          <p className="font-semibold">Error. Please try again!</p>
        )}
      </div>

      <div>Test</div>
    </div>
  )
}

export default Home
