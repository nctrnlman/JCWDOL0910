require("dotenv/config");
const express = require("express");
const { db } = require('./database')
const cors = require("cors");
const { join } = require("path");
const { categoryRoutes } = require('./routes')
const { productRoutes } = require('./routes')


const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors());
// cors di bawah ini bikin gabisa getdata -- GET http://localhost:8000/product_categories/ net::ERR_FAILED 200 (OK)
// akhirnya ganti pake : app.use(cors());
// app.use(
//   cors({
//     origin: [
//       process.env.WHITELISTED_DOMAIN &&
//       process.env.WHITELISTED_DOMAIN.split(","),
//     ],
//   })
// );

app.use(express.json());

//#region API ROUTES

// ===========================
// NOTE : Add your routes here


app.use('/product_categories', categoryRoutes)
app.use('/products', productRoutes)
app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
