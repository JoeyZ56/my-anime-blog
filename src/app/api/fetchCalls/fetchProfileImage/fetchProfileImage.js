const fetchProfileImage = async (email) => {
  try {
    const res = await fetch(`/api/user/profileImage?email=${email}`);
    const data = await res.json();

    if (data && data.profileImage) {
      return data.profileImage;
    }
    return null;
  } catch (error) {
    console.log(error, "error fetching profile image");
    return null;
  }
};
