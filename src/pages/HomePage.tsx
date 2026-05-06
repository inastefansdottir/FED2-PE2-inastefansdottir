import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useRef } from "react";
import { getVenues } from "../api/venues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button";
import VenueCard from "../components/VenueCard";
import heroImage from "../assets/hero-image.png";

function HomePage() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);

  const [query, setQuery] = useState("");
  const [guests, setGuests] = useState<number | "">("");
  const [searchActive, setSearchActive] = useState(false);
  const [filters, setFilters] = useState({
    query: "",
    guests: "" as number | "",
    range: null,
  });

  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<any>();

  const [allVenuesLoaded, setAllVenuesLoaded] = useState(false);

  const [isSearchLoading, setIsSearchLoading] = useState(false);

  const calendarRef = useRef(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await getVenues(page, 40);

        setVenues((prev) => {
          const combined = [...prev, ...response.data];

          return combined.filter(
            (venue, index, self) =>
              index === self.findIndex((v) => v.id === venue.id)
          );
        });

        if (!response.meta.nextPage) {
          setAllVenuesLoaded(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenues();
  }, [page]);

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredVenues = searchActive
    ? venues.filter((venue) => {
        const q = (filters.query || "").toLowerCase();

        const location = venue.location;

        const fullLocation = `
  ${location?.address || ""}
  ${location?.city || ""}
  ${location?.zip || ""}
  ${location?.country || ""}
  ${location?.continent || ""}
`.toLowerCase();

        const matchesLocation = fullLocation.includes(q);

        const matchesGuests =
          typeof filters.guests === "number"
            ? venue.maxGuests >= filters.guests
            : true;

        let matchesDates = true;

        if (filters.range?.from && filters.range?.to && venue.bookings) {
          const from = new Date(filters.range.from);
          const to = new Date(filters.range.to);

          matchesDates = !venue.bookings.some((b) => {
            const bf = new Date(b.dateFrom);
            const bt = new Date(b.dateTo);

            return from <= bt && to >= bf;
          });
        }

        return matchesLocation && matchesGuests && matchesDates;
      })
    : venues;

  useEffect(() => {
    if (!searchActive) return;

    if (!allVenuesLoaded) {
      setIsSearchLoading(true);
      setPage((prev) => prev + 1);
    } else {
      setIsSearchLoading(false);
    }
  }, [venues, searchActive, allVenuesLoaded]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setFilters({
      query,
      guests,
      range,
    });

    setSearchActive(false);
    setAllVenuesLoaded(false);
    setVenues([]);
    setPage(1);
    setIsSearchLoading(true); // 👈 important

    setTimeout(() => {
      setSearchActive(true);
    }, 0);
  }

  return (
    <div className="relative flex flex-col">
      {/* Hero image */}
      <img src={heroImage} className="w-full h-[500px] object-cover" />

      {/* Search */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[466px] px-10 max-w-[1000px] w-full">
        <div className="p-2 bg-white rounded-full shadow-lg ">
          <form onSubmit={handleSubmit} className="flex w-full justify-between">
            {/* Location */}
            <div className="flex flex-col flex-1 justify-center px-5 min-w-0">
              <label htmlFor="location" className="text-xs font-semibold">
                Location:
              </label>
              <input
                id="location"
                name="location"
                type="text"
                placeholder="Search location"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="placeholder-primary pt-1"
              />
            </div>

            {/* Check-in and Check-out */}
            <div className="relative flex flex-col justify-center flex-[1.5] px-5 border-l border-accent min-w-0">
              <label className="text-xs font-semibold">
                Check-in & Check-out dates:
              </label>

              <div ref={calendarRef} className="relative w-full max-w-[340px]">
                {/* Fake input */}
                <div
                  onClick={() => setOpen((prev) => !prev)}
                  className="pt-1 text-primary cursor-pointer"
                >
                  {range?.from && range?.to
                    ? `${formatDate(range.from)} - ${formatDate(range.to)}`
                    : "Add dates"}
                </div>

                {/* Calendar dropdown */}
                {open && (
                  <div className="absolute top-full mt-2 bg-white shadow-lg rounded-lg p-4 z-50 left-0">
                    <DayPicker
                      mode="range"
                      selected={range}
                      onSelect={setRange}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Guests */}
            <div className="flex flex-col justify-center flex-[0.8] px-5 border-l border-accent min-w-0">
              <label htmlFor="guests" className="text-xs font-semibold">
                Guests:
              </label>
              <input
                id="guests"
                name="guests"
                type="number"
                placeholder="Add guests"
                value={guests}
                onChange={(e) =>
                  setGuests(e.target.value === "" ? "" : Number(e.target.value))
                }
                className="placeholder-primary pt-1"
              />
            </div>

            {/* Submit */}
            <div className="self-end">
              <Button type="submit" variant="secondary" size="big">
                Search
              </Button>
            </div>
          </form>
        </div>
      </div>

      {/* Venue card grid */}
      <div className="flex justify-center px-10 mt-[130px] mb-[85px]">
        {isSearchLoading ? (
          <span className="loader"></span>
        ) : (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
            {filteredVenues.map((venue) => (
              <VenueCard
                key={venue.id}
                to={`/venue/${venue.id}`}
                image={venue.media?.[0]?.url}
                alt={venue.media?.[0]?.alt}
                title={venue.name}
                rating={venue.rating}
                city={venue.location.city}
                country={venue.location.country}
                guests={venue.maxGuests}
                price={venue.price}
              />
            ))}
          </div>
        )}
      </div>

      {!searchActive && (
        <button
          onClick={() => setPage((prev) => prev + 1)}
          className="bg-primary rounded-full p-3 self-center hover:bg-secondary mb-[130px]"
        >
          <FontAwesomeIcon
            icon={faPlus}
            size="xl"
            className="text-background w-[1em]"
          />
        </button>
      )}
    </div>
  );
}

export default HomePage;
