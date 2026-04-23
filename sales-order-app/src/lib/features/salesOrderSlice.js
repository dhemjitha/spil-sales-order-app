import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orders: [],
  loading: false,
  error: null,
}

const salesOrderSlice = createSlice({
  name: 'salesOrder',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.orders = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload
    },
    addOrder: (state, action) => {
      state.orders.push(action.payload)
    },
    updateOrder: (state, action) => {
      const index = state.orders.findIndex(o => o.orderId === action.payload.orderId)
      if (index !== -1) state.orders[index] = action.payload
    },
    removeOrder: (state, action) => {
      state.orders = state.orders.filter(o => o.orderId !== action.payload)
    },
  },
})

export const { setOrders, setLoading, setError, addOrder, updateOrder, removeOrder } = salesOrderSlice.actions
export default salesOrderSlice.reducer