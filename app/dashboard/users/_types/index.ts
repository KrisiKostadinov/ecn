import { Gender, Role } from "@prisma/client";

export const genderMap: Record<Gender, string> = {
  MALE: "Мъжки",
  FEMALE: "Женски",
  NOT_AVAILABLE: "Не е определено"
};

export const roleMap: Record<Role, string> = {
  ADMIN: "Администратор",
  USER: "Потребител"
};