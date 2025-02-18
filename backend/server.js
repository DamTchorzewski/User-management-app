const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use("/api", userRoutes);
app.use(express.json());
app.use(errorHandler);

app.listen(3000, () => console.log("🚀Server running on port 3000🚀"));
