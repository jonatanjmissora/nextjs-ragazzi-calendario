import { Suspense } from "react";
import AdminWeblinkList from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_";
import SkeltonAdminDesctopWeblinks from "@/app/_components/Skeltons/Desktop/Skelton_Admin_Desctop_Weblinks";

export default async function AdminWeblinksPage() {

  return (
    <section className="page justify-center items-center">

      <Suspense fallback={<SkeltonAdminDesctopWeblinks />} >
        <AdminWeblinkList />
      </Suspense>

    </section>
  )
}