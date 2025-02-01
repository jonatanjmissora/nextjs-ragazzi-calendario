import WeblinkEditFormContainer from "@/app/_components/Dashboard/05_Admin_Weblinks/Admin_Weblink_EditForm_Container";

export default async function WeblinkEdit({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const id = (await searchParams)?.id || ""

  return (
    <section className="min-h-[95dvh] flex flex-col items-center pt-40">
      <WeblinkEditFormContainer id={id} />
    </section>
  )
}
