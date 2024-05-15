import { Roles } from "../enums/Roles";

export function getUserInitials(firstName: string, lastName: string) {
  return (firstName.slice(0, 1) + lastName.slice(0, 1)).toUpperCase();
}
export function isDoctor(role: string) {
  return role === Roles.DOCTOR;
}
