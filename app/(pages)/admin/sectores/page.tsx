import AdminSectoresList from "@/app/_components/Dashboard/04_Admin_Sectores/Admin_Sectores_";
import Loading from "@/app/_components/Skeltons/Loading";
import { Suspense } from "react";

export default async function AdminSectoresPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const type = (await searchParams)?.type || "actuales"

  return (
    <section className="page">

      <Suspense fallback={<Loading />} >
        <AdminSectoresList sectoresType={type} />
      </Suspense>

    </section>
  )
}
