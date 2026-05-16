import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useRef } from "react";
import { getVenues } from "../api/venues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../components/Button";
import VenueCard from "../components/VenueCard";
import type { Venue } from "../types/venue";
import heroImage from "../assets/hero-image.png";

function HomePage() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [page, setPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [guests, setGuests] = useState<number | "">("");

  const [range, setRange] = useState<any>();
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      if (loading || !hasMore) return;

      setLoading(true);

      try {
        const response = await getVenues(page, 40);

        setVenues((prev) => {
          const map = new Map();

          [...prev, ...response.data].forEach((v) => {
            map.set(v.id, v);
          });

          return Array.from(map.values());
        });

        setHasMore(!!response.meta?.nextPage);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchVenues();
  }, [page, searchQuery]);

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

  useEffect(() => {
    if (!searchQuery) {
      setIsSearching(false);
    }
  }, [searchQuery]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setVenues([]);
    setPage(1);
    setHasMore(true);

    setIsSearching(true);
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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
        {isSearching ? (
          <span className="loader"></span>
        ) : (
          <div className="grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
            {venues.map((venue) => (
              <VenueCard
                key={venue.id}
                to={`/venue/${venue.id}`}
                image={venue.media?.[0]?.url}
                alt={venue.media?.[0]?.alt ?? ""}
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

      <button
        onClick={() => {
          if (!loading && hasMore) {
            setPage((prev) => prev + 1);
          }
        }}
        className="bg-primary rounded-full p-3 self-center hover:bg-secondary mb-[130px]"
      >
        <FontAwesomeIcon
          icon={faPlus}
          size="xl"
          className="text-background w-[1em]"
        />
      </button>
    </div>
  );
}

export default HomePage;
