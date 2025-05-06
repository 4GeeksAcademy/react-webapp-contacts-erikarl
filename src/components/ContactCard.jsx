import React from 'react';

const ContactCard = ({ contact, onEdit, onDelete }) => {
  return (
    <div className="card mb-4 shadow-sm w-100">
      <div className="d-flex flex-md-row flex-column">
        {/* Columna de la imagen (solo ocupa espacio necesario) */}
        <div className="d-flex align-items-center justify-content-center p-3">
          <img 
            src="https://cdn-icons-png.flaticon.com/512/8102/8102780.png" 
            className="img-fluid rounded-circle" 
            alt={`Contacto ${contact.name || ''}`}
            style={{ width: '100px', height: '100px', objectFit: 'contain' }}
          />
        </div>
        
        {/* Columna del contenido (ocupa todo el espacio restante) */}
        <div className="flex-grow-1">
          <div className="card-body p-3">
            <h5 className="card-title">{contact.name || 'Nombre no disponible'}</h5>
            
            <div className="contact-details">
              {/* Email */}
              <p className="card-text mb-1">
                <small className="text-muted">
                  <i className="bi bi-envelope me-2"></i>
                  {contact.email || 'No especificado'}
                </small>
              </p>
              
              {/* Teléfono */}
              {contact.phone && (
                <p className="card-text mb-1">
                  <small className="text-muted">
                    <i className="bi bi-telephone me-2"></i>
                    {contact.phone}
                  </small>
                </p>
              )}
              
              {/* Dirección */}
              {contact.address && (
                <p className="card-text">
                  <small className="text-muted">
                    <i className="bi bi-geo-alt me-2"></i>
                    {contact.address}
                  </small>
                </p>
              )}
            </div>
            
            {/* Botones de acción */}
            <div className="mt-3 d-flex justify-content-end gap-2">
              <button 
                onClick={() => onEdit(contact.id)} 
                className="btn btn-sm btn-outline-primary"
              >
                <i className="bi bi-pencil me-1"></i> Editar
              </button>
              <button 
                onClick={() => onDelete(contact.id)} 
                className="btn btn-sm btn-outline-danger"
              >
                <i className="bi bi-trash me-1"></i> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;