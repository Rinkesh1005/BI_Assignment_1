import { useState } from "react";
import { Link } from "react-router-dom";
import useFetch from "../useFetch";

const ListingPage = ({ searchQuery }) => {
  const [eventType, setEventType] = useState("Both");
  const { data, loading, error } = useFetch(
    "https://bi-assignment-1-gamma.vercel.app/events"
  );

  const events = data && data.length > 0 ? data : [];

  if (loading) return <p>Loading events...</p>;
  if (error) return <p>Error loading events: {error}</p>;

  const filteredByType =
    eventType === "Both"
      ? events
      : events.filter((event) => event.type === eventType);

  const filteredEvents = filteredByType.filter((event) => {
    return (
      event.title.includes(searchQuery) || event.tags.includes(searchQuery)
    );
  });

  return (
    <main className="bg-body-tertiary min-vh-100 py-4">
      <div className="container">
        <section className="d-flex justify-content-between py-2">
          <div>
            <h1>Meetup Events</h1>
          </div>

          <div className="d-flex align-items-center gap-2">
            <label htmlFor="eventType">Select Event Type:</label>
            <select
              id="eventType"
              className="form-select w-auto"
              defaultValue="Both"
              onChange={(e) => setEventType(e.target.value)}
            >
              <option value="Online Event">Online</option>
              <option value="Offline Event">Offline</option>
              <option value="Both">Both</option>
            </select>
          </div>
        </section>

        <section className="py-2">
          <div className="row">
            {filteredEvents.map((event) => (
              <div className="col-md-4 mb-3" key={event._id}>
                <div
                  className="card position-relative"
                  style={{ width: "18rem" }}
                >
                  <span
                    className="badge bg-white text-dark position-absolute top-0 start-0 py-2 m-2"
                    style={{ zIndex: 1 }}
                  >
                    {event.type}
                  </span>
                  <img src={event.image} alt="img-card" className="rounded" />
                </div>
                <span className="text-warning-emphasis">
                  {event.startDate} · {event.startTime} IST
                </span>
                <h3>
                  <Link
                    to={`/details/${event._id}`}
                    className="link-dark link-offset-3-hover link-underline link-underline-opacity-0 link-underline-opacity-75-hover"
                  >
                    {event.title}
                  </Link>
                </h3>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default ListingPage;
