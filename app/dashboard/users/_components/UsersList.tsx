"use client";

import {
  ArrowDownIcon,
  DotSquareIcon,
  InfoIcon,
  MoreHorizontalIcon,
} from "lucide-react";

import { User } from "@prisma/client";
import AlertMessage from "@/app/dashboard/_components/alert-message";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useEffect } from "react";
import useUsersTableStore from "../_stores";
import { useRouter } from "next/navigation";
import useUserStore from "@/app/users/_stores/user";
import { Badge } from "@/components/ui/badge";
import axios from "axios";
import toast from "react-hot-toast";

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
  const { setUsers } = useUsersTableStore();

  useEffect(() => {
    console.log(users);
    setUsers(users);
  }, []);

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
  const { sort, setSortedBy, sortedBy } = useUsersTableStore();

  const sortUsers = (column: "email") => {
    sort(column);
    setSortedBy(column);
  };

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th
            className="text-left border cursor-pointer"
            onClick={() => sortUsers("email")}
          >
            <div className="flex items-center">
              Имейл (<ArrowDownIcon className="w-4 h-4" />)
            </div>
          </th>
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
  const { user: _user } = useUserStore();

  return (
    <tr className="text-left border">
      <td className="text-left border">
        {user.email}
        {_user && user.id === _user.id && <Badge className="ml-2">Вие</Badge>}
      </td>
      <td className="text-left border">{genderMap[user.gender]}</td>
      <td className="text-left border">{user.emailConfirmed ? "Да" : "Не"}</td>
      <td className="text-left border">{roleMap[user.roleAs]}</td>
      <td className="text-right">
        <ShowActions user={user} />
      </td>
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

type ShowActionsProps = {
  user: User;
};

function ShowActions({ user }: ShowActionsProps) {
  const router = useRouter();
  const { user: _user } = useUserStore();

  const onDelete = async (user: User) => {
    const message =
      "Сигурни ли сте, че искате да изтриете този потребител. Тази операция е необратима.";
    if (!confirm(message)) return;

    try {
      const response = await axios.delete(`/api/users/${user.id}`);
      if (response.status === 200) {
        toast.success("Изтриването беше успешно");
        router.refresh();
      }
    } catch (error: any) {
      if (error.status === 404) {
        return toast.error("Not found");
      }
      if (error.response.data.message) {
        return toast.error(error.response.data.message);
      }
      toast.error("An error occurred");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <MoreHorizontalIcon className="hover:bg-gray-100 rounded" size={30} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>Редактиране</DropdownMenuItem>
        <DropdownMenuItem>Изпращане на имейл</DropdownMenuItem>
        <DropdownMenuItem>Блокиране</DropdownMenuItem>
        {_user && _user.id !== user.id && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDelete(user)}>
              Изтриване
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
