const API_BASE_URL = "https://playground.4geeks.com/contact/";
const AGENDA_NAME = "agenda_erikarl"; 

export const newAgenda = async () => {
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) throw new Error("Error al crear agenda");
  return await response.json();
};

// Operaciones CRUD para contactos
export const getContacts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts`);
    
    if (response.status === 404) {
      // Si la agenda no existe, la creamos y retornamos array vacío
      await newAgenda();
      return [];
    }
    
    if (!response.ok) throw new Error("Error al cargar contactos");
    return await response.json();
  } catch (error) {
    console.error("Error in getContacts:", error);
    throw error;
  }
};

export const createContact = async (contactData) => {
  try {
    const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts`, {
      method: "POST",
      headers: {  
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contactData)
    });

    if (!response.ok) {
      const errorDetails = await response.json();
      console.error("Error completo del servidor:", errorDetails); // <-- ¡Muestra TODO el objeto!
      const errorMessage = errorDetails.detail?.[0]?.msg || JSON.stringify(errorDetails);
      throw new Error(errorMessage); // <-- Mensaje legible
    }
    return await response.json();
  } catch (error) {
    console.error('Error completo:', error);
    throw error;
  }
};

export const updateContact = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts/${id}`, {
    method: "PUT",
    headers: {  
      'Content-Type': 'application/json',
      // Otros headers si son necesarios (ej: 'Authorization': 'Bearer token')
    },
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Error al actualizar contacto");
  return await response.json(); // Retorna el contacto actualizado
};

export const deleteContact = async (id) => {
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts/${id}`, {
    method: "DELETE",
    headers: { 'Content-Type': 'application/json',
    },
  });
  if (!response.ok) throw new Error("Error al eliminar contacto");
  return id; // Retorna el ID eliminado
};