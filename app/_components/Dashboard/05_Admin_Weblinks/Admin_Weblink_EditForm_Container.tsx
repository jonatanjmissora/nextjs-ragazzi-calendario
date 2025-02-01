import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import WeblinkEditForm from "./Admin_Weblink_EditForm";
import { getWeblinkByIdAction } from "@/app/_lib/actions/weblinks.action";

export default async function WeblinkEditFormContainer({ id }: { id: string }) {

  const weblink = await getWeblinkByIdAction(id) as WeblinkType

  let actualLink = { _id: "", href: "", imgData: "" }
  if (id) actualLink = { ...weblink }

  return (
    <WeblinkEditForm weblink={actualLink} />
  )
}
