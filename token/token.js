const jwt = require("jsonwebtoken");
// const jwt_key = "zxcvbmlkjhgfdsaqwetyuiop";

//token create
const tokenGenerator = (email) => {
    const token = jwt.sign(
        { email },
        process.env.jwt_key,
        { expiresIn: "3hours" }
    )
    return token;
}

module.exports = tokenGenerator;