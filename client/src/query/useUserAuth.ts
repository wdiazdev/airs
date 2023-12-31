import { useMutation, useQueryClient } from '@tanstack/react-query'
import { FormData } from '../types'

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
    signInUser: useMutation(
      async (formData: FormData) => {
        const response = await fetch('/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
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
    signUpNewUser: ReturnType<typeof useMutation>
    signInUser: ReturnType<typeof useMutation>
  }
}

export default useUserAuth
