import useFetch from "../useFetch";
import { useParams } from "react-router-dom";
import Header from "../components/Header";

const EventDetails = () => {
  const { eventId } = useParams();

  const { data, loading, error } = useFetch(
    `https://bi-assignment-1-gamma.vercel.app/events/${eventId}`
  );

  if (loading) return <p className="container py-3">Loading...</p>;
  if (error) return <p className="container py-3">Error: {error}</p>;

  const event = data;
  if (!event) return <p className="container py-3">Event not found.</p>;

  return (
    <>
      <Header />
      <main className="bg-body-tertiary min-vh-100 py-5">
        <article className="container">
          <div className="row gy-4">
            <div className="col-12 col-md-6">
              <section>
                <h2 className="mb-3">{event.title}</h2>
                <p className="mb-0">Hosted By:</p>
                <strong>{event.hostedBy}</strong>
                <div className="mt-3">
                  <img
                    src={event.image}
                    alt="event-image"
                    className="img-fluid rounded"
                  />
                </div>
              </section>

              <section className="py-4">
                <h3 className="mb-3">Details:</h3>
                <p>{event.description}</p>
              </section>

              <section className="mb-4">
                <h3>Additional Information</h3>
                <p>
                  <strong>Dress Code: </strong>
                  {event.dressCode}
                </p>
                <p>
                  <strong>Age Restrictions: </strong>
                  {event.ageRestrictions}
                </p>
              </section>

              <section className="mb-4">
                <h3>Event Tags:</h3>
                {event.tags.map((tag) => (
                  <span
                    key={tag}
                    className="badge bg-danger text-white me-2 mb-2"
                    style={{ fontSize: "0.9rem" }}
                  >
                    {tag}
                  </span>
                ))}
              </section>
            </div>

            <section className="col-12 col-md-6">
              <div className="bg-white rounded-4 shadow-sm p-4 mb-4">
                <div className="d-flex align-items-start mb-3">
                  <i className="me-2 mt-3 bi bi-clock fs-5"></i>
                  <div>
                    <div>
                      {event.startDate} at {event.startTime} to
                    </div>
                    <div>
                      {event.endDate} at {event.endTime}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start mb-3">
                  <i className="me-2 mt-3 bi bi-geo-alt-fill fs-5"></i>

                  <div>
                    <div>{event.location.venue}</div>
                    <div>
                      {event.location.address}, {event.location.city}
                    </div>
                  </div>
                </div>

                <div className="d-flex align-items-start">
                  <i className="bi bi-currency-rupee me-3 fs-5"></i>
                  <div>{event.price}</div>
                </div>
              </div>

              <h5 className="fw-bold mb-3">
                Speakers: ({event.speakers.length})
              </h5>

              <div className="row gy-3">
                {event.speakers.map((speaker, index) => (
                  <div className="col-12 col-sm-6" key={index}>
                    <div className="bg-white rounded-4 shadow-sm py-3 text-center h-100">
                      <img
                        src={speaker.image}
                        alt={speaker.name}
                        className="rounded-circle mb-3"
                        width="80"
                        height="80"
                      />
                      <h6 className="fw-bold mb-0">{speaker.name}</h6>
                      <small className="text-muted">
                        {speaker.designation}
                      </small>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </article>
      </main>
    </>
  );
};
export default EventDetails;
