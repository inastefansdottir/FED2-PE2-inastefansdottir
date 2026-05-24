import { Button } from "../Button";
import VenueCard from "../VenueCard";
import type { Venue } from "../../types/venue";

type Props = {
  venues: Venue[];
  loading: boolean;
  onCreate: () => void;
};

export default function VenuesPanel({ venues, loading, onCreate }: Props) {
  return (
    <div className="bg-white rounded-2xl">
      {loading ? (
        <div className="flex items-center justify-center min-h-[400px]">
          <span className="loader"></span>
        </div>
      ) : venues.length === 0 ? (
        <div className="h-[408px]">
          <div className="flex flex-col items-center justify-center gap-5 h-full">
            <p className="text-xl w-[250px] text-center">
              You haven't created any venues yet
            </p>
            <Button onClick={onCreate} variant="secondary">
              Create Venue
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid xl:grid-cols-3 min-[900px]:grid-cols-2 grid-cols-1 gap-[25px]">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              to={`/venue/dashboard/${venue.id}`}
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
  );
}
