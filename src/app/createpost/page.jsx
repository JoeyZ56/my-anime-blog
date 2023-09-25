import CreateForm from "@/components/CreatePost/CreateForm";
import React from "react";

export const metadata = {
  title: "Create Post",
  description: "Search anime topics to post about",
};

export default function CreatePost() {
  return (
    <div>
      <CreateForm />
    </div>
  );
}
