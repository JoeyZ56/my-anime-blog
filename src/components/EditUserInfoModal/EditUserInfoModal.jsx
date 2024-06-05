import React, { useState, useEffect } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./styles.module.scss";

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
        <div className={styles.container}>
          <h2>Edit Info</h2>
          <form className={styles.form}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
          </form>
          <button onClick={handleCloseModal} className={styles.btn}>
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default EditUserInfoModal;
