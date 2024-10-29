"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";

import OvalLoader from "@/components/loader/OvalLoader";

const ProfilePage = () => {
  const session = useSession();
  const { status } = session;
  const [userName, setUserName] = useState("");

  const handleProfileInfo = async (e) => {
    e.preventDefault();
    const uploadToast = toast.loading("Saving...");
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
        }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.error || "Failed to update");
      updateProfileData(data);
      toast.success("Profile saved!", { id: uploadToast });
    } catch (error) {
      toast.error("Saving error!", { id: uploadToast });
    }
  };

  const updateProfileData = (data) => {
    setUserName(data.name || "");
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("/api/profile");
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch");
        updateProfileData(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchUserData();
  }, [status, session.data]);

  if (status === "loading") {
    return <OvalLoader />;
  }

  return (
    <section className="min-h-screen mx-auto p-4 max-w-xl">
      <div className="flex gap-4 items-center justify-center">
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 grow"
          onSubmit={handleProfileInfo}
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="First and last name"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            value={session.data.user.email}
            disabled={true}
            className="w-full p-2 mb-4 border rounded bg-gray-100"
          />
          <button
            type="submit"
            className="bg-black hover:bg-blue-600 text-white 
            font-semibold rounded focus:outline-none 
            focus:shadow-outline"
          >
            Save
          </button>
        </form>
      </div>
    </section>
  );
};
export default ProfilePage;
