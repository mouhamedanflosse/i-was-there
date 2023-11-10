import express from "express";

import usersContoroller from "../controllers/users.js";

const route = express.Router();


route.post("/signIn", usersContoroller.signIn);
route.post("/signUp", usersContoroller.signUp);
route.post("/googleAuth", usersContoroller.googleAuth);



export default route;
