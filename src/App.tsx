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
  const [date, setDate] = React.useState<Dayjs | null>(dayjs());
  const [source, setSource] = React.useState<string>("");
  const [destination, setDestination] = React.useState<string>("");
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
              value={date}
              onChange={(newValue) => setDate(newValue)}
              disablePast
            />
          </CardContent>
          <CardActions>
            <Button size="large" variant="contained">
              Get Prices
            </Button>
          </CardActions>
        </Card>
      </LocalizationProvider>
    </div>
  );
}

export default App;
