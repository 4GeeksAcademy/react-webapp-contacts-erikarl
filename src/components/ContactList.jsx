import React, { useContext } from "react";
import { StoreContext } from "../store";
import ContactForm from "./ContactForm";
import { deleteContact } from "../api/Contacts";

const ContactList = () => {
  // Obtén el estado y dispatch del contexto
  const { state, dispatch } = useContext(StoreContext);
  const { contacts, loading, error } = state;

  // Función para eliminar contacto
  const handleDelete = async (id) => {
    if (window.confirm("¿Eliminar contacto?")) {
      try {
        await deleteContact(id); // Llama a la API
        dispatch({ type: "DELETE_CONTACT", payload: id }); // Actualiza el estado
      } catch (error) {
        dispatch({ type: "SET_ERROR", payload: error.message });
      }
    }
  };

  // Renderizado condicional
  if (loading) return <p>Cargando contactos...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!contacts || contacts.length === 0) {
    return <p>No hay contactos en la agenda.</p>;
  }

  return (
    <div className="contact-list grid gap-4 p-4">
      {contacts.map((contact) => (
        <ContactForm
          key={contact.id}
          contact={contact}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

export default ContactList;