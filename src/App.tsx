import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import { API_KEY } from "./config";

function App() {
  const logo =
    "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png";

  const [name, setName] = useState("");
  const [data, setData] = useState<WeatherData | null>(null); // Specify type

  // Define interface for response data
  interface WeatherData {
    weather: { main: string }[];
    sys: any;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
      )
      .then((res) => {
        console.log(res);
        setData(res.data);
      });
  };
  console.log("xxxxx", data);

  return (
    <div className="App">
      <header className="App-header">
        <h1>{data?.sys.country}</h1> {/* Adjust access to main property */}
        <h1>{data?.weather[0].main}</h1> {/* Adjust access to main property */}
        <img src={logo} className="App-logo" alt="logo" />
        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            onChange={(e) => setName(e.target.value)}
            id="standard-basic"
            label="Standard"
            variant="standard"
          />
          <Button onClick={handleSubmit} variant="text">
            Text
          </Button>
        </Box>
      </header>
    </div>
  );
}

export default App;
