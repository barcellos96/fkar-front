import Link from "next/link";
import "./global.css";

export default function Home() {
  return (
    <div>
      <h1>Meu Site</h1>
      <Link href={"/login"} style={{ textDecoration: "none" }}>
        SigIn
      </Link>
    </div>
  );
}
