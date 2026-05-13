import { useState } from "react";
import { Button } from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import imagePlaceholder from "../assets/image-placeholder.png";
import image from "../assets/hero-image.png";

type Props = {
  onClose: () => void;
};

export default function EditVenueModal({ onClose }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
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
        <h1 className="text-2xl flex justify-center mb-4">Edit Venue</h1>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-[40px] right-[30px] text-lg"
        >
          ✕
        </button>
        {/* FORM */}
        <form className="flex flex-col mt-6 px-[30px] gap-5">
          <h2 className="font-body text-xl"> Venue details</h2>

          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              type="text"
              className="bg-white text-secondary border border-secondary rounded-full flex-1 px-5 py-2.5"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              rows={4}
              className="bg-white text-secondary text-lg border border-secondary rounded-[20px] flex-1 p-5"
            />
          </div>

          <h2 className="font-body text-xl">
            Images <span className="text-primary">(max 4)</span>
          </h2>

          <div className="grid grid-cols-4 gap-4">
            {/* Slot 1 (example with image) */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <img
                src={image}
                alt="preview-1"
                className="w-full h-full object-cover"
              />

              <button
                className="
        absolute top-2 right-2
        w-6 h-6
        rounded-full
        bg-black/70
        text-white
        text-xs
        flex items-center justify-center
      "
              >
                ✕
              </button>
            </div>

            {/* Slot 2 */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <img
                src={imagePlaceholder}
                alt="preview-2"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Slot 3 */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <img
                src={imagePlaceholder}
                alt="preview-3"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Slot 4 */}
            <div className="relative w-full aspect-square rounded-xl overflow-hidden border">
              <img
                src={imagePlaceholder}
                alt="preview-4"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1 mt-4">
            <label htmlFor="image">Image URL:</label>

            <div className="flex gap-2">
              <input
                id="image"
                name="image"
                type="text"
                className="
        bg-white
        text-secondary
        border border-secondary
        rounded-full
        flex-1
        px-5 py-2.5
      "
              />

              <Button variant="secondary">Add image</Button>
            </div>
          </div>

          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="price">Price per night (NOK):</label>
              <input
                id="price"
                name="price"
                type="number"
                className="bg-white text-secondary border border-secondary rounded-full flex-1 px-5 py-2.5 w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="maxGuests">Max guests:</label>
              <input
                id="maxGuests"
                name="maxGuests"
                type="number"
                className="bg-white text-secondary border border-secondary rounded-full flex-1 px-5 py-2.5 w-full"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="rating">Rating:</label>
              <input
                id="rating"
                name="rating"
                type="number"
                className="bg-white text-secondary border border-secondary rounded-full flex-1 px-5 py-2.5 w-full"
              />
            </div>
          </div>

          <h2 className="font-body text-xl">Amenities</h2>

          <div className="flex justify-between w-full max-w-[550px]">
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="item1"
                name="amenities"
                value="wifi"
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="item1">Wifi</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="item1"
                name="amenities"
                value="parking"
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="item2">Parking</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="item1"
                name="amenities"
                value="breakfast"
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="item3">Breakfast</label>
            </div>

            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="item1"
                name="amenities"
                value="pets"
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="item4">Pets</label>
            </div>
          </div>

          <h2 className="font-body text-xl">Location</h2>

          <div className="grid gap-2 mb-5">
            <div className="flex gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="address">Address:</label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="city">City:</label>
                <input
                  id="city"
                  name="city"
                  type="text"
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="country">Country:</label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />
              </div>

              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="zip">Zip code:</label>
                <input
                  id="zip"
                  name="zip"
                  type="number"
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />
              </div>
            </div>
          </div>

          {/* API ERROR BOX */}
          {error && (
            <div className="bg-error/20 text-error text-sm py-3 px-4 rounded-full">
              <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
              {error}
            </div>
          )}

          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Venue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
