import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyVenues, getProfileBookings } from "../api/profile";
import VenueCard from "../components/VenueCard";
import EditVenueModal from "../components/EditVenue";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading, logoutUser } = useAuth();

  const [showEdit, setShowEdit] = useState(false);
  const [myVenues, setMyVenues] = useState([]);
  const [myBookings, setMyBookings] = useState([]);

  function logout() {
    logoutUser();
    navigate("/");
  }

  useEffect(() => {
    async function fetchVenues() {
      if (!user?.name) return;

      try {
        const response = await getMyVenues(user.name);
        setMyVenues(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchVenues();
  }, [user]);

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.name) return;

      try {
        const response = await getProfileBookings(user.name);
        setMyBookings(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBookings();
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="w-full">
        <div className="relative">
          {/* Banner */}
          <img
            src={user?.banner?.url}
            alt={user?.banner?.alt}
            className="w-full h-[350px] object-cover"
          />

          {/* Avatar */}
          <div className="absolute max-[1380px]:pl-10 inset-x-0 top-0 h-full pointer-events-none">
            <div className="max-w-[1300px] mx-auto px-10 relative h-full">
              <img
                src={user?.avatar?.url}
                alt={user?.avatar?.alt}
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
                    <h1 className="text-xl mb-1">{user.name}</h1>
                    <p className="text-brownDark mb-5">{user.email}</p>
                    <p className="w-[250px] mb-3">
                      {user.description
                        ? user.description
                        : "User doesn't have a description"}
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
                        Your Venues:{" "}
                        <span className="text-primary">{myVenues.length}</span>
                      </p>
                      <Button onClick={logout} variant="error">
                        Log out
                      </Button>
                    </div>

                    {/* Venues*/}
                    <div className="bg-white rounded-2xl p-5">
                      {myVenues.length === 0 ? (
                        <div className="flex flex-col items-center justify-center gap-5 h-[380px] ">
                          <p className="text-xl w-[250px] text-center">
                            You haven't created any venues yet
                          </p>
                          <Button variant="secondary">Create Venue</Button>
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-[25px]">
                          {myVenues.map((venue) => (
                            <VenueCard
                              key={venue.id}
                              to={`/venue/${venue.id}`}
                              image={venue.media?.[0]?.url}
                              alt={venue.media?.[0]?.alt}
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
                  </div>
                </>
              ) : (
                <>
                  {/* Profile details */}
                  <div className="mr-10 mt-[75px]">
                    <h1 className="text-xl mb-1">{user.name}</h1>
                    <p className="text-brownDark mb-5">{user.email}</p>
                    <p className="w-[250px] mb-3">
                      {user.description
                        ? user.description
                        : "User doesn't have a description"}
                    </p>
                    <Button size="small">Edit Profile</Button>
                  </div>

                  {/* Display bookings */}
                  <div className="w-full">
                    <div className="w-full flex justify-between items-end mb-7">
                      <p className="font-semibold text-xl">
                        Your bookings:{" "}
                        <span className="text-primary">
                          {myBookings.length}
                        </span>
                      </p>
                      <Button onClick={logout} variant="error">
                        Log out
                      </Button>
                    </div>

                    {/* Bookings */}
                    <div className="bg-white rounded-2xl h-[420px] p-5">
                      {myBookings.length === 0 ? (
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
                          {myBookings.map((booking) => (
                            <div
                              key={booking.id}
                              className="
      grid
      grid-cols-[2fr_2fr_1fr_auto]
      items-center
      border-b
      border-brownLight
      py-3
    "
                            >
                              <p>{booking.venue.name}</p>

                              <p>
                                {booking.dateFrom} - {booking.dateTo}
                              </p>

                              <p>{booking.guests}</p>

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
                          ))}
                        </div>
                      )}
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
