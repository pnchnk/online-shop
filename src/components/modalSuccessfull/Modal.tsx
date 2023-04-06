import React from "react";
import "../modalSuccessfull/modal.css";

type Props = {
  closeModal : any
}

function Modal(props: Props) {
  const {
    closeModal,
  } = props;
  return (
    <>
      <div className="successfull-order" onClick={closeModal}></div>
      <div className="successfull-order__text">
        <div className="text-message">Your order has been successfully placed. Our managers will contact you shortly. Have a nice day!</div>
      </div>
    </>
  );
}

export default Modal;
