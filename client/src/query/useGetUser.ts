import { useQuery } from '@tanstack/react-query'
import { ListingDataResponse } from '../types'

const useGetUser = (userId: string) => {
  return {
    getUser: useQuery(
      ['get user', userId],
      async () => {
        const response = await fetch(`/api/user/getuser/${userId}`, {
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

export default useGetUser
