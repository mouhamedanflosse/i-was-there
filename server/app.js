import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postsRoute from "./routes/posts.js";
import usersRoute from "./routes/users.js";
import 'dotenv/config'
const app = express();

app.use(cors());


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const PORT = process.env.PORT || 5000;

// posts route
app.use("/posts", postsRoute);
// users route
app.use("/users", usersRoute);

// error handeler
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      message: err.message,
      status: err.status || 500,
    },
  });
});

// ------------connecting to the database
// const options = {
//   autoIndex: false, // Don't build indexes
//   maxPoolSize: 10, // Maintain up to 10 socket connections
//   serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
//   socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
//   family: 4 // Use IPv4, skip trying IPv6
// };

mongoose
  .connect(process.env.mongodb_URL)
  .then(() => {
    console.log("the mongodb is connected");
  })
  .catch((err) => {
    console.log(err);
  });
  

// --------back end server
app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

