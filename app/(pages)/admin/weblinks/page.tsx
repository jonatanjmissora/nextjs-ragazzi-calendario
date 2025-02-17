import { Suspense } from "react";
import AdminWeblinkList from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_";
import SkeltonAdminDesktopWeblinks from "@/app/_components/Skeltons/Desktop/Skelton_Admin_Desktop_Weblinks";

export default async function AdminWeblinksPage() {

  return (
    <section className="page justify-center items-center weblink-container">

      <Suspense fallback={<SkeltonAdminDesktopWeblinks />} >
        <AdminWeblinkList />
      </Suspense>

    </section>
  )
}