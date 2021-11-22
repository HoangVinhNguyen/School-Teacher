export class JwtResponse {

  refreshToken!: string;
  id!: number;
  email!: string;
  roles!: string[];
  tokenType!: string;
  accessToken!: string;
}
