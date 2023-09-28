"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";
import styles from "./Logout.module.scss";

const Logout = () => {
  const session = useSession();
  return (
    <div>
      {" "}
      {session.status === "authenticated" && (
        <button className={styles.button} onClick={signOut}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Logout;
