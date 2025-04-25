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
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts`);
  if (!response.ok) throw new Error("Error al cargar contactos");
  return await response.json();
};

export const createContact = async (contact) => {
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      full_name: contact.full_name,
      email: contact.email,
      phone: contact.phone,
      address: contact.address || "", 
    }),
  });
  if (!response.ok) throw new Error("Error al crear contacto");
  return await response.json(); // Retorna el contacto creado
};

export const updateContact = async (id, updatedData) => {
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts/${id}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(updatedData),
  });
  if (!response.ok) throw new Error("Error al actualizar contacto");
  return await response.json(); // Retorna el contacto actualizado
};

export const deleteContact = async (id) => {
  const response = await fetch(`${API_BASE_URL}agendas/${AGENDA_NAME}/contacts/${id}`, {
    method: "DELETE",
    headers,
  });
  if (!response.ok) throw new Error("Error al eliminar contacto");
  return id; // Retorna el ID eliminado
};