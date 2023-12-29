import { FC } from 'react'

type props = {
  name: string
  description: string
  src: string
}

const User: FC<props> = ({ name, description, src }) => {
  return (
    <></>
    // <UserAvatar
    //   name={name}
    //   description={description}
    //   avatarProps={{
    //     src: src,
    //   }}
    //   className="text-primary font-bold flex"
    // />
  )
}

export default User
