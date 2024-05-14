"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import styles from "./account.module.scss";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const user = session?.user;

  const handleBioModal = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const saveBio = () => {
    // save bio to db
  };

  return (
    <div id="account-container">
      {/* <h1>{user.name}s account</h1> */}
      <div>
        <Image
          src="https://tse1.mm.bing.net/th?id=OIP.8nDOOlaYuDpSUAFEG0xKPgHaFy&pid=Api&P=0&h=180"
          alt="user"
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
      </div>

      {/* <p>{user.bio}</p> */}
      <button onClick={handleBioModal}>Edit Bio</button>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <h2>Edit Bio</h2>

        <textarea
          input="text"
          style={{
            width: "100%",
            height: "100px",
            padding: "10px",
            margin: "10px 0",
            boxSizing: "border-box",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button onClick={() => null}>Save</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Account;
