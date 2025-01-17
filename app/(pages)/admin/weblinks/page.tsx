import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import { getCachedWeblinksAction } from "@/app/_lib/actions/weblinks.action";
import Image from "next/image";
import EditSVG from "@/app/_assets/EditSVG";
import PlusSVG from "@/app/_assets/PlusSVG";
import Link from "next/link";
import getUserFromCookie from "@/app/_lib/utils/getUserFromCookies";
import { redirect } from "next/navigation";

export default async function AdminWeblinksPage() {

  const user = await getUserFromCookie()
    if (!user) redirect("/")

  const weblinks = await getCachedWeblinksAction() as WeblinkType[]

  return (
    <section className="w-full main-height flex flex-col items-center justify-center">

      <div className="flex justify-between items-center w-1/2 text-3xl font-bold tracking-wide border-b py-4 my-4">
        <span>Links</span>
        <Link href={"/admin/weblinks/edit"} >
          <PlusSVG className="size-7 text-slate-300" currentColor="currentColor" />
        </Link>
      </div>

      {weblinks.map(weblink => <WeblinkRow key={weblink._id} weblink={weblink} />)}

    </section>
  )
}

const WeblinkRow = ({ weblink }: { weblink: WeblinkType }) => {

  return (
    <article className="w-1/2 flex gap-2 justify-between items-center m-4">
      <div className="w-[150px] h-[80px] bg-slate-300 rounded-lg overflow-hidden p-2 relative">
        <Image src={"data:image/jpeg;base64," + weblink.imgData} alt={weblink._id} fill className="p-3"/>
      </div>
      <span>{weblink.href}</span>
      <Link href={{
        pathname: '/admin/weblinks/edit',
        query: { id: weblink._id },
      }} >
        <EditSVG className="size-7 text-slate-300" currentColor="currentColor" />
      </Link>
    </article>
  )
}
