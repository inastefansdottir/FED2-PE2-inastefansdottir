import { useEffect, useState } from "react";
import { getVenues } from "../api/venues";
import VenueCard from "../components/VenueCard";
import heroImage from "../assets/hero-image.png";

function HomePage() {
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    async function fetchVenues() {
      try {
        const data = await getVenues();
        setVenues(data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenues();
  }, []);

  return (
    <div>
      <img src={heroImage} />
      <div className="px-10 mt-[130px] mb-[85px]">
        <div className="max-w-[1300px] w-full grid xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-[30px]">
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
    </div>
  );
}

export default HomePage;
