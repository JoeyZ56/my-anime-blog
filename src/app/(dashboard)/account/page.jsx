"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import fetchBio from "@/app/api/fetchCalls/fetchBio/fetchBio";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import UserPosts from "../userposts/page";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const { data: session } = useSession();

  const user = session?.user;
  console.log(session);

  useEffect(() => {
    if (session) {
      fetchBio();
    }
  });

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
      const response = await fetch("/api/user/bio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          bio: newBio,
        }),
      });
      const result = await response.json();
      if (response.ok) {
        setBio(newBio);
        closeModal();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error("Error saving bio:", error);
    }
  };

  return (
    <div className="account-container">
      {user && <h1>{user.name}&apos;s Account</h1>}
      <div>
        <Link href="/register">Update User Info</Link>
      </div>
      <div>
        <Image
          src="https://tse1.mm.bing.net/th?id=OIP.8nDOOlaYuDpSUAFEG0xKPgHaFy&pid=Api&P=0&h=180"
          alt="user"
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
      </div>

      <p>{bio}</p>
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
      <div>
        <UserPosts />
      </div>
    </div>
  );
};

export default Account;
