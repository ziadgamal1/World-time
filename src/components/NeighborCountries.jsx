import { useEffect, useState } from "react";
import Classes from "./Neighbor.module.css";
import SelectedCountry from "./SelectedCountry";
export default function NeighborCountries({ neighbors }) {
  const [counter, setCounter] = useState(0);
  const [neighborCountries, setNeighborCountries] = useState([]);
  useEffect(() => {
    async function loadNeighborCountries() {
      const arr = [];
      for (const neighbor of neighbors) {
        try {
          const response = await fetch(
            `https://restcountries.com/v3.1/alpha/${neighbor}`
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          arr.push(data[0]);
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }
      const spliced = arr.splice(arr.length - (arr.length % 3), arr.length % 3);
      setNeighborCountries(arr);
      setCounter(spliced);
    }
    loadNeighborCountries();
  }, [neighbors]);
  return (
    <>
      <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center gap-3 ">
        <div className={Classes.first}>
          {neighborCountries.length > 0 &&
            neighborCountries.map((country, i) => (
              <SelectedCountry key={i} selectedCountry={country} />
            ))}
        </div>
        <div className={Classes.second} data-number={counter.length}>
          {counter.length > 0 &&
            counter.map((country, i) => (
              <SelectedCountry key={i} selectedCountry={country} />
            ))}
        </div>
      </div>
    </>
  );
}
