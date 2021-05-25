var jwt = require("jsonwebtoken");

var secretKey = "6416c857-2140-4e79-953e-78e7769f7090";

function decodeToken(token) {
  let data = false;
  jwt.verify(token, secretKey, function (err, decoded) {
    if (!err) {
      data = decoded;
    }
  });
  return data;
}

exports.generateToken = function (data) {
  let obj = {
    exp: Math.floor(Date.now() / 1000) + 60 * 60,
  };
  obj = Object.assign(obj, data);
  return jwt.sign(obj, secretKey);
};

exports.authorizeUser = function (req, res, next) {
  const userData = decodeToken(req.headers.authtoken);
  if (userData) {
    req.headers.user_id = userData.user_id;
    return next();
  } else {
    return res
      .status(401)
      .send({ status: 401, error: "Authentication failed" });
  }
};
