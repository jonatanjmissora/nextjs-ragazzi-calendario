import AdminSectoresList from "@/app/_components/Dashboard/Admin_Sectores/Admin_Sectores_List";
import Loading from "@/app/_components/Skeltons/Loading";
import { getCachedSectoresActualesAction, getCachedSectoresResetAction } from "@/app/_lib/actions/sectores.action";
import { SectoresType } from "@/app/_lib/schema/sectores.type";
import { Suspense } from "react";

export default async function AdminSectoresPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const type = (await searchParams)?.type || "actuales"
  const actualSectores = type === "actuales"
    ? await getCachedSectoresActualesAction() as SectoresType[]
    : await getCachedSectoresResetAction() as SectoresType[]

  return (
    <section className="min-h-[95dvh] flex flex-col">

      <Suspense fallback={<Loading />} >
        <AdminSectoresList sectoresType={type} sectoresList={actualSectores} />
      </Suspense>

    </section>
  )
}
