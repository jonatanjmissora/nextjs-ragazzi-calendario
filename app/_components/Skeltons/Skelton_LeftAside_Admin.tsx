import Input from "./Input";
import Title from "./Title";

export default function Skelton_LeftAside_Admin() {
  return (
    <div className={`leftAside-width main-height flex flex-col gap-16 justify-center items-center`}>
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
