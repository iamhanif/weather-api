import axios from "axios";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
const port = 8000;

app.get("/weather/:location", async (req, res) => {
  const location = req.params.location;
  const apiKey = process.env.API_KEY;

  try {
    const result = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`
    );

    const weatherData = {
      location: result.data.name,
      temperature: result.data.main.temp,
      description: result.data.weather[0].description,
      humidity: result.data.main.humidity,
      windSpeed: result.data.wind.speed,
    };

    res.json(weatherData);
  } catch (error) {
    res.status(400).json({ error: "Location not found or invalid request" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
