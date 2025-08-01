import "./DeleteConfirmModal.css";

function DeleteConfirmModal({ handleCloseClick, onDeleteItem, onCancel }) {
  return (
    <div className="modal modal_opened">
      <div className="modal__content modal__content_type_delete">
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        ></button>
        <p className="modal__heading-delete">
          Are you sure you want to delete this item? This action is
          irreversible.
        </p>
        <button
          className="modal__delete-confirm"
          type="submit"
          onClick={onDeleteItem}
        >
          Yes, delete item
        </button>
        <button
          className="modal__delete-cancel"
          type="button"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
