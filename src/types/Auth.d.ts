import { Session, User } from "next-auth";
import { JWT } from "next-auth/jwt";

interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ILogin {
  identifier: string;
  password: string;
}

interface IActivation {
  code: string;
}

interface UserExtended extends User {
  accessToken?: string;
  role?: string;
}

interface SessionExtended extends Session {
  accessToken?: string;
}

interface JWTExtended extends JWT {
  user?: UserExtended;
}

interface IProfile {
  _id?: string;
  fullName?: string;
  username?: string;
  email?: string;
  isActive?: boolean;
  profilePicture?: string | FileList;
  role?: string;
}

interface IUpdatePassword {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export type {
  IRegister,
  ILogin,
  IActivation,
  UserExtended,
  SessionExtended,
  JWTExtended,
  IProfile,
  IUpdatePassword,
};
