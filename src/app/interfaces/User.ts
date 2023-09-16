export interface User {
  accessToken: string;
  email: string;
  emailVerified: boolean;
  name: string;
  phoneNumber?: string;
  photoUrl?: string;
}