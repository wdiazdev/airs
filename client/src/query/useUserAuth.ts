import {
  UseMutationResult,
  UseQueryResult,
  useMutation,
  useQuery,
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
    googleSignIn: useMutation(
      async (googleData: FormData) => {
        const response = await fetch('/api/auth/googleauth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(googleData),
        })

        const data = await response.json()

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
    updateUserProfile: useMutation(
      async (userData: any) => {
        const response = await fetch(
          `/api/user/update/profile/${userData.id}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData.formData),
          }
        )

        const data = await response.json()

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
    deleteUserProfile: useMutation(
      async (userId: string) => {
        const response = await fetch(`/api/user/delete/profile/${userId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })

        const data = await response.json()

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
    googleSignIn: UseMutationResult<UserDataResponse>
    updateUserProfile: UseMutationResult<UserDataResponse>
    deleteUserProfile: UseMutationResult<UserDataResponse>
  }
}

export default useUserAuth
