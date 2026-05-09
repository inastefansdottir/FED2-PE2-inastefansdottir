import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useRef } from "react";
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

  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<any>();
  const [guests, setGuests] = useState<number | "">("");

  const calendarRef = useRef(null);

  const bookedDates = (venue?.bookings || []).map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

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

  // Outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !(calendarRef.current as HTMLElement).contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!venue) {
    return <p>Loading...</p>;
  }

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
          {/* Booking */}
          <div className="bg-white shadow-lg rounded-[30px] p-[35px] w-[413px]">
            {/* Booking form */}
            <form className="flex flex-col text-secondary gap-4">
              {/* Price */}
              <p className="text-primary text-xl">
                <span className="font-semibold text-secondary">
                  {venue.price} NOK
                </span>
                /Night
              </p>

              {/* Date picker */}
              <div
                ref={calendarRef}
                className="relative text-sm flex flex-col border border-secondary rounded-md p-3"
              >
                <label htmlFor="date" className="font-semibold">
                  CHECK-IN & CHECK-OUT
                </label>

                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="pt-1 text-primary cursor-pointer"
                >
                  {range?.from && range?.to
                    ? `${formatDate(range.from)} - ${formatDate(range.to)}`
                    : "Add dates"}
                </div>

                {open && (
                  <div className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-lg p-4 z-50">
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                      disabled={[{ before: new Date() }, ...bookedDates]}
                    />
                  </div>
                )}
              </div>

              {/* Guests */}
              <div className="text-sm flex flex-col border border-secondary rounded-md p-3">
                <label htmlFor="guests" className="font-semibold">
                  GUESTS
                </label>

                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min={1}
                  max={venue.maxGuests}
                  value={guests}
                  onChange={(e) =>
                    setGuests(
                      e.target.value === "" ? "" : Number(e.target.value)
                    )
                  }
                  placeholder={`Max ${venue.maxGuests} guests`}
                  className="placeholder-primary pt-1 outline-none"
                />
              </div>

              <p className="self-end text-primary">
                {venue.price} NOK x 5 nights
              </p>

              <hr className="border-accent w-full" />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <p>12500 NOK</p>
              </div>

              <Button type="submit" className="mt-3 w-full">
                Book now
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VenuePage;
