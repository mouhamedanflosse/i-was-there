import jwt from "jsonwebtoken";
import createHttpError from "http-errors";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (!token) {
      throw createHttpError(401,"unathorized")
    }
    try {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } catch (err) {
      console.log(err);
    }
    next();
  } catch (err) {
    next()
  }
};

export default auth;
