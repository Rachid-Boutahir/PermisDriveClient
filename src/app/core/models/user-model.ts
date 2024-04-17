import {Role} from "@model/emuns/role";

export class UserModel {
  userId!: number;
  img!: string;
  username!: string;
  email!: string;
  password!: string;
  firstName!: string;
  lastName!: string;
  role!: Role;
  token!: {
    accessToken: string;
    refreshToken: string;
  };
}
