import jwt, { decode } from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const Token = req.headers.authorization.split(" ")[1];
    const customAuth = Token.length < 500;
    let decodedData;
    if (Token && customAuth) {
      decodedData = jwt.verify(Token, "test");
      req.userId = decodedData?.id; 
    } else {
      decodedData = jwt.decode(Token);
      req.userId = decodedData?.sub;
    }
    console.log(req.userId)
    next();
  } catch (err) {
    console.log(err);
  }
};
export default auth