import { createSlice } from '@reduxjs/toolkit';
import { showMessage } from 'app/store/fuse/messageSlice';
import jwtService from 'app/services/jwtService';
import { setUserData } from './userSlice';

export const submitRegister = ({ nome, email, telefone, banco, agencia, conta, cpf }) => async dispatch => {
	return jwtService
		.createUser({
			nome,
			email,
			telefone,
			banco,
			agencia,
			conta,
			cpf
		})
		.then(user => {
			dispatch(setUserData(user));
			return dispatch(registerSuccess());
		})
		.catch(error => {
			return dispatch(registerError(error));
		});
};

const initialState = {
	success: false,
	error: {
		fullname: null,
		cpf: null,
		email: null,
		telephone: null,
		none: null,
		agencia: null,
		account: null
	}
};

const registerSlice = createSlice({
	name: 'auth/register',
	initialState,
	reducers: {
		registerSuccess: (state, action) => {
			state.success = true;
		},
		registerError: (state, action) => {
			state.success = false;
			state.error = action.payload;
		}
	},
	extraReducers: {}
});

export const { registerSuccess, registerError } = registerSlice.actions;

export default registerSlice.reducer;
