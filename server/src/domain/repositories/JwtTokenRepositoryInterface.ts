interface JwtTokenRepositoryInterface {
  generate(payload: object): string;
  verify(token: string): object | null;
}

export default JwtTokenRepositoryInterface;
