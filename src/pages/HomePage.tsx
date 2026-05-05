import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import VenueCard from "../components/VenueCard";
import heroImage from "../assets/hero-image.png";

function HomePage() {
  const [venues, setVenues] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const response = await getVenues(page, 40);
        setVenues((prev) => [...prev, ...response.data]);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenues();
  }, [page]);

  return (
    <div className="flex flex-col">
      <img src={heroImage} className="w-full h-[500px] object-cover" />
      <div className="flex justify-center px-10 mt-[130px] mb-[85px]">
        <div className=" grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
          {venues.map((venue) => (
            <VenueCard
              key={venue.id}
              to={`/venue/${venue.id}`}
              image={venue.media?.[0]?.url}
              alt={venue.media?.[0]?.alt}
              title={venue.name}
              rating={venue.rating}
              city={venue.location.city}
              country={venue.location.country}
              price={venue.price}
            />
          ))}
        </div>
      </div>
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
    </div>
  );
}

export default HomePage;
