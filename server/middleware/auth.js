import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData;
    if (!token) {
      throw new Error("unathorited");
    }
    try {
      decodedData = jwt.verify(token, "test");
      req.userId = decodedData?.id;
    } catch (err) {
      // console.log("google token start")
      // decodedData = verifyGoogleToken(token);
      // req.userId = decodedData.sub;
      // console.log(req.userId)
      // console.log("google token end")
      console.log(err);
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

export default auth;
