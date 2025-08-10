import { useState, useCallback } from "react";

// custom hook for handling form input state, validation, and reset

// Usage:
// Const { values, handleChange, errors, isValid, setValues, resetForm } = useFormValidation();

export default function useFormAndValidation() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  // Handle changes to form inputs
  const handleChange = (e) => {
    const { name, value, validationMessage } = e.target;

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage,
    }));

    // Check overall form validity
    setIsValid(e.target.closest("form").checkValidity());
  };

  // Reset form values, errors, and validity
  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    []
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    setValues,
    resetForm,
  };
}
