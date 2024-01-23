import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { UserDataResponse, CreateListingFormData } from '../types'

const useCreateListing = () => {
  const client = useQueryClient()

  return {
    createListing: useMutation(async (formData: CreateListingFormData) => {
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
    }),
    updateListing: useMutation(async (formData: CreateListingFormData) => {
      const response = await fetch(`/api/listing/update/${formData._id}`, {
        method: 'PATCH',
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
    }),
    deleteListing: useMutation(
      async (listingId: string) => {
        const response = await fetch(`/api/listing/delete/${listingId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data: UserDataResponse = await response.json()

        if (data.success === false) {
          throw new Error(data.message)
        }
        return data
      },
      {
        onSuccess: () => client.invalidateQueries(['userListings']),
      }
    ),
  } as {
    createListing: UseMutationResult<UserDataResponse>
    updateListing: UseMutationResult<UserDataResponse>
    deleteListing: UseMutationResult<UserDataResponse>
  }
}

export default useCreateListing
