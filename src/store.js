import {
  newAgenda,
  getContacts,
  createContact,
  updateContact as apiUpdateContact,
  deleteContact as apiDeleteContact
} from './Functions.jsx'; // Asegúrate de que la ruta sea correcta

// Estado inicial
export const InitialState = {
  contacts: [],
  loading: false, 
  error: null
};

// Reducer
export const storeReducer = (state, action) => {
  switch (action.type) { //el profe pone action.option
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload.contacts };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        )
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload)
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// Objeto con las acciones ya implementadas (para ser usado con dispatch)
export const actions = {
  loadContacts: async (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      await newAgenda();
      const contacts = await getContacts();
      dispatch({ type: "SET_CONTACTS", payload: contacts });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  },

  addContact: async (contactData, dispatch) => {
    try {
      const createdContact = await createContact(contactData);
      dispatch({ type: "ADD_CONTACT", payload: createdContact });
      return createdContact;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  },

  updateContact: async (id, updatedData, dispatch) => {
    try {
      const updatedContact = await apiUpdateContact(id, updatedData);
      dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
      return updatedContact;
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  },

  deleteContact: async (id, dispatch) => {
    try {
      await apiDeleteContact(id);
      dispatch({ type: "DELETE_CONTACT", payload: id });
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
      throw error;
    }
  }
};