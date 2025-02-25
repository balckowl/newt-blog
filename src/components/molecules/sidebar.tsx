import { ReactNode } from "react";
import SidebarHeading from "./sidebar-heading";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";

type Props = {
  children: ReactNode
  icon: IconDefinition
  title: string
}

export default function Sidebar({ children, icon, title }: Props) {
  return (
    <div className='h-max bg-white rounded-md '>
      <SidebarHeading icon={icon} title={title} />
      {children}
    </div>
  );
}
