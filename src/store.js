import { createContext, useReducer, useContext, createElement } from "react";
import { 
  newAgenda,
  getContacts, 
  createContact, 
  updateContact as apiUpdateContact, 
  deleteContact as apiDeleteContact 
} from "./api/Contacts";

// --- Estado inicial ---
const initialState = {
  contacts: [],
  loading: false,
  error: null,
};

// --- Reducer ---
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_CONTACTS":
      return { ...state, contacts: action.payload };
    case "ADD_CONTACT":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact.id === action.payload.id ? action.payload : contact
        ),
      };
    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter(c => c.id !== action.payload),
      };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

// --- Creación del contexto ---
const StoreContext = createContext();

// --- Provider (sin JSX) ---
export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return createElement(
    StoreContext.Provider,
    { value: { state, dispatch } },
    children
  );
};

// --- Hook personalizado para usar el contexto ---
export const useStore = () => useContext(StoreContext);

// --- Acciones ---
export const initialStore = async (dispatch) => {
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
};

export const addContactAction = async (dispatch, contactData) => {
  try {
    const createdContact = await createContact(contactData);
    dispatch({ type: "ADD_CONTACT", payload: createdContact });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
    throw error;
  }
};

export const updateContactAction = async (dispatch, id, updatedData) => {
  try {
    const updatedContact = await apiUpdateContact(id, updatedData);
    dispatch({ type: "UPDATE_CONTACT", payload: updatedContact });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
    throw error;
  }
};

export const deleteContactAction = async (dispatch, id) => {
  try {
    await apiDeleteContact(id);
    dispatch({ type: "DELETE_CONTACT", payload: id });
  } catch (error) {
    dispatch({ type: "SET_ERROR", payload: error.message });
    throw error;
  }
};