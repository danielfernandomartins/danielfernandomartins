export type Show = {
  id: number;
  name: string;
  summary: string | null;
  image?: { medium: string };
  genres: string[];
  rating: { average: number | null };
};

export type SearchResult = { show: Show };
