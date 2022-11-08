import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  banks: [],
  currencies: []
}

export const appSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    }
  },
})

export const { setBanks, setCurrencies } = appSlice.actions;