import Link from "next/link";

type Props = {
  topics: {
    _id: string,
    name: string
    slug: string
  }[]
}

export default function TopicBar({ topics }: Props) {
  return (
    <div className='grid grid-cols-3 bg-white mb-4 rounded-md relative'>
      {topics.map((topic) => {
        return (
          <Link
            key={topic._id}
            className='text-center border-l px-3 py-2 font-bold'
            href={`/${topic.slug}/page/1`}
            id={topic._id}
          >{topic.name}
          </Link>
        )
      })}
    </div>
  );
}
