export type BookCategory = 
  | "Fiction"
  | "Non-Fiction"
  | "Technology"
  | "Self-Help"
  | "Biography"
  | "Science"
  | "History"
  | "Business"
  | "Other";

export const BOOK_CATEGORIES: BookCategory[] = [
  "Fiction",
  "Non-Fiction",
  "Technology",
  "Self-Help",
  "Biography",
  "Science",
  "History",
  "Business",
  "Other",
];

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: BookCategory;
  isComplete: boolean;
  coverImage?: string;
  description?: string;
  progress?: number;
}