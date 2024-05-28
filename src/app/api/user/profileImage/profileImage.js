export const GET = async (request) => {
  const { email } = request.query;

  try {
    await connect();

    const user = await User.findOne({ email });

    if (user && user.profileImage) {
      return new NextResponse(
        JSON.stringify({ profileImage: user.profileImage }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Error fetching profile image" }),
      {
        status: 500,
      }
    );
  }
};
