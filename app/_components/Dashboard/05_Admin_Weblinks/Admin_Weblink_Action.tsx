import EditSVG from "@/app/_assets/EditSVG";
import { getWeblinkByIdAction } from "@/app/_lib/actions/weblinks.action";
import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import Link from "next/link";
import { WeblinkDeleteModal } from "./Admin_Weblink_Delete_Modal";

export default async function WeblinkAction({ id }: { id: string }) {

  const weblink = await getWeblinkByIdAction(id) as WeblinkType

  return (
    <div className="flex gap-4 items-center">
      <Link href={{
        pathname: '/admin/weblinks/edit',
        query: { id },
      }} >
        <EditSVG className='size-6 text-black hover:text-black80' currentColor='currentColor' />
      </Link>
      <WeblinkDeleteModal weblink={weblink} />
    </div>
  )
}

