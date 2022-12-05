import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  logged: false,
  showWelcome: false,
  userFetched: false,
  accounts: [],
  recordsPercentages: [],
  user: {}
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setUserLogged: (state, action) => {
      state.logged = action.payload
    },
    setShowWelcome: (state, action) => {
      state.showWelcome = action.payload
    },
    setUserFetched: (state, action) => {
      state.userFetched = action.payload
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setRecordPercentages: (state, action) => {
      state.recordsPercentages = action.payload;
    },
    clearState : () => initialState
  },
})

// Action creators are generated for each case reducer function
export const { 
    setUserLogged,
    setShowWelcome,
    setUserFetched,
    setUser,
    setAccounts,
    setRecordPercentages,
    clearState } = accountSlice.actions;