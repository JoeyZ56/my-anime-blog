"use client";
import React, { useState, useEffect, use } from "react";
import Modal from "@/components/Modal/Modal";
import styles from "./styles.module.scss";

const EditUserInfoModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const profileImage = e.target[3].value;

    try {
      const res = await fetch("/api/auth/[id]", {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          profileImage,
        }),
      });
      res.status === 201 &&
        router.push("/login?success=Account has been updated");
    } catch (error) {
      setError(true);
    }
  };

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <button onClick={handleModal} id="account-btns">
        Edit User Info
      </button>
      <Modal isOpen={isOpen} onClose={handleCloseModal}>
        <div className={styles.container}>
          <h2>Edit Info</h2>
          <form className={styles.form}>
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Email" />
            <input type="text" placeholder="Password" />
            <input type="url" placeholder="Profile Image" />
            <button
              type="submit"
              onClick={handleUpdateUserInfo}
              className={styles.btn}
            >
              Update
            </button>
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
