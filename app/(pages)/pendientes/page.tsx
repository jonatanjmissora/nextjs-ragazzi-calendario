import Dashboard from '@/app/_components/Dashboard/Dashboard';
import React from 'react'

export default async function PendientesPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {

  const rubroFilter = (await searchParams)?.rubroFilter || "todo"

 return (
    <section className="w-full h-[95dvh]">
      <Dashboard rubroFilter={rubroFilter} />
    </section>
  );
}
