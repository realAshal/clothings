import { createSlice } from '@reduxjs/toolkit'

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    darkMode: false,
    searchOpen: false,
    quickViewProduct: null,
    mobileMenuOpen: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode
      if (state.darkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    toggleSearch: (state) => {
      state.searchOpen = !state.searchOpen
    },
    setSearchOpen: (state, action) => {
      state.searchOpen = action.payload
    },
    setQuickViewProduct: (state, action) => {
      state.quickViewProduct = action.payload
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen
    },
    setMobileMenuOpen: (state, action) => {
      state.mobileMenuOpen = action.payload
    },
  },
})

export const {
  toggleDarkMode,
  toggleSearch,
  setSearchOpen,
  setQuickViewProduct,
  toggleMobileMenu,
  setMobileMenuOpen,
} = uiSlice.actions

export const selectDarkMode = state => state.ui.darkMode
export const selectSearchOpen = state => state.ui.searchOpen
export const selectQuickViewProduct = state => state.ui.quickViewProduct
export const selectMobileMenuOpen = state => state.ui.mobileMenuOpen

export default uiSlice.reducer
