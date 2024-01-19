import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { UserDataResponse, CreateListingFormData } from '../types'

const useCreateListing = () => {
  // const client = useQueryClient()

  return {
    createListing: useMutation(
      async (formData: CreateListingFormData) => {
        const response = await fetch('/api/listing/create', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })

        const data: UserDataResponse = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }
        return data
      }
      // {
      //   onSuccess: () => {
      //     client.invalidateQueries()
      //   },
      // }
    ),
  } as {
    createListing: UseMutationResult<UserDataResponse>
  }
}

export default useCreateListing
