import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faLocationDot,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import type { VenueCardProps } from "../types/venueCard";

function VenueCard({
  to,
  image,
  alt,
  title,
  rating,
  city,
  country,
  guests,
  price,
}: VenueCardProps) {
  return (
    <Link
      to={to}
      className=" bg-white shadow-lg rounded-[20px] h-full w-full aspect-[3/4] overflow-hidden min-h-[380px] flex flex-col transition-all duration-200 ease-out
hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div>
        <img
          src={image}
          alt={alt}
          className="aspect-[3/2] bg-brownLight object-cover w-full h-full"
        />
      </div>
      <div className="flex flex-col p-5 flex-1 justify-between">
        <div>
          <div className="flex justify-between">
            <h2 className="min-[580px]:text-xl text-2xl">{title}</h2>
            <div className="flex items-center self-start gap-0.5 text-brownDark pl-2">
              <FontAwesomeIcon icon={faStar} />
              <span className="font-semibold text-secondary">{rating}</span>
            </div>
          </div>
          <div className="flex items-center text-secondary mt-1 gap-0.5">
            <FontAwesomeIcon icon={faLocationDot} size="xs" />
            <p className="text-xs">
              {city}, {country}
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center gap-0.5 text-primary">
            <FontAwesomeIcon icon={faUser} size="sm" />
            <span className="text-secondary font-semibold">{guests}</span>
          </div>
          <p className="text-secondary text-right">
            <span className="font-semibold">{price} NOK</span>
            /Night
          </p>
        </div>
      </div>
    </Link>
  );
}

export default VenueCard;
