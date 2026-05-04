import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faLocationDot } from "@fortawesome/free-solid-svg-icons";

function VenueCard() {
  return (
    <Link
      to={"/venue:id"}
      className=" bg-white shadow-lg rounded-[20px] max-w-[303px] w-full overflow-hidden min-h-[380px] flex flex-col transition-all duration-200 ease-out
hover:-translate-y-1 hover:scale-[1.02] hover:shadow-2xl"
    >
      <div className="w-full aspect-[3/2] bg-brownLight">
        <img className="w-full h-full object-cover" />
      </div>
      <div className="flex flex-col p-5 flex-1 justify-between">
        <div>
          <div className="flex justify-between">
            <h2 className="text-lg md:text-xl">
              aubcouabc aincviaanv alskcnaici ansc
            </h2>
            <div className="flex items-center self-start gap-0.5 text-brownDark pl-2">
              <FontAwesomeIcon icon={faStar} />
              <span className="font-semibold">0.0</span>
            </div>
          </div>
          <div className="flex text-primary mt-1">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="text-xs">City, Country</p>
          </div>
        </div>
        <p className="text-primary text-right self-end">
          <span className="font-semibold text-secondary">2000 NOK</span>
          /Night
        </p>
      </div>
    </Link>
  );
}

export default VenueCard;
