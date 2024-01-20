import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { ListingDataResponse } from '../types'

const useGetUserListing = (userId: string) => {
  return {
    getListing: useQuery(
      ['userListings', userId],
      async () => {
        const response = await fetch(`/api/user/listing/${userId}`, {
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
        enabled: !!userId,
      }
    ),
  }
}

export default useGetUserListing
