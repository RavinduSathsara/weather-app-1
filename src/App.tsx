import { useState } from "react";
import "./App.css";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import Button from "@mui/material/Button";
import { API_KEY } from "./config";
import Swal from "sweetalert2";

function App() {
  const logo =
    "https://i.pinimg.com/originals/77/0b/80/770b805d5c99c7931366c2e84e88f251.png";

  const [name, setName] = useState("");
  const [data, setData] = useState<WeatherData | null>(null); // Specify type

  // Define interface for response data
  interface WeatherData {
    weather: { main: string; description: any; icon: any }[];
    sys: any;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();

    axios
      .post(
        `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=${API_KEY}`
      )
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          Swal.fire("404 Error: City not found");
          // Handle 404 error here, for example:
          // setError('City not found');
        } else {
          Swal.fire("An error occurred:", error);
        }
      });
  };

  return (
    <div className="App">
      <h1>{data?.sys.country}</h1> {/* Adjust access to main property */}
      <h1>{data?.weather[0]?.main}</h1> {/* Adjust access to main property */}
      <h3>{data?.weather[0]?.description}</h3>{" "}
      {/* Adjust access to main property */}
      <img
        src={`https://openweathermap.org/img/wn/${data?.weather[0]?.icon}@2x.png`}
        className="App-logo"
        alt="logo"
      />
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
          search
        </Button>
      </Box>
    </div>
  );
}

export default App;
