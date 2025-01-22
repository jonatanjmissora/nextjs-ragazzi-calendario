import AdminSectoresList from "@/app/_components/Dashboard/Admin_Sectores/Admin_Sectores_List";
import Loading from "@/app/_components/Skeltons/Loading";
import { getCachedSectoresActualesAction, getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import Link from "next/link";
import { Suspense } from "react";

export default async function AdminSectoresPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const type = (await searchParams)?.type || "actuales"
  const actualSectores = type === "actuales"
    ? await getCachedSectoresActualesAction() as SectoresType[]
    : await getCachedSectoresResetAction() as SectoresType[]

  return (
    <section className="main-page w-full main-height flex">

      <aside className='flex aside-links gap-4 justify-center items-center leftAside-width'>
        <Link className={`w-3/4 ${type === "actuales" ? "btn btn-primary" : "btn btn-ghost"}`} href={"/admin/sectores?type=actuales"}>Sectores Actuales</Link>
        <Link className={`w-3/4 ${type === "constantes" ? "btn btn-primary" : "btn btn-ghost"}`} href={"/admin/sectores?type=constantes"}>Sectores Constantes</Link>
      </aside>

      <Suspense fallback={<Loading />} >
        <AdminSectoresList sectoresType={type} sectoresList={actualSectores} />
      </Suspense>

    </section>
  )
}
