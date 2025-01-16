import { WeblinkType } from "@/app/_lib/schema/weblink.type";
import { getCachedWeblinksAction } from "@/app/_lib/actions/weblinks.action";
import Image from "next/image";
import EditSVG from "@/app/_assets/EditSVG";

export default async function AdminWeblinksPage() {

  const weblinks = await getCachedWeblinksAction() as WeblinkType[]

  return (
    <section className="w-full main-height flex flex-col items-center justify-center">

      {weblinks.map(weblink => <WeblinkRow key={weblink._id} weblink={weblink} />)}

    </section>
  )
}

const WeblinkRow = ({ weblink }: { weblink: WeblinkType }) => {
  return (
    <article className="w-1/2 flex gap-2 justify-between items-center">
      <Image src={weblink.img} alt={weblink._id} width={150} height={150} />
      <span>{weblink.href}</span>
      <EditSVG className="size-5 text-slate-300" currentColor="currentColor" />
    </article>
  )
}
