import React from "react";
import PropTypes from "prop-types";

const ContactForm = ({ 
  formData, 
  isEditing, 
  onChange, 
  onSubmit 
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Full Name
        </label>
        <input
          type="text"
          name="full_name"
          value={formData.full_name}
          onChange={onChange}
          className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          required
        />
      </div>

      {/* Repetir para email, phone y address */}

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        {isEditing ? "Update Contact" : "Create Contact"}
      </button>
    </form>
  );
};

ContactForm.propTypes = {
  formData: PropTypes.object.isRequired,
  isEditing: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired
};

export default ContactForm;