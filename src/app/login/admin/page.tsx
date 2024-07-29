import FormsLogin from "@/components/forms/login";
import FormsLoginAdmin from "@/components/forms/loginAdmin";

export default function AdminLogin() {
  return (
    <div className="flex flex-col gap-10 h-screen items-center justify-center">
      <span className="font-bold text-xl">Login admin</span>
      <FormsLoginAdmin />
    </div>
  );
}
