import { createSlice } from '@reduxjs/toolkit'

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    isOpen: false,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, size, color } = action.payload
      const existingIndex = state.items.findIndex(
        item => item.id === product.id && item.size === size && item.color === color
      )
      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += 1
      } else {
        state.items.push({ ...product, size, color, quantity: 1 })
      }
    },
    removeFromCart: (state, action) => {
      const { id, size, color } = action.payload
      state.items = state.items.filter(
        item => !(item.id === id && item.size === size && item.color === color)
      )
    },
    updateQuantity: (state, action) => {
      const { id, size, color, quantity } = action.payload
      const item = state.items.find(
        item => item.id === id && item.size === size && item.color === color
      )
      if (item) {
        item.quantity = quantity
        if (item.quantity <= 0) {
          state.items = state.items.filter(
            i => !(i.id === id && i.size === size && i.color === color)
          )
        }
      }
    },
    clearCart: (state) => {
      state.items = []
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen
    },
    setCartOpen: (state, action) => {
      state.isOpen = action.payload
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart, setCartOpen } = cartSlice.actions

export const selectCartItems = state => state.cart.items
export const selectCartTotal = state =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0)
export const selectCartCount = state =>
  state.cart.items.reduce((count, item) => count + item.quantity, 0)
export const selectCartOpen = state => state.cart.isOpen

export default cartSlice.reducer
