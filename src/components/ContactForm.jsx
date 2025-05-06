import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { actions } from "../store"; 

const ContactForm = ({ 
  initialData = {
    name: "",
    email: "",
    phone: "",
    address: "",
  },
  isEditing = false,
  onSuccess
}) => {
  const { dispatch } = useGlobalReducer(); 
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Validación básica primero
      if (!formData.name || !formData.email) {
        throw new Error("Nombre y email son campos obligatorios");
      }
  
      // Preparamos los datos para la API con protección contra undefined
      const apiData = {
        name: formData.name?.trim() || "", // <-- Uso del optional chaining
        email: formData.email?.trim() || "",
        ...(formData.phone && { phone: formData.phone.trim() }),
        ...(formData.address && { address: formData.address.trim() })
      };
  
      console.log("Datos a enviar:", apiData); // Para depuración
  
      if (isEditing) {
        await actions.updateContact(initialData.id, apiData, dispatch);
      } else {
        await actions.addContact(apiData, dispatch);
      }
      onSuccess?.();
    } catch (error) {
      alert(`Error: ${error.message}`);
      console.error("Error al procesar:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (  
    <div className="d-flex justify-content-center">
  <form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
    <div className="mb-3 mt-4"> {/* Contenedor con margen inferior */}
      <label htmlFor="name" className="form-label">Nombre completo</label>
      <input
        type="text"
        id="name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="email" className="form-label">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="form-control"
        required
      />
    </div>

    <div className="mb-3">
      <label htmlFor="phone" className="form-label">Teléfono</label>
      <input
        type="tel"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    <div className="mb-4">
      <label htmlFor="address" className="form-label">Dirección</label>
      <input
        type="text"
        id="address"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="form-control"
      />
    </div>

    <button
      type="submit"
      disabled={isSubmitting}
      className={`btn w-100 mt-3 ${
        isSubmitting ? "btn-secondary" : "btn-primary"
      }`}
    >
      {isSubmitting ? 'Procesando...' : isEditing ? 'Actualizar contacto' : 'Crear contacto'}
    </button>
  </form>
</div>
  );
};

export default ContactForm;
