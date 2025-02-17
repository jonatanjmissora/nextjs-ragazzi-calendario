import PlusSVG from "@/app/_assets/PlusSVG"
import { WeblinkType } from "@/app/_lib/schema/weblink.type"
import Link from "next/link"
import WeblinkAction from "./Admin_Weblink_Action"
import Image from "next/image";
import { getCachedWeblinksAction } from "@/app/_lib/actions/weblinks.action";

export default async function AdminWeblinkList() {

  const weblinks = await getCachedWeblinksAction()

  return (
    <>

      <div className="w-full px-3">
        <div className="flex justify-between items-center w-full font-semibold tracking-wide border-b border-foreground25 py-4">
          <span className="text-xl w-full">Links</span>
          <Link href={"/admin/weblinks/edit"} >
            <PlusSVG className="size-5 text-foreground hover:text-foreground80" currentColor="currentColor" />
          </Link>
        </div>

        {weblinks.map(weblink => <WeblinkRow key={weblink._id} weblink={weblink} />)}
      </div>

    </>
  )
}

const WeblinkRow = ({ weblink }: { weblink: WeblinkType }) => {

  return (
    <article className="flex justify-between items-center border-b border-foreground25 last:border-b-0 py-4">
      <div className="w-[100px] h-[80px] weblink-img bg-slate-300 rounded-lg shadow border border-black25 overflow-hidden p-2 relative">
        <Image src={"data:image/jpeg;base64," + weblink.imgData} alt={weblink._id} fill className="p-3" />
      </div>
      <span className="truncate w-1/2">{weblink.href}</span>
      <WeblinkAction id={weblink._id} />
    </article>
  )
}