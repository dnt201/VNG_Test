import React, { useState } from "react";
import Modal from "react-modal";

interface iConfirmModal {
  confirm: boolean;
  setConfirm: () => void;
}

const ConfirmModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <Modal
      isOpen={isOpen}
      // onAfterOpen={afterOpenModal}
      onRequestClose={() => {
        setIsOpen(false);
      }}
      contentLabel="Example Modal"
    >
      <h2>Hello</h2>
      <button
        onClick={() => {
          setIsOpen(false);
        }}
      >
        close
      </button>
      <div>I am a modal</div>
    </Modal>
  );
};

export default ConfirmModal;
