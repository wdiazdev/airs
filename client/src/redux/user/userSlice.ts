import { createSlice } from '@reduxjs/toolkit'
import { FormData } from '../../types'

const initialState: { currentUser: FormData } = {
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
