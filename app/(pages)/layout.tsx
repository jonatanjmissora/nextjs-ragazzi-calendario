import RightAside from "../_components/RightAside/RightAside";

export default function Dashboardlayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex">
      {children}
      <RightAside />
    </div>
  )
}
