import { Button } from "../components/Button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getMyVenues, getProfileBookings } from "../api/profile";
import { deleteBooking } from "../api/bookings";
import type { Venue } from "../types/venue";
import type { Booking } from "../types/booking";
import EditProfileModal from "../components/EditProfile";
import CreateVenueModal from "../components/CreateVenue";
import VenuesPanel from "../components/profile/VenuesPanel";
import BookingsPanel from "../components/profile/BookingsPanel";
import SEO from "../components/SEO";

function ProfilePage() {
  const navigate = useNavigate();
  const { user, loading, logoutUser } = useAuth();

  const [showEdit, setShowEdit] = useState(false);
  const [showCreateVenue, setShowCreateVenue] = useState(false);

  const [myVenues, setMyVenues] = useState<Venue[]>([]);
  const [myBookings, setMyBookings] = useState<Booking[]>([]);

  const [venuesLoading, setVenuesLoading] = useState(true);
  const [bookingsLoading, setBookingsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"venues" | "bookings">("venues");

  function logout() {
    logoutUser();
    navigate("/");
  }

  async function fetchVenues() {
    if (!user?.venueManager || !user?.name) return;

    try {
      setVenuesLoading(true);

      const response = await getMyVenues(user.name);
      setMyVenues(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setVenuesLoading(false);
    }
  }

  useEffect(() => {
    fetchVenues();
  }, [user]);

  function formatDate(date: Date) {
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  }

  useEffect(() => {
    async function fetchBookings() {
      if (!user?.name) return;

      try {
        setBookingsLoading(true);

        const response = await getProfileBookings(user.name);
        setMyBookings(response.data);
      } finally {
        setBookingsLoading(false);
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

  async function handleDeleteBooking(id: string) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this booking?"
    );

    if (!confirmed) return;

    try {
      await deleteBooking(id);

      setMyBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <SEO
        title={`${user?.name || "Profile"} | Holidaze`}
        description="View and manage your bookings and venues."
      />

      <div className="w-full self-start">
        <div className="relative">
          {/* Banner */}
          <img
            src={user?.banner?.url}
            alt={user?.banner?.alt}
            className="w-full h-[350px] object-cover"
          />

          {/* Avatar */}
          <div className="absolute max-[1380px]:pl-10 max-[767px]:pl-5 max-[700px]:pl-0 max-[700px]:left-1/2 max-[700px]:-translate-x-1/2 inset-x-0 top-0 h-full pointer-events-none w-full">
            <div className="max-w-[1300px] mx-auto px-10 relative h-full max-[700px]:px-0 ">
              <img
                src={user?.avatar?.url}
                alt={user?.avatar?.alt}
                className="
                absolute
                top-[225px]
                left-0
                w-[250px]
                h-[250px]
                object-cover
                border-4
                border-background
                rounded-full
                max-[700px]:left-1/2
                max-[700px]:-translate-x-1/2
              "
              />
            </div>
          </div>

          {/* Main layout */}
          <div className="flex justify-center md:px-10 px-5">
            <div className="flex max-[700px]:flex-col max-[700px]:items-center max-[1050px]:gap-0 max-[700px]:gap-20 max-w-[1300px] w-full my-[100px]">
              {/* Profile info */}
              <div className="max-[700px]:text-center mr-10 max-[700px]:mr-0 mt-[75px]">
                <h1 className="text-xl mb-1">{user.name}</h1>
                <p className="text-brownDark mb-5">{user.email}</p>

                <p className="w-[250px] mb-3">
                  {user.bio ? user.bio : "User doesn't have a bio yet"}
                </p>

                {user.venueManager && (
                  <p className="text-sm text-primary mb-5">
                    Venue manager account
                  </p>
                )}

                <div className="flex gap-2">
                  <Button onClick={() => setShowEdit(true)} size="small">
                    Edit Profile
                  </Button>

                  {user.venueManager && (
                    <Button
                      variant="secondary"
                      size="small"
                      onClick={() => setShowCreateVenue(true)}
                    >
                      New Venue
                    </Button>
                  )}
                </div>
              </div>

              {/* Content box */}
              <div className="w-full">
                <div className="w-full flex justify-between items-center mb-7">
                  {/* Tabs */}
                  {user.venueManager ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => setActiveTab("venues")}
                        className={`
    text-sm px-4 py-2.5 rounded-full border transition
    ${
      activeTab === "venues"
        ? "bg-accent/50 text-primary border-primary"
        : "text-primary border-primary"
    }
  `}
                      >
                        Venues: {myVenues.length}
                      </button>

                      <button
                        onClick={() => setActiveTab("bookings")}
                        className={`
    text-sm px-4 py-2.5 rounded-full border transition
    ${
      activeTab === "bookings"
        ? "bg-brownLight/50 text-brownDark border-brownDark"
        : "text-brownDark border-brownDark"
    }
  `}
                      >
                        Bookings: {myBookings.length}
                      </button>
                    </div>
                  ) : (
                    <p className="font-semibold text-xl text-secondary">
                      My Bookings:{" "}
                      <span className="text-primary">{myBookings.length}</span>
                    </p>
                  )}

                  <Button size="small" onClick={logout} variant="error">
                    Log out
                  </Button>
                </div>

                {/* WHITE BOX */}
                <div className="bg-white rounded-2xl p-5 min-h-[420px]">
                  {user.venueManager ? (
                    activeTab === "venues" ? (
                      <VenuesPanel
                        venues={myVenues}
                        loading={venuesLoading}
                        onCreate={() => setShowCreateVenue(true)}
                      />
                    ) : (
                      <BookingsPanel
                        bookings={myBookings}
                        loading={bookingsLoading}
                        onDelete={handleDeleteBooking}
                        formatDate={formatDate}
                      />
                    )
                  ) : (
                    <BookingsPanel
                      bookings={myBookings}
                      loading={bookingsLoading}
                      onDelete={handleDeleteBooking}
                      formatDate={formatDate}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}

      {showCreateVenue && (
        <CreateVenueModal
          onClose={() => setShowCreateVenue(false)}
          onSave={fetchVenues}
        />
      )}
    </>
  );
}

export default ProfilePage;
