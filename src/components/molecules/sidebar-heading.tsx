import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type Props = {
  icon: IconDefinition
  title: string
}

export default function SidebarHeading({icon, title}: Props) {
  return (
    <h2 className='flex items-center gap-2 font-bold bg-[#3D3D3D] text-white px-3 py-2 rounded-tl-md rounded-tr-md'>
      <FontAwesomeIcon icon={icon} className='size-4' />
      {title}
    </h2>
  );
}
