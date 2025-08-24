import { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import SelectedCountry from "./components/SelectedCountry";
import NeighborCountries from "./components/NeighborCountries";
import FormNav from "./components/Form";
function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const selectRef = useRef(null);
  function handleCountrySelect(event) {
    event.preventDefault();
    const selectedCountryName = selectRef.current.value;
    const selectedCountry = countries.find(
      (country) => country.name.common === selectedCountryName
    );
    setSelectedCountry(selectedCountry);
  }
  return (
    <>
      <Container className="d-flex flex-column align-items-center justify-content-start ">
        <FormNav
          handleCountrySelect={handleCountrySelect}
          inputRef={selectRef}
          setData={setCountries}
          countries={countries}
        />
        <div
          className="d-flex align-items-center justify-content-center flex-wrap flex-md-nowrap "
          style={{
            gap: "8rem",
            marginTop: "3rem",
          }}
        >
          <div>
            {selectedCountry && (
              <>
                <h3 className="text-center">Your country</h3>
                <SelectedCountry selectedCountry={selectedCountry} />
              </>
            )}
          </div>
          <div>
            {selectedCountry &&
              Array.isArray(selectedCountry.borders) &&
              selectedCountry.borders.length > 0 && (
                <>
                  <h3 className="text-center">Neighbor countries</h3>
                  <NeighborCountries neighbors={selectedCountry.borders} />
                </>
              )}
          </div>
        </div>
      </Container>
    </>
  );
}

export default App;
