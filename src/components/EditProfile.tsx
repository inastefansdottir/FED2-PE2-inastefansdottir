import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { updateProfile } from "../api/profile";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";

type Props = {
  onClose: () => void;
};

export default function EditProfileModal({ onClose }: Props) {
  const { user, loginUser } = useAuth();

  const [formData, setFormData] = useState({
    bannerUrl: user?.banner?.url || "",
    avatarUrl: user?.avatar?.url || "",
    bio: user?.bio || "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!user) return;

    setLoading(true);
    setError("");

    try {
      const response = await updateProfile(user.name, {
        bio: formData.bio,
        avatar: {
          url: formData.avatarUrl,
          alt: `${user.name} avatar`,
        },
        banner: {
          url: formData.bannerUrl,
          alt: `${user.name} banner`,
        },
      });

      // update auth context
      loginUser({
        ...user,
        ...response.data,
      });

      onClose();
    } catch (err: any) {
      setError(err.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="
    relative
    bg-background
    max-w-[710px]
    w-full
    max-h-[80vh]
    overflow-y-auto
    text-secondary
    py-[40px]
    rounded-3xl
    shadow-lg
  "
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl flex justify-center mb-4">Edit Profile</h1>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-[40px] right-[30px] text-lg"
        >
          ✕
        </button>

        {/* Banner */}
        <img
          src={formData.bannerUrl || user?.banner?.url}
          className="relative w-full h-[200px] object-cover"
        />

        {/* Avatar */}
        <img
          src={formData.avatarUrl || user?.avatar?.url}
          className="absolute top-[200px] left-1/2 -translate-x-1/2
 w-[150px] h-[150px] border-2 border-background rounded-full object-cover"
        />

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-[100px] px-[30px] gap-[30px]"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="banner">Banner image url:</label>

            <input
              id="banner"
              name="bannerUrl"
              type="text"
              value={formData.bannerUrl}
              onChange={handleChange}
              className="bg-white text-secondary text-lg border border-secondary rounded-full flex-1 px-5 py-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="avatar">Avatar image url:</label>

            <input
              id="avatar"
              name="avatarUrl"
              type="text"
              value={formData.avatarUrl}
              onChange={handleChange}
              className="bg-white text-secondary text-lg border border-secondary rounded-full flex-1 px-5 py-3"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="bio">Bio:</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={5}
              className="bg-white text-secondary text-lg border border-secondary rounded-[20px] flex-1 p-5"
            />
          </div>

          {/* API ERROR BOX */}
          {error && (
            <div className="bg-error/20 text-error text-sm py-3 px-4 rounded-full">
              <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>
      </div>
    </div>
  );
}
