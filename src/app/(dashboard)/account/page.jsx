"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import fetchBio from "@/app/api/fetchCalls/fetchBio/fetchBio";
import fetchProfileImage from "@/app/api/fetchCalls/fetchProfileImage/fetchProfileImage";
import Link from "next/link";
import Image from "next/image";
import Modal from "@/components/Modal/Modal";
import UserPosts from "../userposts/page";
import styles from "./account.module.scss";
import EditUserInfoModal from "../../../components/EditUserInfoModal/EditUserInfoModal";

const Account = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState("");
  const [newBio, setNewBio] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const { data: session } = useSession();

  const user = session?.user;
  console.log(session);

  useEffect(() => {
    const profileInfo = async () => {
      if (session) {
        const bioData = await fetchBio(user.email);
        if (bioData) {
          setBio(bioData);
        }

        const image = await fetchProfileImage(user.email);
        if (image) {
          setProfileImage(image);
        }
      }
    };
    profileInfo();
  }, [user]);

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
    <div className={styles.container}>
      {user && <h1>{user.name}&apos;s Account</h1>}
      <div className={styles.updateLink}></div>
      <div>
        {profileImage && (
          <Image
            src={profileImage}
            alt="user"
            width={200}
            height={200}
            style={{ borderRadius: "50%" }}
          />
        )}
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
      <EditUserInfoModal />
      <div>
        <UserPosts />
      </div>
    </div>
  );
};

export default Account;
