import { getCachedWeblinksAction } from "@/app/_lib/actions/weblinks.action";

import { Suspense } from "react";
import AdminWeblinkList from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_";
import Skelton_Main_Table from "@/app/_components/Skeltons/Skelton_Main_Table";

export default async function AdminWeblinksPage() {

  const weblinks = await getCachedWeblinksAction()

  return (
    <section className="page justify-center items-center">

      <Suspense fallback={<Skelton_Main_Table />} >
        <AdminWeblinkList weblinks={weblinks} />
      </Suspense>

    </section>
  )
}