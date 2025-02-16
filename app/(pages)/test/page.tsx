import { Suspense } from "react";
import Skelton from "./Skelton";
import PendientesTableContainer from "./PendientesTableContainer";
import PendientesTableData from "./PendientesTableData";

export default async function page() {

  return (
    <section className="page">
      
        <PendientesTableContainer >
          <Suspense fallback={<Skelton />}>
              <PendientesTableData />
          </Suspense>
        </PendientesTableContainer>
      
    </section>
  )
}
