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
      console.log(err)
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

// // verfiy google token 
// import  { OAuth2Client }  from "google-auth-library"
// const client = new OAuth2Client("810324030094-cll9pj452hrot91knbgua3lh0of4btbq.apps.googleusercontent.com");

// async function verifyGoogleToken(token) {
//   try {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: "810324030094-cll9pj452hrot91knbgua3lh0of4btbq.apps.googleusercontent.com",
//     });
//     const payload = ticket.getPayload();
//     // Now you have access to the payload, which includes user information.
//     return payload;
//   } catch (error) {
//     console.error('Error verifying Google token:', error);
//     throw error;
//   }
// }

export default auth;
