import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userFetched: false,
  accounts: [],
  user: {
    id: '',
  }
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserFetched: (state, action) => {
      state.userFetched = action.payload
    },
    setUserId: (state, action) => {
      state.user.id = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    clearState : ( state ) => {
      state = initialState;
    }
  },
})

// Action creators are generated for each case reducer function
export const { 
    setUserFetched,
    setUserId,
    setAccounts,
    clearState } = accountSlice.actions;