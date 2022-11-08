import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  accounts: []
}

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setAccounts } = accountSlice.actions;