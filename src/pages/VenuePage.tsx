import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
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

function VenuePage() {
  const { id } = useParams();

  const [venue, setVenue] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);

  const validImages = venue?.media?.filter((image) => image?.url) || [];

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

  if (!venue) {
    return <p>Loading...</p>;
  }

  return (
    <div className="px-10 mt-[50px]">
      <div className="max-w-[1300px] w-full">
        <div className="flex gap-5">
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
          <div className="relative w-[1050px] h-[650px] flex-none overflow-hidden rounded-[30px]">
            <img
              src={validImages[selectedImage]?.url || noImage}
              alt={validImages[selectedImage]?.alt}
              className="absolute inset-0 w-full h-full object-cover"
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
        <div className="flex flex-1 justify-between mt-[35px]">
          <section className="mb-[100px] max-w-[876px] w-full pr-16">
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
                <p>Parking</p>
              </li>
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
                <p>Breakfast</p>
              </li>
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
                <p>Pets</p>
              </li>
            </ul>
          </section>
          <div className="bg-white shadow-lg w-[413px] h-[400px] rounded-[30px]"></div>
        </div>
      </div>
    </div>
  );
}

export default VenuePage;
