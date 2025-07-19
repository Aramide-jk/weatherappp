const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();

// Define paths for static files and views
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../template/views");
const partialsPath = path.join(__dirname, "../template/partials");

// Set up handlebars as the view engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Serve static files from the public directory
app.use(express.static(publicDirectoryPath));

// Define routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Kola",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Kola",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Kola",
  });
});

// /////////////////////////////

// const axios = require("axios");

// // API keys
// const openCageKey = "607e9929ca61422b8e89cc7ae56b31a9";
// const weatherstackKey = "1d270677c0bfc0cc40c4d53a1fc50ae0"; // Your weatherstack key

// // Geocoding using OpenCage
// const geocode = async (address) => {
//   const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
//     address
//   )}&key=${openCageKey}&limit=1`;

//   const response = await axios.get(url);

//   if (response.data.results.length === 0) {
//     throw new Error("Location not found");
//   }

//   const location = response.data.results[0];
//   return {
//     location: location.formatted,
//     latitude: location.geometry.lat,
//     longitude: location.geometry.lng,
//   };
// };

// // Weather from weatherstack
// const getWeather = async (lat, lon) => {
//   const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${lat},${lon}`;
// ;

//   const response = await axios.get(url);
//   console.log(response.data);

//   if (response.data.error) {
//     throw new Error("Unable to get weather info");
//   }

//   const current = response.data.current;
//   return `It is currently ${
//     current.temperature
//   }°C with ${current.weather_descriptions[0].toLowerCase()}. Feels like ${
//     current.feelslike
//   }°C.`;
// };

// // /weather endpoint
// app.get("/weather", async (req, res) => {
//   const address = req.query.address;

//   if (!address) {
//     return res.send({ error: "You must provide an address" });
//   }

//   try {
//     const { location, latitude, longitude } = await geocode(address);
//     const forecast = await getWeather(latitude, longitude);

//     res.send({
//       forecast,
//       location,
//       address,
//     });
//   } catch (err) {
//     res.send({ error: err.message });
//   }
// });
/////////////////////////////////////

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  res.send({
    forecast: "It is currently 25 degrees out.",
    location: "",
    address: req.query.address,
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

// Handle 404 errors
// app.get("/help/article", (req, res) => {
//   res.send("Help article not found.");
// });
app.use((req, res) => {
  res.status(404).send("Page not found");
});
// app.get("*", (req, res) => {
//   res.render("404", {
//     title: "404",
//     errorMessage: "Page not found",
//   });
// });

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
