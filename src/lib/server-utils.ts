import fs from "fs/promises";

type Verse = {
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
  gen_z_translation: string;
  commentary_gen_z_translation: string;
};

type Chapter = {
  chapter_number: number;
  chapter_summary: string;
  chapter_summary_hindi: string;
  id: number;
  image_name: string;
  name: string;
  name_meaning: string;
  name_translation: string;
  name_transliterated: string;
  verses_count: number;
  name_meaning_gen_z_translation: string;
  chapter_summary_gen_z_translation: string;
  verses: Verse[];
};

export const getChapters = async () => {
  const verses = JSON.parse(
    await fs.readFile("./verses.json", "utf-8")
  ) as Chapter[];

  return verses;
};

export const GetChapter = async (chapterNumber: number) => {
  const chapters = await getChapters();
  const chapter = chapters.find((c) => c.chapter_number === chapterNumber);
  return chapter || null;
};

export const getVerse = async (chapterNumber: number, verseNumber: number) => {
  const chapters = await getChapters();
  const chapter = chapters.find((c) => c.chapter_number === chapterNumber);
  if (!chapter) return null;
  const verse = chapter.verses.find((v) => v.verseNumber === verseNumber);
  return verse || null;
};
