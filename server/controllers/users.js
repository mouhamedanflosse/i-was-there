import users from "../model/users.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
