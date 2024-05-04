import LogoutButton from "../../logout/button";

type ProfileSideBarProps = {
  firstName?: string;
  lastName?: string;
  email?: string;
};

export default function ProfileSideBar({
  firstName,
  lastName,
  email,
}: ProfileSideBarProps) {
  return (
    <div className="grid items-center gap-2 grid-cols-profileSideBar">
      <img
        src="https://github.com/barcellos96.png"
        alt="imagem perfil usuário"
        className="h-10 w-10 rounded-full"
      />
      <div className="flex flex-1 flex-col truncate">
        <span className="text-sm font-semibold">
          {firstName + " " + lastName}
        </span>
        <span className="truncate text-sm font-light">{email}</span>
      </div>

      <LogoutButton />
    </div>
  );
}
