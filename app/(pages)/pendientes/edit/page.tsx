import PendienteEditForm from "@/app/_components/Dashboard/PendienteEditForm"
import { getPendienteByIdAction } from "@/app/_lib/actions/pendientes.action"
import { getSectoresReset } from "@/app/_lib/db/sectores.db"
import { PendienteType } from "@/app/_lib/schema/pendientes.type"
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies"
import { redirect } from "next/navigation"

export default async function PendienteEditPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const id = (await searchParams)?.id || ""
  const pendiente = await getPendienteByIdAction(id) as PendienteType
  const sectoresReset = await getSectoresReset()

  return (
    <section className="w-full main-height flex justify-center items-center">
      <PendienteEditForm pendiente={pendiente} sectoresReset={sectoresReset} />
    </section>
  )
}
