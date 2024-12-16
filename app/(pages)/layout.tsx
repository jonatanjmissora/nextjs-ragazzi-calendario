import { Suspense } from "react";
import LeftAside from "../_components/LeftAside/LeftAside";
import RightAside from "../_components/RightAside/RightAside";

export default function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      <Suspense fallback={<p>Loading...Sectores Skelton</p>} >
        <LeftAside />
      </Suspense>
      <Suspense fallback={<p>Loading...Dashboard Skelton</p>} >
        {children}
      </Suspense>
      <RightAside />
    </div>
  )
}
