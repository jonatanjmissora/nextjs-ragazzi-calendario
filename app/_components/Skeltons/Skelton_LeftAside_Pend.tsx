import Title from "./Title";

export default function Skelton_LeftAside_Pend() {
  return (
      <div className={`leftAside-width main-height flex flex-col gap-0 justify-center items-center`}>
        <div className="border border-gray-600 border-l-0 border-r-0 h-16 w-full flex items-center animate-pulse" >
            <Title className={"mx-4"}/>
        </div>
        <div className="h-16 w-full flex items-center animate-pulse" >
            <Title className={"mx-4"}/>
        </div>
        <div className="border border-gray-600 border-l-0 border-r-0 h-16 w-full flex items-center animate-pulse" >
            <Title className={"mx-4"}/>
        </div>
        <div className="border-b border-gray-600 h-16 w-full flex items-center animate-pulse" >
            <Title className={"mx-4"}/>
        </div>
      </div>
    )
}
