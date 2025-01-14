import JwtTokenRepositoryInterface from "../../domain/repositories/JwtTokenRepositoryInterface";
import jwt from "jsonwebtoken";

class JwtTokenRepository implements JwtTokenRepositoryInterface {
  constructor(private secretKey: string) {}

  generate(payload: object): string {
    return jwt.sign(payload, this.secretKey, { expiresIn: "1d" });
  }

  verify(token: string): object | null {
    try {
      return jwt.verify(token, this.secretKey) as object;
    } catch (error) {
      return null;
    }
  }
}

export default JwtTokenRepository;
