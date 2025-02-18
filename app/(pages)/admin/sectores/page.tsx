import AdminSectoresList from "@/app/_components/Dashboard/04_Admin_Sectores/Admin_Sectores_";
import SkeltonAdminDesktopSectores from "@/app/_components/Skeltons/Desktop/Skelton_Admin_Desktop_Sectores";
import { Suspense } from "react";

export default async function AdminSectoresPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const type = (await searchParams)?.type || "actuales"

  return (
    <section className="page">

      <Suspense key={Math.random()} fallback={<SkeltonAdminDesktopSectores />} >
        <AdminSectoresList sectoresType={type} />
      </Suspense>

    </section>
  )
}
