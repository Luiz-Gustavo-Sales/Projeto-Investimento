import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../../../../DB/index'
export const getUserData = createAsyncThunk('contactsApp/user/getUserData', async () => {
	const response = await axios.get('/api/contacts-app/use');
	const data = await response.data;
	return data;
});

const userSlice = createSlice({
	name: 'contactsApp/user',
	initialState: {},
	reducers: {},
	extraReducers: {
		[getUserData.fulfilled]: (state, action) => action.payload
	}
});

export default userSlice.reducer;
