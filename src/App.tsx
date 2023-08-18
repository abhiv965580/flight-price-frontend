import React from "react";
import "./App.css";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { TrendingFlat } from "@mui/icons-material";

function App() {
  const [departureDate, setDepartureDate] = React.useState<Dayjs | null>(
    dayjs()
  );
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
  const [results, setResults] = React.useState<any>();

  async function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const getIataCode = async (cityName: string) => {
    try {
      const response = await fetch(
        `https://flight-price-backend-qyun.onrender.com/airportCode?cityName=${cityName}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const getFlightPrices = async () => {
    const display = document.querySelector(".results");
    display?.setAttribute("style", "display: block");
    const date = departureDate?.format("YYYY-MM-DD");
    const sourceIataCode = await getIataCode(source);
    await sleep(500);
    const destinationIataCode = await getIataCode(destination);
    try {
      const response = await fetch(
        `https://flight-price-backend-qyun.onrender.com/prices?source=${sourceIataCode}&destination=${destinationIataCode}&departureDate=${date}`,
        {
          method: "GET",
        }
      );
      const json = await response.json();
      setResults(json);
    } catch (error) {
      console.error(error);
      return false;
    }
  };
  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card
          sx={{
            minWidth: 275,
            width: "80%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: 5,
            margin: 2,
          }}
        >
          <CardContent>
            <Typography
              variant="h3"
              component="div"
              sx={{ m: 1.5, textAlign: "center" }}
            >
              Flights Price Web App
            </Typography>
          </CardContent>
          <CardContent sx={{ display: "flex", gap: 5 }}>
            <TextField
              id="input-source"
              label="Source"
              variant="outlined"
              value={source}
              onChange={(e) => setSource(e.target.value)}
            />
            <TrendingFlat sx={{ fontSize: 50 }} />
            <TextField
              id="input-destination"
              label="Destination"
              variant="outlined"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
            />
          </CardContent>
          <CardContent>
            <DatePicker
              label="Date"
              format="DD/MM/YYYY"
              value={departureDate}
              onChange={(newValue) => setDepartureDate(newValue)}
              disablePast
            />
          </CardContent>
          <CardActions>
            <Button size="large" variant="contained" onClick={getFlightPrices}>
              Get Prices
            </Button>
          </CardActions>
          <Card className="results" sx={{ backgroundColor: "#bae6fd" }}>
            <Typography fontWeight={"bold"} fontSize={22} sx={{ margin: 2 }}>
              Flight Details:
            </Typography>
            <CardContent
              sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            >
              {results ? (
                Object.keys(results).map((airline) => (
                  <Typography key={airline}>
                    {airline} - {results[airline]}
                  </Typography>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
        </Card>
      </LocalizationProvider>
    </div>
  );
}

export default App;
