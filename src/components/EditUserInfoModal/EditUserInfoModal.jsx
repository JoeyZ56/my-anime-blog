import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";

const EditUserInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={handleModal}>Edit User Info</button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div>
          <h2>Edit Info</h2>
          <form>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
          </form>
          <button onClick={handleCloseModal}>Close</button>
        </div>
      </Modal>
    </>
  );
};

export default EditUserInfoModal;
