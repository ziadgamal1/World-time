import { Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Timer from "./TImerCountries";
import Classes from "./SelectedCountry.module.css";
export default function SelectedCountry({ selectedCountry, ...props }) {
  const { name, flags } = selectedCountry;
  return (
    <Card className={Classes.card} {...props}>
      <Card.Img
        style={{ height: "5rem", width: "10rem", alignSelf: "center" }}
        variant="top"
        src={flags.svg}
      />
      <Card.Body>
        <Card.Title className="text-center">{name.common}</Card.Title>
        <Timer selected={selectedCountry} />
      </Card.Body>
    </Card>
  );
}
