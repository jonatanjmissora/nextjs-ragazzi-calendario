import EditSVG from "@/app/_assets/EditSVG";
import { getWeblinkByIdAction } from "@/app/_lib/actions/weblinks.action";
import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import Link from "next/link";
import { WeblinkModal } from "./Admin_Weblink_Modal";

export default async function WeblinkAction({ id }: { id: string }) {

  console.log({id})
  const weblink = await getWeblinkByIdAction(id) as WeblinkType

  return (
    <div className="flex gap-4 items-center">
      <Link href={{
        pathname: '/admin/weblinks/edit',
        query: { id },
      }} >
        <EditSVG className="size-6 text-[#aaaaaa75] hover:text-[#aaaaaa]" currentColor="currentColor" />
      </Link>
      <WeblinkModal weblink={weblink} />
    </div>
  )
}

