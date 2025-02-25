import Breadthumb from "../molecules/breadthumb";

type Props = {
  breadthumbList: Item[],
  title: string,
  desc: string
}

type Item = {
  name: string;
  slug: string;
}


export default function TopicCard({ breadthumbList, title }: Props) {
  return (
    <div className="bg-white md:py-6 py-4 md:px-6 px-4 rounded-md mb-4">
      <div className="mb-[8px]">
        <Breadthumb items={breadthumbList} />
      </div>
      {/* <h2 className="sm:text-[1.8rem] text-[1.5rem] font-bold mb-[10px] md:mb-0">
        {title}
      </h2> */}
      <h2 className="sm:text-[1.8rem] text-[1.5rem] font-bold">
        {title}
      </h2>
      {/* <Image
        width={400}
        height={300}
        alt=""
        src={image}
        className="hidden md:block md:mt-[-40px] size-[200px] md:size-[250px] mx-auto md:mb-[35px] mb-[20px]"
      />
      <p className="md:text-[0.9rem] text-[0.7rem] text-gray-400">
        {desc}
      </p> */}
    </div>
  );
}
