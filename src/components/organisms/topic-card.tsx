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
      <h2 className="sm:text-[1.8rem] text-[1.5rem] font-bold">
        {title}
      </h2>
    </div>
  );
}
