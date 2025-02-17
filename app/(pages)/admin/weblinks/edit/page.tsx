import WeblinkEditFormContainer from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_EditForm_Container";
import SkeltonAdminWeblinksEditForm from "@/app/_components/Skeltons/Skelton_Admin_Weblinks_EditForm";
import { Suspense } from "react";

export default async function WeblinkEdit({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""

  return (
    <section className="page flex flex-col items-center">
      <Suspense fallback={<SkeltonAdminWeblinksEditForm />}>
        <WeblinkEditFormContainer id={id} />
      </Suspense>
    </section>
  )
}
