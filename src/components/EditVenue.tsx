type Props = {
  onClose: () => void;
};

export default function EditVenueModal({ onClose }: Props) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      {/* MODAL */}
      <div
        className="relative bg-white max-w-[400px] w-full text-secondary px-[30px] py-[40px] rounded-3xl shadow-lg"
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

        {/* FORM */}
        <form className="flex flex-col"></form>
      </div>
    </div>
  );
}
