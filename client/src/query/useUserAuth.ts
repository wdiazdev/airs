import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { FormData, UserDataResponse } from '../types'

const useUserAuth = () => {
  const client = useQueryClient()

  return {
    signUpNewUser: useMutation(
      async (formData: FormData) => {
        const response = await fetch('/api/auth/signup', {
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
      },
      {
        onSuccess: () => {
          client.invalidateQueries()
        },
      }
    ),
    signInUser: useMutation(
      async (formData: FormData) => {
        const response = await fetch('/api/auth/signin', {
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
      },
      {
        onSuccess: () => {
          client.invalidateQueries()
        },
      }
    ),
  } as {
    signUpNewUser: UseMutationResult<UserDataResponse>
    signInUser: UseMutationResult<UserDataResponse>
  }
}

export default useUserAuth
