const fetchBio = async (email) => {
  try {
    const res = await fetch(`/api/user/bio?email=${email}`);
    const data = await res.json();

    if (data && data.bio) {
      return data.bio;
    }
    return null;
  } catch (error) {
    console.log(error, "error fetching bio");
    return null;
  }
};

export default fetchBio;
