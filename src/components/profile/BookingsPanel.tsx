import { Button } from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import type { Booking } from "../../types/booking";

type Props = {
  bookings: Booking[];
  loading: boolean;
  onDelete: (id: string) => void;
  formatDate: (date: Date) => string;
};

export default function BookingsPanel({
  bookings,
  loading,
  onDelete,
  formatDate,
}: Props) {
  return (
    <div className="bg-white rounded-2xl h-[408px] max-[920px]:text-sm max-[400px]:text-xs">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="loader"></span>
        </div>
      ) : bookings.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full gap-5">
          <p className="text-xl w-[250px] text-center">
            You haven't made any bookings yet
          </p>
          <Button to="/" variant="secondary">
            Browse Venues
          </Button>
        </div>
      ) : (
        <div className="w-full">
          <div className="grid grid-cols-[1.5fr_2fr_1fr_auto] items-center border-b pb-3 text-brownDark">
            <p>Venue</p>
            <p>Booked dates</p>
            <p>Guests</p>
            <p className="justify-self-end">Delete</p>
          </div>

          {bookings.map((booking) => (
            <div
              key={booking.id}
              className="
      grid
      grid-cols-[1.5fr_2fr_1fr_auto]
      items-center
      border-b
      border-brownLight
      py-3
    "
            >
              <p className="pr-3">{booking.venue?.name}</p>

              <p className="pr-3">
                {formatDate(new Date(booking.dateFrom))} -{" "}
                {formatDate(new Date(booking.dateTo))}
              </p>

              <p>{booking.guests}</p>

              <button
                onClick={() => onDelete(booking.id)}
                className="
    justify-self-end
    flex
    items-center
    justify-center
    py-2
    px-1.5
    rounded-full
    bg-error/20
    text-error
    hover:bg-error
    hover:text-background
    transition
    mx-1.5
    max-[920px]:mx-1
  "
              >
                <FontAwesomeIcon icon={faTrash} size="lg" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
