import { Suspense } from "react";
import AdminWeblinkList from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_";
import Skelton_Main_Table from "@/app/_components/Skeltons/Desktop/Skelton_Desktop_Main_Table";

export default async function AdminWeblinksPage() {

  return (
    <section className="page justify-center items-center">

      <Suspense fallback={<Skelton_Main_Table />} >
        <AdminWeblinkList />
      </Suspense>

    </section>
  )
}