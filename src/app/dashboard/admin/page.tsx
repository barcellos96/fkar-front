import UsersData from "@/components/blog/usersData";
import HeaderAdmin from "@/components/header/headerAdmin";

export default function Admin() {
  return (
    <div className="flex flex-col ms-6">
      {/* header */}
      <HeaderAdmin />
      <UsersData />
    </div>
  );
}
