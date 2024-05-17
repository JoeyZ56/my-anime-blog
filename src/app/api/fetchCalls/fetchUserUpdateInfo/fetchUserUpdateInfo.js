const fetchUpdateUserinfo = async () => {
  try {
    const res = await fetch(
      `/api/user/updateUserInfo?email=${user.email}?username=${user.username}?password=${user.password}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          username: user.username,
          password: user.password,
        }),
      }
    );
    const data = await res.json();

    if (data) {
      setUpdateInfo(data.updateInfo);
    }
  } catch (error) {
    console.log(error, "error updating user info");
  }
};

export default fetchUpdateUserinfo;
