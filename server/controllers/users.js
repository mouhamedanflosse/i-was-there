import users from "../model/users.js";
import createHttpError from "http-errors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const usersContoroller = {
  signIn: async (req, res, next) => {
    const { Email, password } = req.body;
    try {
      const result = await users.findOne({ email : Email });
      if (!result) {
        throw createHttpError(404, "Email does not exist");
      }
      const isPasswordCorrect = bcrypt.compare(
        password,
        result.password
      );
      if (!isPasswordCorrect) {
        throw createHttpError(404, "password is incorrect");
      }
      const token = jwt.sign(
        { email: result.email, id: result._id },
        "test",
        { expiresIn: "1h" }
      );
      res.send({result,token});
    } catch (err) {
      next(createHttpError(err));
    }
  },
  signUp:  async (req, res, next) => {
        const { Email, password,firstName,lastName} = req.body;
        try {
          const userExistence = await users.findOne({ Email });
          if (userExistence) {
            throw createHttpError(404, "Email is already exist");
          }
          const hashedPassword = await bcrypt.hash(password,12)
          const result = await users.create({email : Email,password : hashedPassword, name :`${firstName} ${lastName}`})

          const token = jwt.sign(
            { email: Email, id: result._id },
            "test",
            { expiresIn: "1h" }
          );
          res.send({result,token});
        } catch (err) {
          next(createHttpError(err));
        }
      },
};
export default usersContoroller;
