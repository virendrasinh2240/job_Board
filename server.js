const express = require("express");
const connectDB = require("./config/db"); // Database connection file
const applicationRoutes = require("./routes/applicationRoutes");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobRoutes");
const errorhandler = require("./middlewares/errorHandler");

// Load environment variables
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Route handlers
app.use(applicationRoutes);
app.use(authRoutes);
app.use(jobRoutes);

// Error handling middleware
app.use(errorhandler);

// Connect to database and start server
connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
});
