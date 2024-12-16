import getUserFromCookie from '@/app/_lib/utils/getUserFromCookies'
import { redirect } from 'next/navigation'

export default async function page() {

  const user = await getUserFromCookie()
  if (!user) redirect("/")

  return (
    <section className="w-full main-height flex">
      admin
    </section>
  )
}
