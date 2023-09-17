import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import postsRoute from "./routes/posts.js";

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
const PORT = process.env.PORT || 5000;

// post route
app.use("/", postsRoute);

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
mongoose
  .connect("mongodb://127.0.0.1:27017/places")
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
