import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getChapters } from "@/lib/server-utils";
import Link from "next/link";

const Page = async () => {
  const chapters = await getChapters();

  return (
    <div>
      <section className="h-[80svh] flex flex-col items-center justify-center">
        <h1 className="sm:text-6xl text-4xl font-bold text-center">
          Welcome to
          <br />
          <span className="bg-gradient-to-br from-primary to-pink-500 text-transparent bg-clip-text">
            GitaSlays
          </span>
        </h1>
        <p className="text-center mt-4">
          Slaying Life’s Challenges, One Verse at a Time.
        </p>
      </section>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
        <Card>
          <CardHeader>
            <CardTitle>Why I Made GitaSlays</CardTitle>
            <CardDescription>
              Life’s messy, the Gita’s got answers, but it needed a glow-up. So,
              I made it vibe for us to slay life, one verse at a time. 💫
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>How I Made GitaSlays</CardTitle>
            <CardDescription>
              Big thanks to Google Gemini for the translations and a massive
              shoutout to the Ved Vyas Foundation for the wisdom plug. Couldn’t
              have done it without them! 🙌📖
            </CardDescription>
          </CardHeader>
        </Card>
      </section>
      <section className="grid grid-cols-1 gap-4">
        {chapters.map((chapter) => (
          <Link
            href={`/chapter/${chapter.id}`}
            key={chapter.id}
            className="block p-6 bg-card border rounded-lg shadow-md hover:shadow-lg transition-shadow"
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
      </section>
    </div>
  );
};

export default Page;
