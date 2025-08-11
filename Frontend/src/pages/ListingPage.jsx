import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const ListingPage = ({ searchQuery = "" }) => {
  const [eventType, setEventType] = useState("Both");
  const { data, loading, error } = useFetch(
    "https://bi-assignment-1-gamma.vercel.app/events"
  );

  const events = data && data.length > 0 ? data : [];

  if (loading) return <p className="container py-2">Loading events...</p>;
  if (error)
    return <p className="container py-2">Error loading events: {error}</p>;

  // Filter events by type
  const filteredByType =
    eventType === "Both"
      ? events
      : events.filter((event) => event.type === eventType);

  // Case-insensitive search on title and tags
  const filteredEvents = filteredByType.filter((event) => {
    const lowerSearch = searchQuery.toLowerCase();
    const tagsString = event.tags.join(" ").toLowerCase();
    return (
      event.title.toLowerCase().includes(lowerSearch) ||
      tagsString.includes(lowerSearch)
    );
  });

  return (
    <main className="bg-body-tertiary min-vh-100 py-4">
      <div className="container">
        <section className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center py-2 gap-3 gap-md-0">
          <div>
            <h1 className="mb-0">Meetup Events</h1>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label htmlFor="eventType" className="mb-0">
              Select Event Type:
            </label>
            <select
              id="eventType"
              className="form-select w-auto"
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="Online Event">Online</option>
              <option value="Offline Event">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </section>

        <section className="py-3">
          <div className="row g-4">
            {filteredEvents.length === 0 && (
              <p className="text-center">No events found.</p>
            )}

            {filteredEvents.map((event) => (
              <div className="col-12 col-sm-6 col-md-4" key={event._id}>
                <div
                  className="card position-relative h-100"
                  style={{ minHeight: "350px" }}
                >
                  <span
                    className="badge bg-white text-dark position-absolute top-0 start-0 py-2 m-2"
                    style={{ zIndex: 1 }}
                  >
                    {event.type}
                  </span>
                  <img
                    src={event.image}
                    alt="img-card"
                    className="card-img-top rounded"
                    style={{ objectFit: "cover", height: "180px" }}
                  />
                  <div className="card-body d-flex flex-column">
                    <span className="text-warning-emphasis mb-2">
                      {event.startDate} · {event.startTime} IST
                    </span>
                    <h3 className="card-title fs-5 flex-grow-1">
                      <Link
                        to={`/details/${event._id}`}
                        className="link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                      >
                        {event.title}
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ListingPage;
