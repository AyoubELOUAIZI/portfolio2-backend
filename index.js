// Import necessary modules
import express from "express";
import cors from "cors";

// Create an express app
const app = express();



// Enable JSON parsing of request bodies
app.use(express.json());


// Enable CORS (Cross-Origin Resource Sharing)
// app.use(cors());


// Set up CORS options
const corsOptions = {
    origin: [
        "http://localhost:8000",
        "http://localhost:3000",
    ], // replace with your frontend app URL
    credentials: true, // allow cookies and other credentials
};

// Enable CORS middleware with options
app.use(cors(corsOptions));

import cookieParser from "cookie-parser";
app.use(cookieParser());

//imports
import accountRoutes from "./routes/account.routes.js";
import commentRoutes from "./routes/comment.routes.js";
import userRoutes from "./routes/user.routes.js";


app.use("/api/account", accountRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/user", userRoutes);






// Define a route to handle GET requests to the root URL
app.get("/", (req, res) => {
    res.send("Hello, world!");
});

// Start the server on port 3000
app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});
