import { getChapter, getChapters } from "@/lib/server-utils";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{
    chapterNo: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const chapterNo = parseInt((await params).chapterNo);

  const chapter = await getChapter(chapterNo);

  if (!chapter) {
    return notFound();
  }

  return (
    <div>
      <div>
        <h1 className="font-semibold text-primary text-center uppercase">
          Chapter {chapter.chapter_number}
        </h1>
        <h2 className="text-4xl font-bold text-center mt-4">{chapter.name}</h2>
        <p className="text-center text-xl mt-4 italic">
          {chapter.name_meaning_gen_z_translation}
        </p>
        <p className="my-10">{chapter.chapter_summary_gen_z_translation}</p>
      </div>
      {chapter.verses.map((verse) => (
        <Link
          key={verse.id}
          className="grid grid-cols-6 mb-6 last:mb-0 p-3 rounded hover:bg-primary/10 transition-colors"
          href={`/chapter/${chapterNo}/verse/${verse.verseNumber}`}
        >
          <h3 className="font-semibold uppercase text-primary sm:col-span-1 col-span-6 mb-1">
            Verse {verse.verseNumber}
          </h3>
          <p className="sm:col-span-5 col-span-6">{verse.gen_z_translation}</p>
        </Link>
      ))}
    </div>
  );
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const chapterNo = parseInt((await params).chapterNo);

  const chapter = await getChapter(chapterNo);

  if (!chapter) {
    return {
      title: "Chapter Not Found",
      description: "The chapter you are looking for does not exist.",
    };
  } else {
    return {
      title: `GitaSlays | Chapter ${chapter.chapter_number} - ${chapter.name_meaning_gen_z_translation}`,
      description: chapter.chapter_summary_gen_z_translation,
    };
  }
};

export const generateStaticParams = async () => {
  const chapters = await getChapters();

  return chapters.map((c) => ({
    chapterNo: c.chapter_number.toString(),
  }));
};

export default Page;
