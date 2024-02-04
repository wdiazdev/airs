import { useQuery } from '@tanstack/react-query'
import { ListingDataResponse } from '../types'

const useGetFilterListing = () => {
  return {
    getCreatedAtData: useQuery(
      ['created at data limit 4'],
      async () => {
        const response = await fetch(
          `/api/listing/searchListing?createdAt&order=desc&limit=4`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data: ListingDataResponse = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }
        return data
      },
      {
        keepPreviousData: true,
      }
    ),
    getSaleData: useQuery(
      ['sale data limit 4'],
      async () => {
        const response = await fetch(
          `/api/listing/searchListing?listingType=sale&limit=4`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data: ListingDataResponse = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }
        return data
      },
      {
        keepPreviousData: true,
      }
    ),
    getRentData: useQuery(
      ['rent data limit 4'],
      async () => {
        const response = await fetch(
          `/api/listing/searchListing?listingType=rent&limit=4`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )

        const data: ListingDataResponse = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }
        return data
      },
      {
        keepPreviousData: true,
      }
    ),
  }
}

export default useGetFilterListing
