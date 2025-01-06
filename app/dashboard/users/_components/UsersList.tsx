"use client";

import { InfoIcon } from "lucide-react";

import { User } from "@prisma/client";
import AlertMessage from "@/app/dashboard/_components/alert-message";

type UsersListProps = {
  users: User[];
};

const genderMap = {
  MALE: "Мъжки",
  FEMALE: "Женски",
  NOT_AVAILABLE: "Не е определен",
};

const roleMap = {
  USER: "Потребител",
  ADMIN: "Администратор",
};

export default function UsersList({ users }: UsersListProps) {
  return (
    <div className="px-5">
      {users.length ? <AllUsers users={users} /> : <ShowEmpty />}
    </div>
  );
}

type AllUsersProps = {
  users: User[];
};

function AllUsers({ users }: AllUsersProps) {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="text-left border">Имейл</th>
          <th className="text-left border">Пол</th>
          <th className="text-left border">Потвърден</th>
          <th className="text-left border">Роля</th>
          <th className="text-right border">Опции</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <SingleUser key={index} user={user} />
        ))}
      </tbody>
    </table>
  );
}

type SingleUserProps = {
  user: User;
};

function SingleUser({ user }: SingleUserProps) {
  return (
    <tr className="text-left border">
      <td className="text-left border">{user.email}</td>
      <td className="text-left border">{genderMap[user.gender]}</td>
      <td className="text-left border">{user.emailConfirmed ? "Да" : "Не"}</td>
      <td className="text-left border">{roleMap[user.roleAs]}</td>
      <td className="text-right border"></td>
    </tr>
  );
}

function ShowEmpty() {
  return (
    <AlertMessage
      title="Информация"
      message="Към този момент нямате създадени записи на потребители."
      icon={InfoIcon}
      variant="default"
    />
  );
}
