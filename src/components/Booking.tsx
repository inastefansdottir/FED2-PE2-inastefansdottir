import { Button } from "./Button";
import { useEffect, useState } from "react";
import { DayPicker } from "react-day-picker";
import { useRef } from "react";
import { createBooking } from "../api/bookings";
import { useAuth } from "../context/AuthContext";
import type { VenueWithBookings } from "../types/venue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleExclamation,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";

function Booking({ venue }: { venue: VenueWithBookings }) {
  const [open, setOpen] = useState(false);
  const [range, setRange] = useState<any>();
  const [guests, setGuests] = useState<number | "">("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState(false);

  const { user } = useAuth();

  const calendarRef = useRef<HTMLDivElement | null>(null);

  const bookedDates = (venue?.bookings || []).map((booking) => ({
    from: new Date(booking.dateFrom),
    to: new Date(booking.dateTo),
  }));

  function isDateBooked(date: Date) {
    return bookedDates.some((booking) => {
      return date >= booking.from && date <= booking.to;
    });
  }

  const nights =
    range?.from && range?.to
      ? Math.ceil(
          (range.to.getTime() - range.from.getTime()) / (1000 * 60 * 60 * 24)
        )
      : 0;

  const total = nights * venue.price;

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

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

  async function handleBooking(e: React.FormEvent) {
    e.preventDefault();

    setError("");

    if (!range?.from || !range?.to) {
      setError("Please select dates");
      return;
    }

    if (!guests) {
      setError("Please enter guests");
      return;
    }

    if (guests <= 0) {
      setError("Please enter atleast 1 guest");
      return;
    }

    if (guests > venue.maxGuests) {
      setError(`Max ${venue.maxGuests} guests allowed`);
      return;
    }

    try {
      setLoading(true);

      const payload = {
        dateFrom: range.from,
        dateTo: range.to,
        guests: Number(guests),
        venueId: venue.id,
      };

      await createBooking(payload);

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "Booking failed");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center text-center rounded-lg h-[373px]">
        <FontAwesomeIcon
          icon={faSquareCheck}
          className="text-primary text-[100px]"
        />

        <h2 className="text-2xl font-body font-semibold text-primary mt-2">
          Booking successful!
        </h2>

        <p className="mt-2 text-secondary">
          Your reservation has been confirmed.
        </p>

        <Button className="mt-4" to="/profile">
          View Booking
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleBooking}
      className="flex flex-col text-secondary gap-4"
      noValidate
    >
      {/* Price */}
      <p className="text-primary text-xl">
        <span className="font-semibold text-secondary">{venue.price} NOK</span>
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
              disabled={[{ before: new Date() }, (date) => isDateBooked(date)]}
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
            setGuests(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder={`Max ${venue.maxGuests} guests`}
          className="placeholder-primary pt-1 outline-none"
        />
      </div>

      <p className="self-end text-primary">
        {venue.price} NOK x {nights} nights
      </p>

      <hr className="border-accent w-full" />

      <div className="flex justify-between font-semibold">
        <span>Total</span>
        <p>{total} NOK</p>
      </div>

      {error && (
        <div className="bg-error/20 text-error text-sm py-3 px-4 px rounded-full mt-1">
          <FontAwesomeIcon icon={faCircleExclamation} className="mr-1" />
          {error}
        </div>
      )}

      <Button className="mt-3 w-full" disabled={!user || loading} type="submit">
        {!user ? "Login to book" : loading ? "Booking..." : "Book now"}
      </Button>
    </form>
  );
}

export default Booking;
