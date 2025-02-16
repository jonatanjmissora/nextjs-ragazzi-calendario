import Input from "./Skelton_Input";
import Title from "./Title";

export default function Skelton_LeftAside_Admin() {
  return (
    <div className={`flex justify-center items-center flex-col gap-20 leftAside-width`}>
      <div className="flex flex-col gap-8">
        <Title />
        <div className="flex flex-col gap-3">
          <Title />
          <Input />
        </div>
        <div className="flex flex-col gap-3">
          <Title />
          <Input />
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Title />
        <div className="flex flex-col gap-3">
          <Title />
          <Input />
        </div>
        <div className="flex flex-col gap-3">
          <Title />
          <Input />
        </div>
      </div>
    </div>
  )
}
