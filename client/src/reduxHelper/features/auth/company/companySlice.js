import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    company: [],    
    loading: false,
}

const getToken = () => {
    return window.localStorage.getItem('token');
  };

export const createCompany = createAsyncThunk(
    'company/createCompany',
    async (companyData) => {
      try {
        const token = getToken();
        const response = await axios.post('http://localhost:3000/company', companyData, {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        });
        console.log(response.data);
        return response.data;
      } catch (error) {
        // Handle the error or return an appropriate value
        throw error;
      }
    }
  );

  export const getAllCompanies = createAsyncThunk(
    'company/getAllCompanies',
    async (_, { rejectWithValue }) => {
      try {
        const token = getToken();
        const response = await axios.get('http://localhost:3000/company', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Error fetching companies');
      }
    }
  );
  

export const companySlice = createSlice({
    name: 'company',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
          .addCase(createCompany.pending, (state) => {
            state.loading = true;
          })
          .addCase(createCompany.fulfilled, (state, action) => {
            state.loading = false;
            state.company = action.payload;
          })
          .addCase(createCompany.rejected, (state) => {
            state.loading = false;
            // Handle the rejected case if needed
          })

          .addCase(getAllCompanies.pending, (state) => {
            state.loading = true;
          })
          .addCase(getAllCompanies.fulfilled, (state, action) => {
            state.loading = false;
            state.companies = action.payload;
          })
          .addCase(getAllCompanies.rejected, (state) => {
            state.loading = false;
          });

      },
})

export default companySlice.reducer