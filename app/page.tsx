import Link from "next/link";
import Dashboard from "./_components/Dashboard/Dashboard";

export default async function Home({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const rubroFilter = (await searchParams)?.rubroFilter || "todo"

  return (
    <section className="w-full h-[95dvh]">
      <Link href={"/pendientes"}>Realiados</Link>
    </section>
  );
}
