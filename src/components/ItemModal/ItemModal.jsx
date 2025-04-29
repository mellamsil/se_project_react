import "./ItemModal.css";

function ItemModal({ onClose, card, isOpen, onDeleteItem }) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt="Card" className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info-container">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button onClick={onDeleteItem} className="modal__delete-item">
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
