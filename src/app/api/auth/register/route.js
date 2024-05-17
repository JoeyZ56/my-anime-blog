import User from "@/models/User";
import connect from "@/lib/database";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import multer from "multer";
import cloudinary from "@/lib/cloudinary";
import { promisify } from "util";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = promisify(upload.single("profileImage"));

export const POST = async (request) => {
  await connect();

  return new Promise((resolve) => {
    uploadMiddleware(request, {}, async (err) => {
      if (err) {
        resolve(
          new NextResponse("Image upload failed", {
            status: 500,
          })
        );
        return;
      }

      const { name, email, password } = request.body;
      const profileImage = request.file;

      if (!profileImage) {
        resolve(
          new NextResponse("No image provided", {
            status: 400,
          })
        );
        return;
      }

      try {
        // Upload image to Cloudinary
        const result = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(profileImage.buffer);
        });

        const hashedPassword = await bcrypt.hash(password, 5);

        const newUser = new User({
          name,
          email,
          password: hashedPassword,
          profileImage: result.secure_url,
        });

        await newUser.save();

        resolve(
          new NextResponse("User has been created", {
            status: 201,
          })
        );
      } catch (err) {
        resolve(
          new NextResponse(err.message, {
            status: 500,
          })
        );
      }
    });
  });
};
