import { useState } from "react";
import { Button } from "./Button";
import { createVenue } from "../api/venues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import imagePlaceholder from "../assets/image-placeholder.png";

type Props = {
  onClose: () => void;
  onSave: () => void;
};

export default function CreateVenueModal({ onClose, onSave }: Props) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: 0,
    maxGuests: 0,
    address: "",
    city: "",
    country: "",
    zip: "",
  });

  const [images, setImages] = useState<string[]>(["", "", "", ""]);

  const [imageInput, setImageInput] = useState("");
  const [amenities, setAmenities] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");

  const [fieldErrors, setFieldErrors] = useState({
    name: "",
    description: "",
    price: "",
    maxGuests: "",
    address: "",
    city: "",
    country: "",
    zip: "",
    image: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setFieldErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setApiError("");
  }

  function addImage() {
    if (!imageInput.trim()) return;

    const index = images.findIndex((img) => img === "");

    // validate URLs
    try {
      new URL(imageInput);
    } catch {
      setFieldErrors((prev) => ({
        ...prev,
        image: "Please enter a valid URL",
      }));

      return;
    }

    // max reached
    if (index === -1) {
      setFieldErrors((prev) => ({
        ...prev,
        image: "Maximum 4 images allowed",
      }));

      return;
    }

    // prevent duplicates
    if (images.includes(imageInput)) {
      setFieldErrors((prev) => ({
        ...prev,
        image: "This image has already been added",
      }));

      return;
    }

    const updated = [...images];
    updated[index] = imageInput;

    setImages(updated);
    setImageInput("");

    // clear image errors
    setFieldErrors((prev) => ({
      ...prev,
      image: "",
    }));
  }

  function removeImage(index: number) {
    const updated = [...images];
    updated[index] = "";

    setImages(updated);

    setFieldErrors((prev) => ({
      ...prev,
      image: "",
    }));
  }

  function toggleAmenity(amenity: string) {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((item) => item !== amenity)
        : [...prev, amenity]
    );
  }

  function validate() {
    const errors = {
      name: "",
      description: "",
      price: "",
      maxGuests: "",
      address: "",
      city: "",
      country: "",
      zip: "",
      image: "",
    };

    if (!form.name) errors.name = "Name is required";
    if (!form.description) errors.description = "Description is required";

    if (!form.price || Number(form.price) <= 0)
      errors.price = "Price must be greater than 0";

    if (!form.maxGuests || Number(form.maxGuests) <= 0)
      errors.maxGuests = "Max guests is required";

    if (!form.address) errors.address = "Address is required";
    if (!form.city) errors.city = "City is required";
    if (!form.country) errors.country = "Country is required";
    if (!form.zip) errors.zip = "Zip code is required";

    const hasImage = images.some((img) => img.trim() !== "");
    if (!hasImage) {
      errors.image = "You must add at least 1 image";
    }

    setFieldErrors(errors);

    return !Object.values(errors).some((e) => e);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setApiError("");

    const isValid = validate();
    if (!isValid) return;

    setLoading(true);

    try {
      const payload = {
        name: form.name,
        description: form.description,
        price: Number(form.price),
        maxGuests: Number(form.maxGuests),

        media: images.filter(Boolean).map((url) => ({
          url,
          alt: form.name,
        })),

        meta: {
          wifi: amenities.includes("wifi"),
          parking: amenities.includes("parking"),
          breakfast: amenities.includes("breakfast"),
          pets: amenities.includes("pets"),
        },

        location: {
          address: form.address,
          city: form.city,
          zip: form.zip,
          country: form.country,
        },
      };

      await createVenue(payload);

      onSave();
      onClose();
    } catch (err: any) {
      setApiError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 md:px-10 px-5"
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
    sm:py-[40px]
    py-[30px]
    rounded-3xl
    shadow-lg
  "
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl flex justify-center mb-4">
          Create a new Venue
        </h1>

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute sm:top-[40px] top-[30px] sm:right-[30px] right-5 text-lg"
        >
          ✕
        </button>
        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-6 sm:px-[30px] px-5 gap-5"
        >
          <h2 className="font-body text-xl"> Venue details</h2>

          {/* Name */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name">Name:</label>

            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className={`bg-white border px-5 py-2.5 rounded-full ${
                fieldErrors.name
                  ? "border-error text-error"
                  : "border-secondary text-secondary"
              }`}
            />

            <p className="text-error text-xs h-5 text-right">
              {fieldErrors.name}
            </p>
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1">
            <label htmlFor="description">Description:</label>

            <textarea
              id="description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              className={`bg-white border rounded-[20px] px-5 py-3 ${
                fieldErrors.description
                  ? "border-error text-error"
                  : "border-secondary text-secondary"
              }`}
            />

            <p className="text-error text-xs h-5 text-right">
              {fieldErrors.description}
            </p>
          </div>

          {/* IMAGES */}
          <h2 className="font-body text-xl">
            Images <span className="text-primary">(max 4)</span>
          </h2>

          {/* Image previews */}
          <div>
            <div className="grid grid-cols-4 max-[500px]:grid-cols-2 gap-4">
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`relative w-full aspect-square rounded-xl overflow-hidden border ${
                    fieldErrors.image ? "ring-2 ring-error rounded-xl" : ""
                  }`}
                >
                  <img
                    src={img || imagePlaceholder}
                    className="w-full h-full object-cover"
                  />

                  {img && (
                    <button
                      onClick={() => removeImage(index)}
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
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <p className="text-error text-xs h-5 text-right mt-2">
              {fieldErrors.image}
            </p>
          </div>

          {/* Image input */}
          <div className="flex flex-col gap-1">
            <label htmlFor="image">Image URL:</label>

            <div className="flex gap-2">
              <input
                id="image"
                name="image"
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="
        bg-white
        text-secondary
        border border-secondary
        rounded-full
        flex-1
        px-5 py-2.5
        w-full
      "
              />

              <Button type="button" variant="secondary" onClick={addImage}>
                Add image
              </Button>
            </div>
          </div>

          {/* Price */}
          <div className="flex gap-2">
            <div className="flex flex-col gap-1">
              <label htmlFor="price">Price per night:</label>

              <input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full max-w-[200px]"
              />

              <p className="text-error text-xs h-5 text-right">
                {fieldErrors.price}
              </p>
            </div>

            {/* Max guests */}
            <div className="flex flex-col gap-1">
              <label htmlFor="maxGuests">Max guests:</label>

              <input
                id="maxGuests"
                name="maxGuests"
                type="number"
                value={form.maxGuests}
                onChange={handleChange}
                className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full max-w-[200px]"
              />

              <p className="text-error text-xs h-5 text-right">
                {fieldErrors.maxGuests}
              </p>
            </div>
          </div>

          {/* AMENITIES */}
          <h2 className="font-body text-xl">Amenities</h2>

          {/* Checkboxes */}
          <div className="flex justify-between w-full max-w-[550px] max-[450px]:justify-start flex-wrap gap-x-16 gap-y-10">
            {/* Wifi */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="wifi"
                checked={amenities.includes("wifi")}
                onChange={() => toggleAmenity("wifi")}
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="wifi" className="max-[450px]:w-[75px]">
                Wifi
              </label>
            </div>

            {/* Parking */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="parking"
                checked={amenities.includes("parking")}
                onChange={() => toggleAmenity("parking")}
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="parking">Parking</label>
            </div>

            {/* Breakfast */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="breakfast"
                checked={amenities.includes("breakfast")}
                onChange={() => toggleAmenity("breakfast")}
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="breakfast">Breakfast</label>
            </div>

            {/* Pets */}
            <div className="flex gap-2 items-center">
              <input
                type="checkbox"
                id="pets"
                checked={amenities.includes("pets")}
                onChange={() => toggleAmenity("pets")}
                className="accent-primary h-4 w-4"
              />
              <label htmlFor="pets">Pets</label>
            </div>
          </div>

          {/* LOCATION */}
          <h2 className="font-body text-xl">Location</h2>

          <div className="grid gap-2 mb-5">
            <div className="flex gap-2 max-[450px]:flex-col">
              {/* Address */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="address">Address:</label>

                <input
                  id="address"
                  name="address"
                  type="text"
                  value={form.address}
                  onChange={handleChange}
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />

                <p className="text-error text-xs h-5 text-right">
                  {fieldErrors.address}
                </p>
              </div>

              {/* City */}
              <div className="flex flex-col gap-1 w-full">
                <label htmlFor="city">City:</label>

                <input
                  id="city"
                  name="city"
                  type="text"
                  value={form.city}
                  onChange={handleChange}
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />

                <p className="text-error text-xs h-5 text-right">
                  {fieldErrors.city}
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              {/* Country */}
              <div className="flex flex-col flex-1 gap-1 w-full">
                <label htmlFor="country">Country:</label>

                <input
                  id="country"
                  name="country"
                  type="text"
                  value={form.country}
                  onChange={handleChange}
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />

                <p className="text-error text-xs h-5 text-right">
                  {fieldErrors.country}
                </p>
              </div>

              {/* Zip code */}
              <div className="flex flex-col flex-[0.6] gap-1 w-full">
                <label htmlFor="zip">Zip code:</label>

                <input
                  id="zip"
                  name="zip"
                  type="number"
                  value={form.zip}
                  onChange={handleChange}
                  className="bg-white text-secondary border border-secondary rounded-full px-5 py-2.5 w-full"
                />

                <p className="text-error text-xs h-5 text-right">
                  {fieldErrors.zip}
                </p>
              </div>
            </div>
          </div>

          {/* API ERROR BOX */}
          {apiError && (
            <div className="bg-error/20 text-error text-sm py-3 px-4 rounded-full">
              <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
              {apiError}
            </div>
          )}

          {/* SUBMIT BUTTON */}
          <Button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Venue"}
          </Button>
        </form>
      </div>
    </div>
  );
}
