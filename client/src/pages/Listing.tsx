import { useParams } from 'react-router-dom'
import useGetListing from '../query/useGetListing'
import Spinner from '../components/Spinner'
import { CreateListingFormData } from '../types'

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
    <div className="h-screen ">
      {listingData && !isLoading && !isError ? (
        <div className="h-screen flex items-center justify-center">
          <h2>{listingData.address}</h2>
        </div>
      ) : null}
    </div>
  )
}

export default Listing
