"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  imageUrl: string;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  country: {
    name: string;
    id: string;
  } | null;
}

export default function Modal({ isOpen, onClose, country }: ModalProps) {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    async function fetchNews() {
      if (!country?.id) return;

      setLoading(true);
      try {
        const response = await fetch(
          `/api/news/find?countryCode=${country.id}`
        );
        const data = await response.json();
        setNews(data.news || []);
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    }

    if (isOpen) {
      fetchNews();
    }
  }, [isOpen, country]);

  if (!isOpen || !country) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white inset-0 dark:bg-neutral-900 rounded-lg p-4 w-[90%] max-w-md max-h-[90vh] overflow-y-auto border border-neutral-200 dark:border-neutral-700 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {country.name}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200"
          >
            ✕
          </button>
        </div>

        {loading ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-neutral-900 dark:border-neutral-100"></div>
          </div>
        ) : news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item, index) => (
              <a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <div className="flex gap-4">
                  {item.imageUrl && (
                    <div className="flex-shrink-0">
                      <Image
                        src={item.imageUrl}
                        alt=""
                        width={100}
                        height={100}
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold mb-2 text-neutral-900 dark:text-neutral-100">
                      {item.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      {item.snippet}
                    </p>
                  </div>
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p className="text-center py-8 text-neutral-600 dark:text-neutral-400">
            No news available for this country.
          </p>
        )}
      </div>
    </div>
  );
}
