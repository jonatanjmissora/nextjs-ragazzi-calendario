import { Suspense } from "react";
import AdminWeblinkList from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_";
import SkeltonAdminWeblinks from "@/app/_components/Skeltons/Skelton_Admin_Weblinks";

export default async function AdminWeblinksPage() {

  return (
    <section className="page justify-center items-center weblink-container">

      <Suspense fallback={<SkeltonAdminWeblinks />} >
        <AdminWeblinkList />
      </Suspense>

    </section>
  )
}