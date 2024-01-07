import { createSlice } from '@reduxjs/toolkit'
import { UserData } from '../../types'

const initialState: { currentUser: UserData } = {
  currentUser: {
    username: '',
    email: '',
    _id: '',
    avatar: '',
  },
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    currentUser: (state, action) => {
      state.currentUser = action.payload
    },
  },
})

export const { currentUser } = userSlice.actions

export default userSlice.reducer
