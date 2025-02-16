import SubmitBtn from "../SubmitBtn";
import Loading from "./Loading";

const RUBROS = ["ragazzi", "patricios", "palihue", "jmolina"]

export default function SkeltonLeftAsidePend() {

  return (
    <>
      <ul className="w-full">
      {
          RUBROS.map(RUBRO =>
              <Rubro key={RUBRO} rubro={RUBRO} />
          )
      }
      </ul>

      <div>
        <button className="btn-main grow-0 px-4 py-0 font-light text-sm h-8 w-16">reload</button>
        <div className="w-full h-[8px]"></div>
      </div>
    </>
  )
}

const Rubro = ({ rubro }: { rubro: string}) => {

  return (
    <li
      className={`collapse collapse-arrow hover:bg-${rubro} join-item border-t border-foreground25 rounded-none last:border-b h-[71px]`}
    >

      <div 
          className={`collapse-title font-medium text-foreground hover:text-foreground80 transition hover:${rubro} leftAside-sectores flex items-center`}
      >
          <span>{rubro} {"("}</span> 
          
            <span className="size-4 loading loading-bars text-foreground80"></span>
          
          <span>{")"}</span> 
      </div>
      
      <div className="h-[8px] w-full"></div>

    </li>
  )
}



