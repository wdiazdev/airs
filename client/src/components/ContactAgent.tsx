import { useState } from 'react'
import useGetUser from '../query/useGetUser'
import { FormData } from '../types'
import { Link } from 'react-router-dom'

interface Props {
  userId: string
  address: string
}

const ContactAgent = ({ userId, address }: Props) => {
  const [message, setMessage] = useState<string>('')

  const { getUser } = useGetUser(userId)

  const { data: getUserData } = getUser

  const userData = getUserData?.data as FormData | undefined

  return (
    <>
      {userData ? (
        <div className="flex flex-col gap-2 bg-slate-500 p-4 rounded-md">
          <div className="flex items-center">
            <p className="text-sm sm:text-[20px] text-white">
              Contact:{' '}
              <span className="font-semibold">
                {userData.username &&
                  userData.username.charAt(0).toUpperCase() +
                    userData.username.slice(1)}
              </span>{' '}
              for <span className="font-semibold">{address}</span>
            </p>
          </div>
          <textarea
            name="message"
            id="message"
            rows={4}
            placeholder="Enter your message"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none"
            value={message}
            onChange={(e: any) => setMessage(e.target.value)}
          ></textarea>
          <Link
            className="m-auto py-3 px-4 uppercase bg-customBlue text-white text-[12px] sm:text-[16px] font-semibold rounded-lg hover:bg-blue-500 ease-in duration-200"
            to={`mailto:${userData.email}?subject=Regarding:${address}&body=${message}`}
          >
            Send Message
          </Link>
        </div>
      ) : (
        <p className="text-sm sm:text-[26px]">No agent information found.</p>
      )}
    </>
  )
}

export default ContactAgent
