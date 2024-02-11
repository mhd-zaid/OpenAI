import jwt from "jsonwebtoken"
export default function (){
    const createToken = function (user) {
      return jwt.sign(
        {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "30d",
        }
      );
    };

    const verifyToken = function (token) {
      return jwt.verify(token, process.env.JWT_SECRET);
    };
}
