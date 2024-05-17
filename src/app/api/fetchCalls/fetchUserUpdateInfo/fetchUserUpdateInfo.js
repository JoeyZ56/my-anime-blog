const fetchUpdateUserinfo = async (email, username, password) => {
  try {
    const res = await fetch(
      `/api/user/updateUserInfo?email=${email}?username=${username}?password=${password}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
        }),
      }
    );
    const data = await res.json();

    if (data) {
      return data.updateInfo;
    }
  } catch (error) {
    console.log(error, "error updating user info");
  }
};

export default fetchUpdateUserinfo;
