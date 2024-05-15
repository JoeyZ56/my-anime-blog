"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const { data: session } = useSession();

  const user = session?.user;
  // console.log(session);

  const fetchBio = async () => {
    try {
      // console.log("User:", user);
      const res = await fetch(`/api/user/bio/?email=${user.email}`);
      const data = await res.json();

      if (data && data.length > 0) {
        setBio(data[0].bio);
      }
    } catch (error) {
      console.error(error, "error fetching bio");
    }
  };

  useEffect(() => {
    if (session) {
      fetchBio();
    }
  }, [session]);

  const handleBioModal = () => {
    setIsOpen(!isOpen);
    setNewBio(bio);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleBioChange = (e) => {
    setNewBio(e.target.value);
  };

  const saveBio = async () => {
    try {
      await fetch("/api/user/bio[id]", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          bio: newBio,
        }),
      });
      closeModal();
      setBio(newBio);
    } catch (error) {
      console.log(error, "error saving bio");
    }
  };

  return (
    <div className="account-container">
      {user && <h1>{user.name}&apos;s account</h1>}
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
          value={newBio}
          input="text"
          onChange={handleBioChange}
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
        <button onClick={saveBio}>Save</button>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default Account;
