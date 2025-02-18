const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json()); // express.json() jest wystarczający
app.use(morgan("dev"));
app.use("/api", userRoutes);

app.use(errorHandler); // Po wszystkich innych middleware, aby złapać błędy

app.listen(3000, () => console.log("🚀 Server running on port 3000 🚀"));
