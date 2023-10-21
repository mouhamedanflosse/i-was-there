import users from "../model/users.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import axios from "axios";

const usersController = {
  signIn: async (req, res, next) => {
    const { email, password } = req.body;

    try {
      const result = await users.findOne({ email });

      if (!result) {
        throw createHttpError(404, "Email does not exist");
      }

      const isPasswordCorrect = await bcrypt.compare(password, result.password);

      if (!isPasswordCorrect) {
        throw createHttpError(401, "Incorrect password");
      }

      const token = generateAuthToken(result);

      res.status(200).json({ result, token });
    } catch (error) {
      next(error);
    }
  },

  signUp: async (req, res, next) => {
    const { email, password, firstName, lastName } = req.body;

    try {
      const userExistence = await users.findOne({ email });

      if (userExistence) {
        throw createHttpError(409, "Email is already in use");
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await users.create({
        email,
        password: hashedPassword,
        name: `${firstName} ${lastName}`,
      });

      const token = generateAuthToken(newUser);

      res.status(201).json({ result: newUser, token });
    } catch (error) {
      next(error);
    }
  },
  googleAuth: async (req, res, next) => {
    try {
      const { accessToken } = req.body;
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${accessToken}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: "application/json",
          },
        }
      );
      const user = response.data;
      const userExistence = await users.findOne({ email: user.email });
      if (userExistence) {
        const { name, email, _id, picture } = userExistence;
        const Token = await generateAuthToken(userExistence);
        res
          .status(201)
          .json({ result: { name, email, _id, picture }, token: Token });
      } else {
        const newUser = await users.create({
          email: user.email,
          name: `${user.given_name} ${user.family_name}`,
          picture: user.picture,
        });
        const { name, email, _id, picture } = newUser;
        const token = await generateAuthToken(newUser);
        res.status(201).json({ result: { name, email, _id, picture }, token });
      }
    } catch (error) {
      next(error);
    }
  },
};

const generateAuthToken = (user) => {
  const token = jwt.sign(
    { email: user.email, id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
  return token;
};

export default usersController;
