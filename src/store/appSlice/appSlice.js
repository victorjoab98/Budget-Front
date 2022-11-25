import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  fetched: false,
  recordTypes: [],
  banks: [],
  currencies: [],
  categories: [],
}

export const appSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setFetched: (state, action) => {
      state.fetched = action.payload
    },
    setRecordTypes: (state, action) => {
      state.recordTypes = action.payload
    },
    setBanks: (state, action) => {
      state.banks = action.payload;
    },
    setCurrencies: (state, action) => {
      state.currencies = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    }
  },
})

export const { 
  setFetched, 
  setRecordTypes,
  setBanks, 
  setCurrencies, 
  setCategories } = appSlice.actions;