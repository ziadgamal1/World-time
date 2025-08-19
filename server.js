// server.js
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const app = express();

app.use(cors()); // allow all origins (for development)

app.get("/api/time", async (req, res) => {
  const { lat, lng } = req.query;
  const apiKey = "GF5L8EESVYFQ";
  const url = `https://api.timezonedb.com/v2.1/get-time-zone?key=${apiKey}&format=json&by=position&lat=${lat}&lng=${lng}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data); // return to frontend
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch time data" });
  }
});

app.listen(5000, () => {
  console.log("Server listening on port 5000");
});
