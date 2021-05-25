var { generateToken } = require("../middleware/authorize");

var { runQuery } = require("../database/database");

exports.login = async function (req, res) {
  if (!req.body.username || !req.body.password) {
    return res.send({ status: false, message: "All fields are required" });
  } else {
    const response = await runQuery(
      `select * from login where username = '${req.body.username}' and password = '${req.body.password}'`
    );
    const userData = response[0];
    console.log(userData);
    if (!userData) {
      return res.send({ status: false, message: "Invalid credentials" });
    } else {
      delete userData.password;
      const token = generateToken({ user_id: userData.user_id });
      return res.send({
        status: true,
        message: "success",
        token,
        userId: userData.user_id,
        name: userData.username,
        email: userData.email,
      });
    }
  }
};
