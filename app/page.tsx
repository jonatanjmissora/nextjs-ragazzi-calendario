import { redirect } from "next/navigation";
import LoginForm from "./_components/Auth/LoginForm";
import getUserFromCookie from "./_lib/utils/getUserFromCookies";

export default async function Home() {

  const user = await getUserFromCookie()
  if (user) redirect("/pendientes")

  return (
    <section className="border h-[95dvh] flex justify-center items-center">

      <LoginForm />

    </section>
  );
}
