import { SectoresType } from "@/app/_lib/schema/sectores.type";
import Link from "next/link";
import AdminSectoresDeleteModal from "./Admin_Sectores_Delete_Modal";
import AdminSectoresNewForm from "./Admin_Sectores_NewForm";
import { getCachedSectoresActualesAction, getCachedSectoresResetAction, getSectoresActualesAction } from "@/app/_lib/actions/sectores.action";

export default async function AdminSectoresList({ sectoresType }: { sectoresType: string }) {

  const sectoresList = sectoresType === "actuales"
    ? await getSectoresActualesAction() as SectoresType[]
    : await getCachedSectoresResetAction() as SectoresType[]

  return (
    <article className="table-width flex flex-col gap-0 items-center flex-1 mt-10">

      <div className="w-1/2 admin-sectores flex gap-2 items-center jsutify-center">
        <Link
          className={`badge-main w-1/2 ${sectoresType === "actuales" && "bg-foreground25"}`}
          href={"/admin/sectores?type=actuales"}>Sectores Actuales
        </Link>

        <Link
          className={`badge-main w-1/2 ${sectoresType === "constantes" && "bg-foreground25"}`}
          href={"/admin/sectores?type=constantes"}>Sectores Constantes
        </Link>
      </div>

      {
        sectoresList.map((rubroActual, index) =>

          <div key={index} className="w-[90%] flex flex-col border-b border-foreground25 last:border-b-0 py-4">
            <div className="w-full flex items-center justify-between">
              <span className="admin-sectores-rubro font-bold">{rubroActual._id}</span>
              <AdminSectoresNewForm sectoresType={sectoresType} sectoresList={sectoresList} rubroActual={rubroActual} />
            </div>

            <div className="flex flex-wrap my-4 sectores-gap">
              {
                rubroActual.sectores.map((sector, index) =>
                  <span key={index} className={`flex gap-2 badge-main ${rubroActual._id}     admin-sectores-sector w-max`}>
                    {sector}
                    <AdminSectoresDeleteModal
                      sectoresType={sectoresType}
                      rubro={rubroActual._id}
                      sector={sector}
                      sectores={rubroActual.sectores}
                    />
                  </span>
                )
              }
            </div>

          </div>
        )
      }
    </article>
  )
}

