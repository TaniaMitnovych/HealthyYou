export function getUserInitials(firstName: string, lastName: string) {
  return (firstName.slice(0, 1) + lastName.slice(0, 1)).toUpperCase();
}