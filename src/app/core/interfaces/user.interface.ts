export interface IUser {
  id: number;
  name: string;
  role: "admin" | "customer";
  email: string;
  password: string;
}

export interface CreateUserDto extends Omit<"IUser", "id"> {}

export interface UpdateUserDto extends Partial<IUser> {}
