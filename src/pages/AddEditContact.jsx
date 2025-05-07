import { useNavigate, useParams } from "react-router-dom";
import ContactForm from "../components/ContactForm";

const AddEditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center text-center">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {id ? "Editar Contacto" : "Crear Nuevo Contacto"}
        </h1>

        <ContactForm
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