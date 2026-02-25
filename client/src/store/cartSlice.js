import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosInstance from '../services/axios';


export const mergeGuestCart = createAsyncThunk(
  'cart/mergeGuestCart',
  async (cartItems, { rejectWithValue }) => {
    try {
      const formattedItems = cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }));
      const response = await axiosInstance.post('/cart/merge', { items: formattedItems });
      return response.data.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const addItemToCart = createAsyncThunk(
  'cart/addItem',
  async (itemData, { getState, dispatch, rejectWithValue }) => {
    try {
      dispatch(cartSlice.actions.addToCartLocal(itemData));
      const { auth } = getState();
      if (auth.token) {
        await axiosInstance.post('/cart/add', {
          productId: itemData.id,
          quantity: 1
        });
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to sync cart");
    }
  }
);

export const changeQuantity = createAsyncThunk(
  'cart/changeQuantity',
  async ({ id, size, delta }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { cart, auth } = getState();
      const item = cart.cartItems.find(i => i.id === id && i.size === size);
      const newQty = item.quantity + delta;

      if (newQty < 1) return;

      dispatch(cartSlice.actions.updateQuantityLocal({ id, size, delta }));

      if (auth.token) {
        await axiosInstance.patch('/cart/update', {
          productId: id,
          quantity: newQty
        });
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Update failed");
    }
  }
);


export const fetchCart = createAsyncThunk(
    'cart/fetchCart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/cart');
            return response.data.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const removeFromCart = createAsyncThunk(
  'cart/removeCartItem',
  async ({ id, size }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { auth } = getState();

      dispatch(cartSlice.actions.removeItemLocal({ id, size }));

      if (auth.token) {
        await axiosInstance.delete('/cart/remove', {
          data: { 
            productId: id, 
            size: size 
          }
        });
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || "Failed to remove item");
    }
  }
);

const saveToLocal = (state) => {
    localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    localStorage.setItem('totalAmount', JSON.stringify(state.totalAmount));
    localStorage.setItem('totalQuantity', JSON.stringify(state.totalQuantity));
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
        totalAmount: JSON.parse(localStorage.getItem('totalAmount')) || 0,
        totalQuantity: JSON.parse(localStorage.getItem('totalQuantity')) || 0,
    status: 'idle'
  },
  reducers: {
    addToCartLocal: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === newItem.id && item.size === newItem.size);

      state.totalQuantity++;
      if (!existingItem) {
        state.cartItems.push({
          ...newItem,
          quantity: 1,
          totalPrice: newItem.price,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }
      state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
  state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  saveToLocal(state);
    },
    updateQuantityLocal: (state, action) => {
      const { id, size, delta } = action.payload;
      const item = state.cartItems.find((i) => i.id === id && i.size === size);
      if (item) {
        const newQuantity = item.quantity + delta;
        if (newQuantity >= 1) {
          item.quantity = newQuantity;
          item.totalPrice = item.quantity * item.price;
        }
      }
      state.totalQuantity = state.cartItems.reduce((total, i) => total + i.quantity, 0);
      state.totalAmount = state.cartItems.reduce((total, i) => total + (i.price * i.quantity), 0);
      saveToLocal(state);
    },
    removeItemLocal: (state, action) => {
  const { id, size } = action.payload;
  const existingItem = state.cartItems.find(item => item.id === id && item.size === size);

  if (existingItem) {
    state.cartItems = state.cartItems.filter(item => !(item.id === id && item.size === size));

    state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
    state.totalAmount = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

    saveToLocal(state);
  }
},
    setCart: (state, action) => {
    state.cartItems = action.payload.items.map(item => ({
        id: item.product._id,
        title: item.product.name || item.product.title,
        price: item.product.price,
        image: item.product.image,
        size: item.size,
        quantity: item.quantity,
        totalPrice: item.quantity * item.product.price
    }));
    
    state.totalAmount = action.payload.totalAmount;
    state.totalQuantity = state.cartItems.reduce((total, i) => total + i.quantity, 0);
    saveToLocal(state);
}
  },
  extraReducers: (builder) => {
    builder
    .addCase(mergeGuestCart.fulfilled, (state, action) => {
      state.totalAmount = action.payload.totalAmount;
    })
    .addCase(fetchCart.fulfilled, (state, action) => {
      cartSlice.caseReducers.setCart(state, action);
    });
  }
});

export const { addToCartLocal, updateQuantityLocal, setCart } = cartSlice.actions;
export default cartSlice.reducer;