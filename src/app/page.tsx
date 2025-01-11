import { getChapters } from "@/lib/server-utils";
import Link from "next/link";

const Page = async () => {
  const chapters = await getChapters();

  return (
    <div className="grid grid-cols-1 gap-4">
      {chapters.map((chapter) => (
        <Link
          href={`/chapter/${chapter.id}`}
          key={chapter.id}
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <h3 className="uppercase text-primary font-semibold mb-2">
            Chapter {chapter.chapter_number}
          </h3>
          <p className="mb-1 leading-none">{chapter.name}</p>
          <p className="text-xl font-bold">
            {chapter.name_meaning_gen_z_translation}
          </p>
          <p className="mt-2 line-clamp-3">
            {chapter.chapter_summary_gen_z_translation}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default Page;
