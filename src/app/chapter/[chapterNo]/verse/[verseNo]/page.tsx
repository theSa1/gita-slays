import { Separator } from "@/components/ui/separator";
import { getChapters, getVerse } from "@/lib/server-utils";
import { notFound } from "next/navigation";

const Page = async ({
  params,
}: {
  params: Promise<{ chapterNo: string; verseNo: string }>;
}) => {
  const chapterNo = parseInt((await params).chapterNo);
  const verseNo = parseInt((await params).verseNo);

  const verse = await getVerse(chapterNo, verseNo);

  if (!verse) {
    return notFound();
  }

  return (
    <div>
      <h1 className="font-semibold text-center uppercase text-2xl">
        Verse {chapterNo}.{verseNo}
      </h1>
      <h2 className="text-primary text-2xl font-semibold text-center mt-8 whitespace-pre-wrap font-sanskrit leading-none">
        {verse.text}
      </h2>

      <p className="text-center mt-4 mb-8 italic whitespace-pre-wrap text-lg">
        {verse.transliteration}
      </p>

      <Separator />

      <h3 className="font-semibold text-2xl text-primary mt-8">Meaning</h3>
      <p className="mt-4 text-justify mb-8">{verse.gen_z_translation}</p>

      <Separator />

      <h3 className="font-semibold text-2xl text-primary mt-8">Commentary</h3>
      <p className="mt-4 text-justify">{verse.commentary_gen_z_translation}</p>
    </div>
  );
};

export const generateStaticParams = async () => {
  const chapters = await getChapters();

  const paths = chapters.flatMap((chapter) =>
    chapter.verses.map((verse) => ({
      chapterNo: chapter.chapter_number.toString(),
      verseNo: verse.verseNumber.toString(),
    }))
  );

  return paths;
};

export default Page;
