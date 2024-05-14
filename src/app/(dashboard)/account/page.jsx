"use client";
import { useSession } from "next-auth/react";
import styles from "./account.module.scss";
import Image from "next/image";

const Account = () => {
  const { data: session } = useSession();

  const user = session?.user;

  return (
    <div id="account-container">
      <h1>Account</h1>
      <div>
        <Image
          src="https://tse1.mm.bing.net/th?id=OIP.8nDOOlaYuDpSUAFEG0xKPgHaFy&pid=Api&P=0&h=180"
          alt="user"
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
      </div>
      <div>
        <h2>{user?.name}</h2>
        {/* <h3>{user.email}</h3>
        <h3>{user.bio}</h3> */}
      </div>
    </div>
  );
};

export default Account;
