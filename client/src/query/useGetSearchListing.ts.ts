import { useQuery } from '@tanstack/react-query'
import { ListingDataResponse } from '../types'

const useGetSearchListing = (searchQuery: string) => {
  return {
    searchListing: useQuery(
      ['search listing', searchQuery],
      async () => {
        const response = await fetch(
          `/api/listing/searchListing?${searchQuery}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data: ListingDataResponse = await response.json()

        if (data.success === false) {
          console.log('searchQuery:', searchQuery)
          throw new Error(data.message)
        }
        return data
      },
      {
        keepPreviousData: true,
        enabled: !!searchQuery,
      }
    ),
  }
}

export default useGetSearchListing
