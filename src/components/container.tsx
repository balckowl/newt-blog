import { ReactNode } from "react";

type Props = {
  children: ReactNode
}

export default function Container({ children }: Props) {
  return (
    <div className="max-w-[1080px] mx-auto px-3">
      {children}
    </div>
  );
}
