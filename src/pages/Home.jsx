import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { getContacts } from "../api/Contacts";
import ContactList from "../components/ContactList";
import Navbar from "../components/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const { store, dispatch } = useGlobalReducer();
  const { contacts, loading, error } = store;

  // Cargar contactos al iniciar
  useEffect(() => {
    const loadContacts = async () => {
      dispatch({ type: "SET_LOADING", payload: true });
      try {
        const contactsData = await getContacts();
        dispatch({ type: "SET_CONTACTS", payload: contactsData });
      } catch (err) {
        dispatch({ type: "SET_ERROR", payload: err.message });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    };

    loadContacts();
  }, [dispatch]);

  // Función para redirigir a edición (se pasa a ContactList)
  const handleEdit = (id) => {
    navigate(`/edit-contact/${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddContact={() => navigate("/add-contact")} />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Mi Agenda</h1>
        
        <ContactList 
          contacts={contacts} 
          loading={loading} 
          error={error}
          onEdit={handleEdit}
        />
      </main>
    </div>
  );
};

export default Home;