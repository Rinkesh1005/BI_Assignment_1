import { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import ListingPage from "./pages/ListingPage";

function App() {
  const [searchQuery, setSearchQuery] = useState("");


  return (
    <>
      <div >
        <Header setSearchQuery={setSearchQuery} />
        <ListingPage searchQuery={searchQuery} />
      </div>
    </>
  );
}

export default App;