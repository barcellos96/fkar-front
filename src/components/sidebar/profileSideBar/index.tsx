import LogoutButton from "../../logout/button";

import AvatarLayout from "@/components/avatar";

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
    <div
      id="profile-side"
      className="grid items-center gap-2 grid-cols-profileSideBar my-1"
    >
      <AvatarLayout />
      <div className="flex flex-1 flex-col truncate">
        <span className="text-base font-semibold">
          {firstName + " " + lastName}
        </span>
        <span className="truncate text-sm font-light">{email}</span>
      </div>

      <LogoutButton />
    </div>
  );
}
