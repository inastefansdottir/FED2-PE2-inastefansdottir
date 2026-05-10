import { Button } from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import VenueCard from "../components/VenueCard";
import EditVenueModal from "../components/EditVenue";
import image from "../assets/hero-image.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const navigate = useNavigate();
  const { logoutUser } = useAuth();
  const { user } = useAuth();

  const [showEdit, setShowEdit] = useState(false);

  function logout() {
    logoutUser();
    navigate("/");
  }

  return (
    <>
      <div className="w-full">
        <div className="relative">
          {/* Banner */}
          <img src={image} className="w-full h-[350px] object-cover" />

          {/* Avatar */}
          <div className="absolute inset-x-0 top-0 h-full pointer-events-none">
            <div className="max-w-[1300px] mx-auto px-10 relative h-full">
              <img
                src={image}
                className="
        absolute
        left-0
        top-[225px]
        object-cover
        w-[250px]
        h-[250px]
        border-4
        border-background
        rounded-full
      "
              />
            </div>
          </div>

          <div className="flex justify-center px-10">
            <div className="flex max-w-[1300px] w-full my-[100px]">
              {user.venueManager ? (
                <>
                  {/* Profile details */}
                  <div className="mr-10 mt-[75px]">
                    <h1 className="text-xl mb-1">UserName</h1>
                    <p className="text-brownDark mb-5">
                      hellokitty@stud.noroff.no
                    </p>
                    <p className="w-[250px] mb-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec varius dignissim pellentesque. In hac habitasse
                      platea dictumst.
                    </p>
                    <p className="text-sm text-primary mb-5">
                      Venue manager account
                    </p>
                    <div className="flex gap-2">
                      <Button to="/profile/edit" size="small">
                        Edit Profile
                      </Button>
                      <Button
                        onClick={() => setShowEdit(true)}
                        variant="secondary"
                        size="small"
                      >
                        New Venue
                      </Button>
                    </div>
                  </div>

                  {/* Display venues */}
                  <div className="w-full">
                    <div className="w-full flex justify-between items-end mb-7">
                      <p className="font-semibold text-xl">
                        Your Venues: <span className="text-primary">4</span>
                      </p>
                      <Button onClick={logout} variant="error">
                        Log out
                      </Button>
                    </div>

                    {/* Venues*/}
                    <div className="bg-white rounded-2xl p-5">
                      <div className="grid grid-cols-3 gap-[25px]">
                        <VenueCard
                          to="/venue"
                          image={image}
                          alt="something"
                          title="title"
                          rating={5}
                          city="city"
                          country="country"
                          guests={2}
                          price={2000}
                        />
                        <VenueCard
                          to="/venue"
                          image={image}
                          alt="something"
                          title="title"
                          rating={5}
                          city="city"
                          country="country"
                          guests={2}
                          price={2000}
                        />
                        <VenueCard
                          to="/venue"
                          image={image}
                          alt="something"
                          title="title"
                          rating={5}
                          city="city"
                          country="country"
                          guests={2}
                          price={2000}
                        />
                        <VenueCard
                          to="/venue"
                          image={image}
                          alt="something"
                          title="title"
                          rating={5}
                          city="city"
                          country="country"
                          guests={2}
                          price={2000}
                        />
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Profile details */}
                  <div className="mr-10 mt-[75px]">
                    <h1 className="text-xl mb-1">UserName</h1>
                    <p className="text-brownDark mb-5">
                      hellokitty@stud.noroff.no
                    </p>
                    <p className="w-[250px] mb-5">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Donec varius dignissim pellentesque. In hac habitasse
                      platea dictumst.
                    </p>
                    <Button size="small">Edit Profile</Button>
                  </div>

                  {/* Display bookings */}
                  <div className="w-full">
                    <div className="w-full flex justify-between items-end mb-7">
                      <p className="font-semibold text-xl">
                        Your bookings: <span className="text-primary">2</span>
                      </p>
                      <Button onClick={logout} variant="error">
                        Log out
                      </Button>
                    </div>

                    {/* Bookings */}
                    <div className="bg-white rounded-2xl h-[430px] p-5">
                      <div className="w-full">
                        {/* Info */}
                        <div
                          className="
      grid
      grid-cols-[2fr_2fr_1fr_auto]
      items-center
      border-b
      border-brownLight
      pb-3
      text-brownDark
    "
                        >
                          <p>Venue</p>
                          <p>Booked dates</p>
                          <p>Guests</p>
                          <p className="justify-self-end">Delete</p>
                        </div>

                        {/* Row */}
                        <div
                          className="
      grid
      grid-cols-[2fr_2fr_1fr_auto]
      items-center
      border-b
      border-brownLight
      py-3
    "
                        >
                          <p>Luxury Hotel</p>

                          <p>08.08.26 - 10.08.26</p>

                          <p>2</p>

                          <button
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
        mx-3
      "
                          >
                            <FontAwesomeIcon icon={faTrash} size="xs" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {showEdit && <EditVenueModal onClose={() => setShowEdit(false)} />}
    </>
  );
}

export default ProfilePage;
