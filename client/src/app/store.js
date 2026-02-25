import { configureStore } from '@reduxjs/toolkit';
import ProductStore from '../store/productSlice'
import CartStore from '../store/cartSlice'
import AuthStore from '../store/authSlice'

export const store = configureStore({
    reducer: {
        products: ProductStore,
        cart: CartStore,
        auth: AuthStore,
    }

})
