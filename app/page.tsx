import LoginForm from "./_components/Auth/LoginForm";

export default async function Home() {

  // const user = await getUserFromCookie()
  // if (user) redirect("/pendientes")

  return (
    <section className="w-full h-[95dvh] flex justify-center items-center">

      <LoginForm />

    </section>
  );
}
