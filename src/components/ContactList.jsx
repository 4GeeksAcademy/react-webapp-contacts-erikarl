import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store";
import { getContacts } from "../Functions.jsx";
import ContactCard from './ContactCard';
import { useNavigate } from "react-router-dom";

const ContactList = ({ contacts, loading, error, onEdit }) => {
  const { dispatch } = useGlobalReducer();
  const navigate = useNavigate();

  // Función para eliminar contacto (optimizada)
  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este contacto?")) {
      try {
        await actions.deleteContact(id, dispatch);
        // No necesitas volver a cargar los contactos manualmente
        // El store ya se actualiza automáticamente con la acción DELETE_CONTACT
      } catch (error) {
        console.error("Error eliminando contacto:", error);
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    }
  };

  const handleAddNewContact = () => {
    navigate("/add-contact");
  };

  if (loading) return (
    <div className="text-center p-8">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p>Cargando contactos...</p>
    </div>
  );

  if (error) return (
    <div className="alert alert-danger text-center">
      Error: {error}
    </div>
  );

  if (!contacts?.length) return (
    <div className="text-center p-4">
      <p className="mb-4">No hay contactos en la agenda.</p>
      <button 
        onClick={handleAddNewContact}
        className="btn btn-primary"
      >
        Agregar nuevo contacto
      </button>
    </div>
  );

  return (
    <div className="container">
      
      <div className="row row-cols-1 g-4">
        {contacts.map(contact => (
          <div key={contact.id} className="col">
            <ContactCard 
              contact={contact}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          </div>
        ))}

    </div>
  </div>
  );
};

export default ContactList;

