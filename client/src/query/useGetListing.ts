import { useQuery } from '@tanstack/react-query'
import { ListingDataResponse } from '../types'

const useGetListing = (listingId: string) => {
  return {
    getListing: useQuery(
      ['listingData', listingId],
      async () => {
        const response = await fetch(`/api/listing/getListing/${listingId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data: ListingDataResponse = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }
        return data
      },
      {
        keepPreviousData: true,
        enabled: !!listingId,
      }
    ),
  }
}

export default useGetListing
