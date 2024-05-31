export interface IUser {
  id?: string;
  email: string;
  firstName: string;
  lastName: string;
  birthDate?: Date | null;
  sex?: string | null;
  phone?: string | null;
  password?: string | null;
}
