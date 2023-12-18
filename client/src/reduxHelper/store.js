import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import companySlice from './features/auth/company/companySlice'

export const store = configureStore({
    reducer: {
        auth: authSlice,
        company: companySlice
        
    },
})