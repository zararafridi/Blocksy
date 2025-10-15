const express = require("express");
const dbConnection = require("./database/index");
const { port } = require("./config/index");
const router = require("./routes/index");
const errorHandler = require("./middleware/errorHandler");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const allowedOrigins = [
  "http://localhost:3000",
  "https://blocksy-lovat.vercel.app",
];

const app = express();

// ✅ 1. Configure CORS
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

// ✅ 2. Cookie + Body Parser
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));

// ✅ 3. Static + Routes
app.use("/storage", express.static("storage"));
app.use(router);

// ✅ 4. DB + Error handler
dbConnection();
app.use(errorHandler);

// ✅ 5. Root test
app.get("/", (req, res) => {
  res.send("✅ Backend running fine!");
});

app.listen(port, () => {
  console.log(`🚀 Backend running on port ${port}`);
});
