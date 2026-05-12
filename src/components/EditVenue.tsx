import { useAuth } from "../context/AuthContext";
import { Button } from "./Button";

type Props = {
  onClose: () => void;
};

export default function EditVenueModal({ onClose }: Props) {
  const { user } = useAuth();

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
          src={user?.banner?.url}
          className="relative w-full h-[200px] object-cover"
        />

        {/* Avatar */}
        <img
          src={user?.banner?.url}
          className="absolute top-[200px] left-1/2 -translate-x-1/2
 w-[150px] h-[150px] border-2 border-background rounded-full object-cover"
        />

        {/* FORM */}
        <form className="flex flex-col mt-[100px] px-[30px] gap-[30px]">
          <div className="flex flex-col gap-2">
            <label htmlFor="banner">Banner image url:</label>

            <div className="flex gap-2">
              <input
                id="banner"
                name="banner"
                type="text"
                className="bg-white text-secondary text-lg border border-secondary rounded-full flex-1"
              />

              <Button variant="secondary">Add image</Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="avatar">Avatar image url:</label>

            <div className="flex gap-2">
              <input
                id="avatar"
                name="avatar"
                type="text"
                className="bg-white text-secondary text-lg border border-secondary rounded-full flex-1"
              />

              <Button variant="secondary">Add image</Button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="description">Description:</label>

            <div className="flex gap-2">
              <textarea
                id="avatar"
                name="avatar"
                rows={5}
                className="bg-white text-secondary text-lg border border-secondary rounded-[20px] flex-1"
              />
            </div>
          </div>

          <Button>Update Profile</Button>
        </form>
      </div>
    </div>
  );
}
