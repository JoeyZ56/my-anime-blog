const fetchBio = async () => {
  try {
    const res = await fetch(`/api/user/bio?email=${user.email}`);
    const data = await res.json();

    if (data && data.length > 0) {
      setBio(data.bio);
    }
  } catch (error) {
    console.log(error, "error fetching bio");
  }
};

export default fetchBio;
