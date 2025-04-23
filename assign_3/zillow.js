const express = require("express");
const app = express();
const PORT = process.argv[2] || 3000; // Use the first argument or default to 3000

// Simulated database of houses
const houses = [
  { price: 240000, city: "baltimore" },
  { price: 300000, city: "austin" },
  { price: 400000, city: "austin" },
  { price: 1000000, city: "seattle" },
  { price: 325000, city: "baltimore" },
  { price: 550000, city: "seattle" },
  { price: 250000, city: "boston" },
];

// log incoming requests and response status codes
app.use((req, res, next) => {
  console.log(`Incoming request:${req.url}`);

  res.on("finish", () => {
    console.log(`Response status: ${res.statusCode}`);
  });

  next();
});

// Endpoint to calculate Zestimate
app.get("/v1/zillow/zestimate", (req, res) => {
  const { sqft, bed, bath } = req.query;

  // Validate query parameters
  if (!sqft || !bed || !bath || isNaN(sqft) || isNaN(bed) || isNaN(bath)) {
    return res.status(404).json({ error: "Invalid parameters" });
  }

  const zestimate = parseInt(sqft) * parseInt(bed) * parseInt(bath) * 10;
  res.status(200).json({ zestimate });
});

// Endpoint to fetch houses by city
app.get("/v1/zillow/houses", (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(200).json([]);
  }

  const filteredHouses = houses.filter(
    (house) => house.city.toLowerCase() === city.toLowerCase()
  );
  res.status(200).json(filteredHouses);
});

// Endpoint to fetch houses by price limit
app.get("/v1/zillow/prices", (req, res) => {
  const { usd } = req.query;

  if (!usd || isNaN(usd)) {
    return res.status(404).json({ error: "Invalid parameter" });
  }

  const priceLimit = parseInt(usd);
  const filteredHouses = houses.filter((house) => house.price <= priceLimit);
  res.status(200).json(filteredHouses);
});

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Invalid endpoint" });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
