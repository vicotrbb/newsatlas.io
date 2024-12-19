import "server-only";

import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { pgTable, text, timestamp, serial } from "drizzle-orm/pg-core";
import { eq, desc } from "drizzle-orm";
import { News } from "app/types/news";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql });

export const news = pgTable("news", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  link: text("link").unique().notNull(),
  snippet: text("snippet").notNull(),
  date: text("date"),
  source: text("source"),
  imageUrl: text("image_url").notNull(),
  countryCode: text("country_code").notNull(),
  countryName: text("country_name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const fetchNews = async (countryCode: string) => {
  const newsItems = await db
    .select()
    .from(news)
    .where(eq(news.countryCode, countryCode))
    .orderBy(desc(news.createdAt))
    .limit(10)
    .execute();

  return newsItems;
};

export const saveNews = async (newsItems: News[]) => {
  await db.insert(news).values(newsItems).onConflictDoNothing().execute();
};
