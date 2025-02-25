import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Sidebar from "../molecules/sidebar";
import Image from "next/image";

type Props = {
  icon: IconDefinition
  title: string
  image: string
  name: string
  desc: string
}

export default function SidebarAuthor({ name, image, icon, title, desc }: Props) {
  return (
    <Sidebar icon={icon} title={title}>
      <div className='pb-6 pt-3'>
        <div className="p-3">
          <Image
            src={image}
            className='rounded-full mx-auto border size-[80px]'
            width={80}
            height={80}
            alt="作者"
          />
        </div>
        <h3 className="text-center mb-[10px] font-bold px-3">
          {name}
        </h3>
        <p className="text-center text-[0.8rem] text-[#aaa] px-3">
          {desc}
        </p>
      </div>
    </Sidebar>
  );
}
