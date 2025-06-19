import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ handleClocseClick }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={handleClocseClick}
          className="modal__close"
          type="button"
        ></button>
        <p className="modal__heading-delete">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button className="modal__delete-confirm" type="submit">
          Yes, delete item
        </button>
        <button className="modal__delete-cancel">Cancel</button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
