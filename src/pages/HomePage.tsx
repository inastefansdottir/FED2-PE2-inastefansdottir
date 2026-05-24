import { useEffect, useMemo, useState } from "react";
import { DayPicker } from "react-day-picker";
import type { DateRange } from "react-day-picker";
import "react-day-picker/style.css";
import { useRef } from "react";
import { getVenues } from "../api/venues";
import { Button } from "../components/Button";
import VenueCard from "../components/VenueCard";
import VenueCardSkeleton from "../components/VenueCardSkeleton";
import type { VenueWithBookings } from "../types/venue";
import { useAuth } from "../context/AuthContext";
import heroImage from "../assets/hero-image.png";
import SEO from "../components/SEO";

function HomePage() {
  const [venues, setVenues] = useState<VenueWithBookings[]>([]);
  const [page, setPage] = useState(1);

  const { user } = useAuth();

  const [query, setQuery] = useState("");
  const [guests, setGuests] = useState<number | "">("");
  const [searchActive, setSearchActive] = useState(false);
  const [filters, setFilters] = useState<{
    query: string;
    guests: number | "";
    range: DateRange | undefined;
  }>({
    query: "",
    guests: "",
    range: undefined,
  });

  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>();

  const [allVenuesLoaded, setAllVenuesLoaded] = useState(false);

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [loading, setLoading] = useState(true);

  const calendarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    async function fetchVenues() {
      try {
        setLoading(true);

        const response = await getVenues(page, 40);

        setVenues((prev) => {
          const map = new Map();

          [...prev, ...response.data].forEach((venue) => {
            map.set(venue.id, {
              ...venue,

              _searchLocation: `
        ${venue.location?.address || ""}
        ${venue.location?.city || ""}
        ${venue.location?.zip || ""}
        ${venue.location?.country || ""}
        ${venue.location?.continent || ""}
      `.toLowerCase(),

              _bookings: venue.bookings?.map((b) => ({
                from: new Date(b.dateFrom).getTime(),
                to: new Date(b.dateTo).getTime(),
              })),
            });
          });

          return Array.from(map.values());
        });

        if (!response.meta.nextPage) {
          setAllVenuesLoaded(true);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
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

  const filteredVenues = useMemo(() => {
    if (!searchActive) return venues;

    const q = filters.query.toLowerCase();

    const hasDateRange = !!(filters.range?.from && filters.range?.to);

    const from = filters.range?.from
      ? new Date(filters.range.from).getTime()
      : 0;

    const to = filters.range?.to ? new Date(filters.range.to).getTime() : 0;

    return venues.filter((venue) => {
      // LOCATION MATCH
      const matchesLocation = venue._searchLocation?.includes(q) ?? true;

      // GUESTS
      const matchesGuests =
        typeof filters.guests === "number"
          ? venue.maxGuests >= filters.guests
          : true;

      // DATES
      let matchesDates = true;

      if (hasDateRange && venue._bookings) {
        matchesDates = !venue._bookings.some((b) => {
          return from <= b.to && to >= b.from;
        });
      }

      return matchesLocation && matchesGuests && matchesDates;
    });
  }, [venues, filters, searchActive]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const isEmptySearch =
      query.trim() === "" && guests === "" && !range?.from && !range?.to;

    // RESET TO DEFAULT PAGINATED STATE
    if (isEmptySearch) {
      setSearchActive(false);

      setFilters({
        query: "",
        guests: "",
        range: undefined,
      });

      setAllVenuesLoaded(false);
      setVenues([]);
      setPage(1);
      setIsSearchLoading(false);

      return;
    }

    // SEARCH MODE
    setFilters({
      query,
      guests,
      range,
    });

    setSearchActive(true);

    setAllVenuesLoaded(false);
    setVenues([]);
    setPage(1);
    setIsSearchLoading(true);
  }

  useEffect(() => {
    if (!searchActive) return;

    if (!allVenuesLoaded) {
      setIsSearchLoading(true);

      const timeout = setTimeout(() => {
        setPage((prev) => prev + 1);
      }, 0);

      return () => clearTimeout(timeout);
    } else {
      setIsSearchLoading(false);
    }
  }, [venues, searchActive, allVenuesLoaded]);

  return (
    <>
      <SEO
        title="Holidaze | Find and book amazing venues"
        description="Browse and book unique venues for your next stay."
      />

      <div className="relative w-full flex flex-col self-start">
        <h1 className="hidden">Holidaze Home page</h1>

        {/* Hero image */}
        <img
          src={heroImage}
          alt="Hero image of a hotel bedroom"
          className="w-full h-[500px] object-cover"
        />

        {/* Search */}
        <div className="absolute left-1/2 -translate-x-1/2 top-[466px] max-[720px]:top-[380px] px-5 md:px-10 max-w-[1000px] w-full">
          <div className="p-2 max-[720px]:p-5 bg-white rounded-full max-[720px]:rounded-[20px] shadow-lg ">
            <form
              onSubmit={handleSubmit}
              className="flex max-[720px]:flex-col w-full justify-between"
            >
              {/* Location */}
              <div className="flex flex-col flex-1 justify-center px-5 max-[720px]:px-0 max-[720px]:pb-4 min-w-0 max-[720px]:border-b max-[720px]:border-accent">
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
              <div className="relative flex flex-col justify-center flex-[1.5] px-5 max-[720px]:px-0 max-[720px]:py-4 border-l max-[720px]:border-l-0 max-[720px]:border-b border-accent min-w-0">
                <label className="text-xs font-semibold">
                  Check-in & Check-out dates:
                </label>

                <div
                  ref={calendarRef}
                  className="relative w-full max-w-[340px]"
                >
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
                        disabled={{ before: new Date() }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Guests + Submit wrapper */}
              <div
                className="
    flex
    items-center
    flex-1
    border-l
    border-accent
    max-[720px]:border-l-0
    max-[720px]:pt-4
    max-[720px]:justify-between
    max-[720px]:gap-4
  "
              >
                {/* Guests */}
                <div className="flex flex-col justify-center px-5 max-[720px]:px-0 min-w-[150px] max-[720px]:min-w-0">
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
                      setGuests(
                        e.target.value === "" ? "" : Number(e.target.value)
                      )
                    }
                    className="placeholder-primary pt-1 w-full"
                  />
                </div>

                {/* Submit */}
                <div>
                  <Button
                    type="submit"
                    variant="secondary"
                    size="big"
                    className="max-[720px]:px-10"
                  >
                    Search
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Venue card grid */}
        <div className="flex justify-center px-5 md:px-10 mt-[130px] max-[720px]:mt-[200px] mb-[85px]">
          {loading || isSearchLoading ? (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 min-[580px]:grid-cols-2 grid-cols-1 gap-[30px] max-w-[1300px] w-full">
              {[...Array(8)].map((_, i) => (
                <VenueCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 min-[580px]:grid-cols-2 grid-cols-1 gap-[30px] max-w-[1300px] w-full">
              {filteredVenues.map((venue) => {
                const isOwner = venue.owner?.name === user?.name;

                return (
                  <VenueCard
                    key={venue.id}
                    to={
                      isOwner
                        ? `/venue/dashboard/${venue.id}`
                        : `/venue/${venue.id}`
                    }
                    image={venue.media?.[0]?.url}
                    alt={venue.media?.[0]?.alt ?? ""}
                    title={venue.name}
                    rating={venue.rating}
                    city={venue.location.city}
                    country={venue.location.country}
                    guests={venue.maxGuests}
                    price={venue.price}
                  />
                );
              })}
            </div>
          )}
        </div>

        {!searchActive && (
          <Button
            variant="secondary"
            onClick={() => setPage((prev) => prev + 1)}
            className="self-center mb-[130px]"
          >
            Load More
          </Button>
        )}
      </div>
    </>
  );
}

export default HomePage;
