import React, { useState } from "react";

const EventForm = ({ title, fields, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="event-form-container">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit} className="event-form">
        {fields.map(({ name, label, type }) => (
          <div key={name} className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
              id={name}
              name={name}
              type={type}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          Soumettre
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Annuler
        </button>
      </form>
    </div>
  );
};

export default EventForm;
