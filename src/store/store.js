import { configureStore } from '@reduxjs/toolkit'
import { appSlice } from './appSlice'
import { accountSlice } from './userAccount'

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    user: accountSlice.reducer
  },
})