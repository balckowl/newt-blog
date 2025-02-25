import Image from "next/image";

type Props = {
  name: string,
  image: string,
  desc: string
}

export default function ArticleAuthor({ name, image, desc }: Props) {
  return (
    <div className="border-t py-10 bg-white flex md:flex-row flex-col items-center">
      <div className="md:w-[25%] md:mb-0 mb-[1rem]">
        <Image width={85} height={85} src={image} alt="作者" className="size-[85px] rounded-full mx-auto mb-[10px] border" />
        <p className="text-[1rem] font-bold text-center">{name}</p>
      </div>
      <p className="md:w-[75%] w-full text-[#aaa] md:text-start text-center">
        {desc}
      </p>
    </div>
  );
}
