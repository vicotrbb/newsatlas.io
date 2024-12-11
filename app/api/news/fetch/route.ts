import "server-only";

import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { saveNews } from "lib/db";

const SERPER_API_KEY = process.env.SERPER_API_KEY!;
const SERPER_API_URL = process.env.SERPER_API_URL!;

async function fetchNewsForCountry(
  country: string
): Promise<SerperNewsResponse> {
  const response = await fetch(SERPER_API_URL, {
    method: "POST",
    headers: {
      "X-API-KEY": SERPER_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      q: `Relevant news in ${country}`,
      type: "news",
      tbs: "qdr:d",
      engine: "google",
      num: 5,
    }),
  });

  return await response.json();
}

export async function GET() {
  try {
    const featuresPath = path.join(process.cwd(), "public", "features.json");
    const featuresContent = await fs.readFile(featuresPath, "utf-8");
    const features = JSON.parse(featuresContent);

    const countries = features.objects.world.geometries.map((geo: any) => ({
      name: geo.properties.name,
      code: geo.id,
    }));

    for (const country of countries) {
      const newsData = await fetchNewsForCountry(country.name);

      if (newsData.news && Array.isArray(newsData.news)) {
        const newNews = newsData.news.map((newsItem) => ({
          title: newsItem.title,
          link: newsItem.link,
          snippet: newsItem.snippet,
          date: newsItem.date,
          source: newsItem.source,
          imageUrl: newsItem.imageUrl,
          countryCode: country.code,
          countryName: country.name,
        }));

        try {
          await saveNews(newNews);
        } catch (error) {
          console.error("Error saving news:", error);
        }
      }

      await new Promise((resolve) => setTimeout(resolve, 500));
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in cron job:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
