import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../../../../DB/index';
import { getUserData } from './userSlice';

export const getContacts = createAsyncThunk('/pic/api/cliente/getAllClientes', async (routeParams, { getState }) => {
	routeParams = routeParams || getState().contactsApp.contacts.routeParams;
	const response = await api.post('/pic/api/cliente/getAllClientes', {
		params: routeParams
	});
	//forma de mostrar os usuários está diferente
	const data = await response.data.data.clientes;
	return { data, routeParams };
});

export const addContact = createAsyncThunk(
	'contactsApp/contacts/addContact',
	async (contact, { dispatch, getState }) => {
		const response = await api.post('/pic/api/cliente/saveCliente', { contact });
		const data = await response.data.data.clientes;

		dispatch(getContacts());

		return data;
	}
);
//editar contato
export const updateContact = createAsyncThunk(
	'/pic/api/cliente/updateCliente',
	async (id, nome, banco, agencia, conta, cpf, telefone, email, { dispatch, getState }) => {
		const response = await api.post(`/pic/api/cliente/updateCliente`, { body: { id, nome, banco, agencia, conta, cpf, telefone, email} });
		const data = await response.data.data.clientes;

		dispatch(getContacts());

		return data;
	}
);
//remover contato
//colocar ID para poder pegar o usuári selecionado,assim passando para rota que reconhece como ID
export const removeContact = createAsyncThunk('/pic/api/cliente/deleteCliente', async (id, { dispatch, getState }) => {
	console.log('MEU IDDDD ' + id);
	const response = await api.delete('/pic/api/cliente/deleteCliente', { params: { id } });
	const data = await response.data.data.clientes;

	dispatch(getContacts());

	return data;
});
//remover contatos
export const removeContacts = createAsyncThunk(
	'contactsApp/contacts/removeContacts',
	async (id, { dispatch, getState }) => {
		//params passando para rota
		const response = await api.delete('/pic/api/cliente/deleteCliente', { params: { id } });
		const data = await response.data;

		dispatch(getContacts());

		return data;
	}
);

export const toggleStarredContact = createAsyncThunk(
	'contactsApp/contacts/toggleStarredContact',
	async (contactId, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contact', { contactId });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

export const toggleStarredContacts = createAsyncThunk(
	'contactsApp/contacts/toggleStarredContacts',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/toggle-starred-contacts', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

export const setContactsStarred = createAsyncThunk(
	'contactsApp/contacts/setContactsStarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-starred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

export const setContactsUnstarred = createAsyncThunk(
	'contactsApp/contacts/setContactsUnstarred',
	async (contactIds, { dispatch, getState }) => {
		const response = await axios.post('/api/contacts-app/set-contacts-unstarred', { contactIds });
		const data = await response.data;

		dispatch(getUserData());

		dispatch(getContacts());

		return data;
	}
);

const contactsAdapter = createEntityAdapter({});

export const { selectAll: selectContacts, selectById: selectContactsById } = contactsAdapter.getSelectors(
	state => state.contactsApp.contacts
);

const contactsSlice = createSlice({
	name: 'contactsApp/contacts',
	initialState: contactsAdapter.getInitialState({
		searchText: '',
		routeParams: {},
		contactDialog: {
			type: 'new',
			props: {
				open: false
			},
			data: null
		}
	}),
	reducers: {
		setContactsSearchText: {
			reducer: (state, action) => {
				state.searchText = action.payload;
			},
			prepare: event => ({ payload: event.target.value || '' })
		},
		openNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: true
				},
				data: null
			};
		},
		closeNewContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'new',
				props: {
					open: false
				},
				data: null
			};
		},
		openEditContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'edit',
				props: {
					open: true
				},
				data: action.payload
			};
		},
		closeEditContactDialog: (state, action) => {
			state.contactDialog = {
				type: 'edit',
				props: {
					open: false
				},
				data: null
			};
		}
	},
	extraReducers: {
		[updateContact.fulfilled]: contactsAdapter.upsertOne,
		[addContact.fulfilled]: contactsAdapter.addOne,
		[getContacts.fulfilled]: (state, action) => {
			const { data, routeParams } = action.payload;
			contactsAdapter.setAll(state, data);
			state.routeParams = routeParams;
			state.searchText = '';
		}
	}
});

export const {
	setContactsSearchText,
	openNewContactDialog,
	closeNewContactDialog,
	openEditContactDialog,
	closeEditContactDialog
} = contactsSlice.actions;

export default contactsSlice.reducer;
