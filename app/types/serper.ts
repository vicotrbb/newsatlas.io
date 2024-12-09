interface SearchParameters {
  q: string;
  type: string;
  tbs: string;
  engine: string;
}

interface NewsItem {
  title: string;
  link: string;
  snippet: string;
  date: string;
  source: string;
  imageUrl: string;
  position: number;
}

interface SerperNewsResponse {
  searchParameters: SearchParameters;
  news: NewsItem[];
  credits: number;
}
