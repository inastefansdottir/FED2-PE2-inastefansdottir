import image from "../assets/hero-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
  faLocationDot,
  faCircleCheck,
  faCircleXmark,
  faStar,
} from "@fortawesome/free-solid-svg-icons";

function VenuePage() {
  return (
    <div className="px-10 mt-[50px]">
      <div className="max-w-[1300px] w-full">
        <div className="flex gap-5">
          <div className="flex flex-col h-[650px] gap-5 w-[229px] shrink-0">
            <img
              src={image}
              className="w-full h-full object-cover rounded-[20px]"
            />
            <img
              src={image}
              className="w-full h-full object-cover rounded-[20px]"
            />
            <img
              src={image}
              className="w-full h-full object-cover rounded-[20px]"
            />
            <img
              src={image}
              className="w-full h-full object-cover rounded-[20px]"
            />
          </div>
          <div className="relative flex-1 max-w-[1050px] h-[650px]">
            <img
              src={image}
              className="w-full h-full object-cover rounded-[30px]"
            />

            {/* Left arrow */}
            <button className="absolute left-4 top-1/2 -translate-y-1/2 text-background">
              <FontAwesomeIcon icon={faChevronLeft} size="2xl" />
            </button>

            {/* Right arrow */}
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-background">
              <FontAwesomeIcon icon={faChevronRight} size="2xl" />
            </button>
          </div>
        </div>
        <div className="flex flex-1 justify-between">
          <section className="mt-[35px] mb-[100px] max-w-[876px] w-full pr-16">
            <div className="flex justify-between items-center">
              <h1 className="text-3xl">Title</h1>
              <div className="flex items-center self-start gap-1 text-brownDark pl-2">
                <FontAwesomeIcon icon={faStar} size="lg" />
                <span className="font-semibold text-xl">5</span>
              </div>
            </div>
            <div className="flex items-center text-primary mt-1 gap-0.5">
              <FontAwesomeIcon icon={faLocationDot} />
              <p className="text-primary">City, Country • 2 Guest</p>
            </div>
            <hr className="border-brownLight mt-4 w-full" />
            <div className="my-[30px]">
              <span className="font-semibold">Description</span>
              <p className="max-w-[500px] mt-2 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
                suscipit nulla vel elit convallis, et tempus eros interdum.
                Curabitur lobortis justo vel fermentum molestie. Morbi pretium,
                metus vel aliquam mattis, risus ante pellentesque sem, et varius
                elit diam sed nunc.
              </p>
              <p className="secondary">
                <span className="font-semibold">Owner: </span>HelloKitty
              </p>
              <hr className="border-brownLight mt-4" />
            </div>
            <ul className="grid gap-2 mt-[30px]">
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-primary mr-2"
                />{" "}
                <p>Wifi</p>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-primary mr-2"
                />{" "}
                <p>Wifi</p>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircleCheck}
                  className="text-primary mr-2"
                />{" "}
                <p>Wifi</p>
              </li>
              <li className="flex items-center">
                <FontAwesomeIcon
                  icon={faCircleXmark}
                  className="text-error mr-2"
                />{" "}
                <p>Wifi</p>
              </li>
            </ul>
          </section>
          <div className="bg-white shadow-lg w-[413px] h-[400px] rounded-[30px]"></div>
        </div>
      </div>
    </div>
  );
}

export default VenuePage;
