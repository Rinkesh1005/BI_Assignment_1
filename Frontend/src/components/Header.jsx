import { NavLink } from "react-router-dom";

const Header = ({ setSearchQuery }) => {
  const handleSearch = (e) => {
    if (setSearchQuery) {
      setSearchQuery(e.target.value);
    }
  };

  return (
    <>
      <nav className="navbar bg-body-tertiary">
        <div className="container">
          <NavLink className="navbar-brand" to="/">
            <img
              src="https://imgs.search.brave.com/OM6ceDxRuDLm1ynggYAVSvIDviyYRUagckbVw3p9-_8/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9sb2dv/cy13b3JsZC5uZXQv/d3AtY29udGVudC91/cGxvYWRzLzIwMjEv/MDIvTWVldHVwLVN5/bWJvbC03MDB4Mzk0/LnBuZw"
              alt="meetup-logo"
              className="img-fluid"
              style={{ width: "100px", height: "auto" }}
            />
          </NavLink>
          <form className="d-flex" role="search" onSubmit={handleSearch}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search by title and tags"
              aria-label="Search"
              onChange={(e) => setSearchQuery && setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      </nav>
      <div className="bg-body-tertiary">
        <div className="container">
          <hr className="m-0" />
        </div>
      </div>
    </>
  );
};

export default Header;
