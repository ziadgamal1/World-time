import Clock from "./Clock";
import { useEffect, forwardRef } from "react";
import { Form } from "react-bootstrap";
const CustomSelect = forwardRef(({ children }, ref) => {
  return (
    <Form.Select
      aria-label="Default select example"
      size="lg"
      className="mb-3"
      ref={ref}
    >
      {children}
    </Form.Select>
  );
});
export default function FormNav({
  handleCountrySelect,
  inputRef,
  setData,
  countries,
}) {
  useEffect(() => {
    async function loadcountries() {
      try {
        const response = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,borders,latlng,population,flags,continents"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    loadcountries();
  }, [setData]);
  return (
    <>
      <Form>
        <Clock />
        <Form.Group controlId="formBasicEmail">
          <Form.Label className="mb-2 h4">Country selection</Form.Label>
          <CustomSelect ref={inputRef}>
            <option>Select your country</option>
            {countries
              .sort((a, b) => a.name.common.localeCompare(b.name.common))
              .map((country) => (
                <option key={country.name.common} value={country.name.common}>
                  {country.name.common}
                </option>
              ))}
          </CustomSelect>
        </Form.Group>

        <button
          onClick={handleCountrySelect}
          type="submit"
          className="btn btn-primary align-self-center"
        >
          Submit
        </button>
      </Form>
    </>
  );
}
