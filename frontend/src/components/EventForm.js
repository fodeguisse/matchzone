import React, { useState } from "react";

const EventForm = ({ title, fields, onSubmit, onClose, initialValues = {}, validate }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate ? validate(formData) : {};
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      // Préparation des données (par exemple, pour inclure le fichier dans un FormData si nécessaire)
      const dataToSend = formData.file ? new FormData() : { ...formData };

      if (formData.file) {
        Object.keys(formData).forEach((key) => {
          dataToSend.append(key, formData[key]);
        });
      }

      onSubmit(dataToSend);
    }
  };

  const handleReset = () => {
    setFormData(initialValues);
    setErrors({});
  };

  return (
    <div className="event-form-container">
      <h3>{title}</h3>
      <form onSubmit={handleSubmit} className="event-form">
        {fields.map(({ name, label, type, options }) => (
          <div key={name} className="form-group">
            <label htmlFor={name}>{label}</label>
            {type === "select" ? (
              <select
                id={name}
                name={name}
                onChange={handleChange}
                value={formData[name] || ""}
                aria-invalid={errors[name] ? "true" : "false"}
              >
                {options.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            ) : type === "textarea" ? (
              <textarea
                id={name}
                name={name}
                onChange={handleChange}
                value={formData[name] || ""}
                required
                aria-invalid={errors[name] ? "true" : "false"}
              />
            ) : type === "file" ? (
              <input
                id={name}
                name={name}
                type={type}
                onChange={handleChange}
                aria-invalid={errors[name] ? "true" : "false"}
              />
            ) : (
              <input
                id={name}
                name={name}
                type={type}
                onChange={handleChange}
                value={type === "file" ? undefined : formData[name] || ""}
                required
                aria-invalid={errors[name] ? "true" : "false"}
              />
            )}
            {errors[name] && <span className="error-text">{errors[name]}</span>}
          </div>
        ))}
        <button type="submit" className="btn btn-success">
          Soumettre
        </button>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Annuler
        </button>
        <button type="button" className="btn btn-warning" onClick={handleReset}>
          Réinitialiser
        </button>
      </form>
    </div>
  );
};

export default EventForm;
