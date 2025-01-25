import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import { getCachedWeblinksAction } from "@/app/_lib/actions/weblinks.action";
import Image from "next/image";
import PlusSVG from "@/app/_assets/PlusSVG";
import Link from "next/link";
import WeblinkAction from "@/app/_components/Dashboard/Admin_Weblinks/Admin_Weblink_Action";

export default async function AdminWeblinksPage() {

  const weblinks = await getCachedWeblinksAction() as WeblinkType[]

  return (
    <section className="main-page w-full main-height flex justify-center items-center">

      <div className="weblink-container px-6 py-0">
        <div className="flex justify-between items-center w-full text-xl font-semibold tracking-wide py-2">
          <span className="w-full">Links</span>
          <Link href={"/admin/weblinks/edit"} >
            <PlusSVG className="size-5 text-foreground hover:text-foreground80" currentColor="currentColor" />
          </Link>
        </div>

        {weblinks.map(weblink => <WeblinkRow key={weblink._id} weblink={weblink} />)}
      </div>

    </section>
  )
}

const WeblinkRow = ({ weblink }: { weblink: WeblinkType }) => {

  return (
    <article className="flex justify-between items-center border-t border-foreground25 last:border-b p-3">
      <div className="w-[100px] h-[80px] bg-slate-300 rounded-lg shadow border border-black25 overflow-hidden p-2 relative">
        <Image src={"data:image/jpeg;base64," + weblink.imgData} alt={weblink._id} fill className="p-3" />
      </div>
      <span className="truncate w-1/2">{weblink.href}</span>
      <WeblinkAction id={weblink._id} />
    </article>
  )
}
