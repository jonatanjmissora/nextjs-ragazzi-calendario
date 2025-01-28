import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import { getWeblinkByIdAction } from "@/app/_lib/actions/weblinks.action";
import WeblinkEditForm from "@/app/_components/Dashboard/Admin_Weblinks/Admin_Weblink_EditForm";

export default async function WeblinkEdit({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""
  const weblink = await getWeblinkByIdAction(id) as WeblinkType

  let actualLink = { _id: "", href: "", imgData: "" }
  if (id) actualLink = { ...weblink }

  return (
    <section className="min-h-[95dvh] flex flex-col items-center pt-40">
      <WeblinkEditForm weblink={actualLink} />
    </section>
  )
}
