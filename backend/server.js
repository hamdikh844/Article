const express = require("express");
const app = express();
const connectdb=require("./config/db")
const dotenv = require("dotenv");
connectdb()
//Routes
const authRoute = require("./routes/router");
const adminRoute = require("./routes/adminRoutes");
const articleRoutes = require("./routes/articleroutes");

// Load environment variables
dotenv.config();
const cors=require("cors")




// Middleware to parse JSON
app.use(express.json());
app.use(express.static('public'));

const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // For legacy browser support
};
app.use(cors(corsOptions));
app.use("/api/auth", authRoute);
app.use("/api/admin", adminRoute);
app.use("/api/my_art", articleRoutes);



// Start the server
const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
