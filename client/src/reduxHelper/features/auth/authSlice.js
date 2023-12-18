import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
//import axios from '../../../utils/axios'
import axios from 'axios';

const initialState = {
    user: null,
    token: null,
    isLoading: false,
    status: null,
}

export const registerUser = createAsyncThunk(
    'user/registerUser', 
  
     async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3000/user', userData);
      if (response.data.token) {
      await window.localStorage.setItem('token', response.data.token)
    }
     // console.log(response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async (userData, { rejectWithValue }) => {
      try {
        const response = await axios.post('http://localhost:3000/auth/login',userData)
        console.log(response.data);
          if (response.data.token) {
              window.localStorage.setItem('token', response.data.token)
          }
          return response.data
      } catch (error) {
        console.error('Error during login:', error.response);
  
        // Check if the error response has a message property
        if (error.response && error.response.data && error.response.data.message) {
          console.log('Error message:', error.response.data.message);
          return rejectWithValue(error.response.data.message);
        }
  
        // If there's no specific message, reject with the entire error response
        return rejectWithValue(error.response.data);
      }
  },
)
const getToken = () => {
  return window.localStorage.getItem('token');
};

// export const getMe = createAsyncThunk('auth/getMe', async (_, { dispatch, rejectWithValue }) => {
//   try {
//     const token = getToken()
//     if(token){
//       const response = await axios.get('http://localhost:3000/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         dispatch(loginUser(response.data)); 
       
//       });
//      // console.log(response.data);
//       //return response.data, token}
//       // const { data } = await axios.get('http://localhost:3000/auth/profile')
//       // console.log(data);
//       // return data
//   } catch (error) {
//       console.log(error)
//   }
// })

// export const getMe = createAsyncThunk('auth/getMe', async (_, { dispatch, rejectWithValue }) => {
//   try {
//     const token = getToken();
//     if (token) {
//       console.log(token);
//       const response = await axios.get('http://localhost:3000/auth/profile', {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//     dispatch(loginUser(response.data)); // Dispatch the loginUser action
// console.log(response.data);
//      return response.data; // Return the response data
//     }
//   } catch (error) {
//     console.log(error);
//     return rejectWithValue(error.response?.data || 'Error fetching profile');
//   }
// });

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {      
      logout: (state) => {
        state.user = null
        state.token = null
        state.isLoading = false
        state.status = null} ,
        checkIsAuth: (state, action) => {
          state.isAuth = action.payload;
        },
    },
  
    extraReducers: (builder) => {
        builder
          .addCase(registerUser.pending, (state) => {
            state.isLoading = true
            state.status = null;
          })
          .addCase(registerUser.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.email;
            state.token = action.payload.token;
          })
          .addCase(registerUser.rejected, (state, action) => {
            state.status = action.payload.data.message;
            state.error = action.payload;
          })


          .addCase(loginUser.pending, (state) => {
            state.isLoading = true;
            state.status = null;
           
          })
          .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.status = action.payload.message;
            state.user = action.payload.email;
            state.token = action.payload.token;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.status = 'Login failed';
            state.error = action.error.message;
          })

          // .addCase(getMe.pending, (state) => {
          //   state.isLoading = true;
          //   state.status = null;
           
          // })
          // .addCase(getMe.fulfilled, (state, action) => {            
          //   state.isLoading = false
          //   state.status = null
          //   state.user = action.payload?.email
          //   state.token = action.payload?.token
          // })
          // .addCase(getMe.rejected, (state, action) => {
          //   state.status = action.payload.message
          //   state.isLoading = false
          // })





      },
})



export const checkIsAuth = (state) => Boolean(state.auth.token)
export const { logout } = authSlice.actions
// export const checkIsAuth = (isAuth) => {
//   return {
//     type: 'auth/checkIsAuth',
//     payload: isAuth,
//   };
// };
export default authSlice.reducer