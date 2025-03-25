import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../database/models/user";

class UserService {
  /**
   * Authenticate user and generate JWT token
   */
  static async loginUser(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) return null;

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return null;

    // Generate Access Token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN_SECRET!,
      { expiresIn: "1h" }
    );

    return token;
  }
}

export default UserService;
