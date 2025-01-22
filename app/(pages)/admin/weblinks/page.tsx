import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import { getCachedWeblinksAction } from "@/app/_lib/actions/weblinks.action";
import Image from "next/image";
import PlusSVG from "@/app/_assets/PlusSVG";
import Link from "next/link";
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies";
import { redirect } from "next/navigation";
import WeblinkAction from "@/app/_components/Dashboard/Admin_Weblinks/Admin_Weblink_Action";

export default async function AdminWeblinksPage() {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  const weblinks = await getCachedWeblinksAction() as WeblinkType[]

  return (
    <section className="main-page w-full main-height flex justify-center items-center">

      <div className="weblink-container">
        <div className="flex justify-between items-center w-full text-3xl font-bold tracking-wide border-b py-4 my-12">
          <span className="w-full">Links</span>
          <Link href={"/admin/weblinks/edit"} >
            <PlusSVG className="size-7 text-slate-300" currentColor="currentColor" />
          </Link>
        </div>

        {weblinks.map(weblink => <WeblinkRow key={weblink._id} weblink={weblink} />)}
      </div>

    </section>
  )
}

const WeblinkRow = ({ weblink }: { weblink: WeblinkType }) => {

  return (
    <article className="flex gap-2 justify-between items-center my-4">
      <div className="w-[150px] h-[80px] bg-slate-300 rounded-lg overflow-hidden p-2 relative">
        <Image src={"data:image/jpeg;base64," + weblink.imgData} alt={weblink._id} fill className="p-3" />
      </div>
      <span className="truncate w-1/2">{weblink.href}</span>
      <WeblinkAction id={weblink._id} />
    </article>
  )
}
