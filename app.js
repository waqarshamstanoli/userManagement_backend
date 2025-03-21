const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const routes = require("./routes/index");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

app.use(morgan("dev"));
app.use(express.json());
dotenv.config();
app.use(cors());
const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB:", err));

app.use("/api/", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.use((req, res) => {
  res.status(404).send("Page not found");
});

app.listen(PORT, () => {
  console.log("Server running at http://localhost:3000/api");
});
