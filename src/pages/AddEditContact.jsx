import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "../Functions.jsx";
import ContactForm from "../components/ContactForm";

const AddEditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { contacts } = store;

  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    if (id && contacts?.length > 0) {
      const contact = contacts.find(c => c.id === parseInt(id));
      if (contact) setFormData(contact);
    }
  }, [id, contacts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch({ type: "SET_LOADING", payload: true });
      if (id) {
        await updateContact(id, formData);
      } else {
        await createContact(formData);
      }
      navigate("/");
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center text-center">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {id ? "Editar Contacto" : "Crear Nuevo Contacto"}
        </h1>

        <ContactForm
          initialData={formData}
          isEditing={!!id}
          onSuccess={() => navigate("/")}
        />

        <div className="d-flex justify-content-start ms-5">
        <button 
          onClick={() => navigate("/")}
          className="mt-4 text-blue-500 hover:text-blue-700"
        >
          ← Volver a mi lista de contactos
        </button>
        </div>
      </div>
  );
};

export default AddEditContact;