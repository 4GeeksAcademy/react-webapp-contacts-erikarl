import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { createContact, updateContact } from "src/api/Contacts";
import ContactForm from "src/components/ContactForm";

const AddEditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { contacts } = store;

  const [formData, setFormData] = React.useState({
    full_name: "",
    email: "",
    phone: "",
    address: ""
  });

  // Cargar datos si estamos editando
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
      navigate("/"); // Navegación desde la página
    } catch (error) {
      dispatch({ type: "SET_ERROR", payload: error.message });
    } finally {
      dispatch({ type: "SET_LOADING", payload: false });
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Contact" : "Add New Contact"}
      </h1>
      
      <ContactForm
        formData={formData}
        isEditing={!!id}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
      
      <button 
        onClick={() => navigate("/")}
        className="mt-4 text-blue-500 hover:text-blue-700"
      >
        ← Back to contacts
      </button>
    </div>
  );
};

export default AddEditContact;
