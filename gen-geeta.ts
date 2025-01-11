import "dotenv/config";
import { generateObject, generateText } from "ai";
import { google } from "@ai-sdk/google";
import fs from "fs/promises";
import { z } from "zod";

const verses = JSON.parse(await fs.readFile("./verses.json", "utf-8")) as {
  chapter_number: number;
  chapter_summary: string;
  chapter_summary_hindi: string;
  id: number;
  image_name: string;
  name: string;
  name_meaning: string;
  name_meaning_gen_z_translation: string | null;
  chapter_summary_gen_z_translation: string | null;
  name_translation: string;
  name_transliterated: string;
  verses_count: number;
  verses: {
    authorName: string;
    author_id: number;
    description: string;
    id: number;
    text: string;
    transliteration: string;
    word_meanings: string;
    lang: string;
    language_id: number;
    verseNumber: number;
    verse_id: number;
    commentary: string;
    gen_z_translation: string | null;
    commentary_gen_z_translation: string | null;
  }[];
}[];

const trim = (str: string) =>
  str.replace(/\n/g, "").replace(/\s+/g, " ").trim();

const getPrompt = (verseNo: string, verse: string, commentary: string) => {
  return `Translate the following verse from the Bhagavad Gita into very stron gen z language, do not reply with anything other than the translation, do not change the meaning of the verse or the commentary, and make sure to keep the names of the characters, places, and other proper nouns the same, keep "xyz said" the same.
Verse No.: ${verseNo}
Verse: "${verse}"
Commentary:
${commentary}`;
};

const getTranslation = async (
  verseNo: string,
  verse: string,
  commentary: string
) => {
  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: z.object({
      gen_z_translation: z
        .string()
        .describe(
          "The translation of the verse into very strong gen z language"
        ),
      commentary_gen_z_translation: z
        .string()
        .describe(
          "The translation of the commentary into very strong gen z language"
        ),
    }),
    prompt: getPrompt(verseNo, verse, commentary),
  });

  return {
    gen_z_translation: trim(object.gen_z_translation),
    commentary_gen_z_translation: trim(object.commentary_gen_z_translation),
  };
};

const getChapterMeaningTranslation = async (
  chapter: number,
  meaning: string,
  summary: string
) => {
  const { object } = await generateObject({
    model: google("gemini-1.5-flash"),
    prompt: `Translate the following chapter name, meaning and summary from the Bhagavad Gita into very strong gen z language, do not reply with anything other than the translation, do not change the meaning of the chapter name or the meaning, and make sure to keep the names of the characters, places, and other proper nouns the same, do not write anything like "Chapter: 1" or "Meaning: xyz" just write the translation.
Chapter: ${chapter}
Meaning: "${meaning}"
Summary:
${summary}`,
    schema: z.object({
      meaning_gen_z_translation: z
        .string()
        .describe(
          "The translation of the chapter name and meaning into very strong gen z language"
        ),
      summary_gen_z_translation: z
        .string()
        .describe(
          "The translation of the chapter summary into very strong gen z language"
        ),
    }),
  });

  return {
    meaning_gen_z_translation: trim(object.meaning_gen_z_translation),
    summary_gen_z_translation: trim(object.summary_gen_z_translation),
  };
};

for (const chapter of verses) {
  if (
    chapter.name_meaning_gen_z_translation &&
    chapter.chapter_summary_gen_z_translation
  )
    continue;

  let translated = false;
  while (!translated) {
    try {
      const translation = await getChapterMeaningTranslation(
        chapter.chapter_number,
        chapter.name_meaning,
        chapter.chapter_summary
      );

      chapter.name_meaning_gen_z_translation =
        translation.meaning_gen_z_translation;
      chapter.chapter_summary_gen_z_translation =
        translation.summary_gen_z_translation;

      await fs.writeFile("./verses.json", JSON.stringify(verses, null, 2));
      console.log(`Translated ${chapter.chapter_number}`);
      translated = true;
    } catch (e) {
      console.log("Failed, trying again in 5 seconds");
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  // for (const verse of chapter.verses) {
  //   // if (verse.gen_z_translation && verse.commentary_gen_z_translation) continue;
  //   let translated = false;
  //   while (!translated) {
  //     try {
  //       const translation = await getTranslation(
  //         `${chapter.chapter_number}.${verse.verseNumber}`,
  //         verse.description,
  //         verse.commentary
  //       );

  //       verse.gen_z_translation = translation.gen_z_translation;
  //       verse.commentary_gen_z_translation =
  //         translation.commentary_gen_z_translation;

  //       await fs.writeFile("./verses.json", JSON.stringify(verses, null, 2));
  //       console.log(
  //         `Translated ${chapter.chapter_number}.${verse.verseNumber}`
  //       );
  //       translated = true;
  //     } catch (e) {
  //       console.log("Failed, trying again in 5 seconds");
  //       await new Promise((r) => setTimeout(r, 5000));
  //     }
  //   }
  // }
}

export {};
