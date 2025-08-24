import {User} from './user.ts';

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}
