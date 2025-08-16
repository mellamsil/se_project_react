import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useFormAndValidation from "../../hooks/useFormAndValidation";

export default function AddItemModal({
  isOpen,
  onClose,
  onAddItemModalSubmit,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({
      name: values.name,
      imageUrl: values.imageUrl,
      weather: values.weather,
    })
      .then(() => {
        resetForm();
        onClose();
      })
      .catch((err) => {
        console.error("Error adding item:", err);
      });
  };

  let formStateClass = "modal__submit--empty";
  if (values.name || values.imageUrl || values.weather) {
    formStateClass = "modal__submit--partial";
  }
  if (values.name && values.imageUrl && values.weather) {
    formStateClass = "modal__submit--filled";
  }

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onClose={() => {
        resetForm();
        onClose();
      }}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label modal__label_name">
        Name
        <input
          type="text"
          className="modal__input modal__input_name"
          id="name"
          name="name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name || ""}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>

      <label htmlFor="imageUrl" className="modal__label modal__label_image">
        Image
        <input
          type="url"
          className="modal__input modal__input_image"
          id="imageUrl"
          name="imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="hot"
            type="radio"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
            checked={values.weather === "hot"}
          />{" "}
          Hot
        </label>

        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="warm"
            type="radio"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
            checked={values.weather === "warm"}
          />{" "}
          Warm
        </label>

        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            name="weather"
            id="cold"
            type="radio"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
            checked={values.weather === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>

      <button
        type="submit"
        className={`modal__submit modal__submit_caption ${formStateClass}`}
        disabled={!isValid}
      >
        Add Garment
      </button>
    </ModalWithForm>
  );
}
