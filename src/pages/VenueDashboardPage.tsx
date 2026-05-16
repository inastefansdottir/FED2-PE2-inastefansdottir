import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import "react-day-picker/style.css";
import type { Media, Venue } from "../types/venue";
import noImage from "../assets/no-image.png";
import { getVenueById } from "../api/venues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faCircleCheck,
  faCircleXmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function VenueDashboardPage() {
  const { id } = useParams();

  const [venue, setVenue] = useState<Venue | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const validImages = venue?.media?.filter((image: Media) => image?.url) || [];

  useEffect(() => {
    async function fetchVenue() {
      if (!id) return;

      try {
        const response = await getVenueById(id);
        setVenue(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenue();
  }, [id]);

  return (
    <div className="px-10 mt-[50px] mb-[100px]">
      <div className="max-w-[1300px] w-full">
        <div className="flex gap-5">
          {/* Image slider */}
          <div className="flex flex-col h-[650px] gap-5 w-[229px] shrink-0">
            {Array.from({ length: 4 }).map((_, index) => {
              const image = validImages[index];

              return (
                <button
                  key={index}
                  disabled={!image}
                  onClick={() => image && setSelectedImage(index)}
                  className={`
        w-full h-[147px] rounded-[20px] overflow-hidden
        ${!image ? "bg-background cursor-not-allowed opacity-50" : ""}
      `}
                >
                  <img
                    src={image?.url || noImage}
                    alt={image?.alt || "No image available"}
                    className="w-full h-full object-cover"
                  />
                </button>
              );
            })}
          </div>
          <div className="relative max-w-[1050px] w-full h-[650px] overflow-hidden rounded-[30px]">
            {/* Main image */}
            <img
              src={validImages[selectedImage]?.url || noImage}
              alt={validImages[selectedImage]?.alt}
              className="w-[1050px] h-full object-cover"
            />

            {/* Left arrow */}
            <button
              onClick={() =>
                setSelectedImage((prev) =>
                  prev === 0 ? validImages.length - 1 : prev - 1
                )
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-background"
            >
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </button>

            {/* Right arrow */}
            <button
              onClick={() =>
                setSelectedImage((prev) => (prev + 1) % validImages.length)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-background"
            >
              <FontAwesomeIcon icon={faChevronRight} size="2xl" />
            </button>
          </div>
        </div>
        <div className="flex justify-between gap-10 mt-[35px]">
          {/* Venue info */}
          <section className="flex-1 min-w-0 pr-16">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">{venue.name}</h1>
              <div className="flex items-center self-start gap-1 text-brownDark pl-2">
                <FontAwesomeIcon icon={faStar} size="lg" />
                <span className="font-semibold text-xl">{venue.rating}</span>
              </div>
            </div>
            <div className="flex items-center text-primary mt-1 gap-0.5">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="text-primary">
                {venue.location.city}, {venue.location.country} •{" "}
                {venue.maxGuests} Guests
              </p>
            </div>
            <hr className="border-brownLight mt-4 w-full" />
            <div className="my-[30px]">
              <span className="font-semibold">Description</span>
              <p className="max-w-[500px] mt-2 mb-6">{venue.description}</p>
              <p className="secondary">
                <span className="font-semibold">Owner: </span>
                {venue.owner.name}
              </p>
              <hr className="border-brownLight mt-4" />
            </div>
            <ul className="grid gap-2 mt-[30px]">
              <li className="flex items-center">
                {venue.meta.wifi ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-primary mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-error mr-2"
                  />
                )}
                <p>Wifi</p>
              </li>
              <li className="flex items-center">
                {venue.meta.parking ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-primary mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-error mr-2"
                  />
                )}
                <p>Parking</p>
              </li>
              <li className="flex items-center">
                {venue.meta.breakfast ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-primary mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-error mr-2"
                  />
                )}
                <p>Breakfast</p>
              </li>
              <li className="flex items-center">
                {venue.meta.pets ? (
                  <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="text-primary mr-2"
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="text-error mr-2"
                  />
                )}
                <p>Pets</p>
              </li>
            </ul>
          </section>
          {/* Booking */}
          <div>
            <div className="flex gap-3">
              <Button className="w-full">Edit Venue</Button>
              <Button variant="error" className="w-full">
                Delete Venue
              </Button>
            </div>
            <h2 className="font-body text-xl font-semibold mt-[30px] mb-[15px]">
              Customer Bookings
            </h2>
            <div className="bg-white shadow-lg rounded-[10px] h-[340px] p-[20px] w-[500px]">
              <div
                className="
      grid
      grid-cols-[1.5fr_2fr_auto]
      items-center
      border-b
      border-brownLight
      pb-3
      text-brownDark
    "
              >
                <p>Venue</p>
                <p>Booked dates</p>
                <p>Guests</p>
              </div>

              <div
                className="
      grid
grid-cols-[1.5fr_2fr_53px]
      items-center
      border-b
      border-brownLight
      py-3
    "
              >
                <p>HelloKitty</p>
                <p>08.08.26 - 10.08.26</p>
                <p>2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenueDashboardPage;
