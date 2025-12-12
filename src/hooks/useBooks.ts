import { useState, useEffect } from "react";
import { Book, BookCategory } from "@/types/book";

const STORAGE_KEY = "bookshelf_books";

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setBooks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
  }, [books]);

  const addBook = (book: Omit<Book, "id">) => {
    const newBook: Book = {
      ...book,
      id: Date.now().toString(),
      progress: book.isComplete ? 100 : book.progress || 0,
    };
    setBooks((prev) => [...prev, newBook]);
  };

  const deleteBook = (id: string) => {
    setBooks((prev) => prev.filter((book) => book.id !== id));
  };

  const toggleComplete = (id: string) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id 
          ? { 
              ...book, 
              isComplete: !book.isComplete,
              progress: !book.isComplete ? 100 : book.progress 
            } 
          : book
      )
    );
  };

  const updateBook = (id: string, updates: Partial<Omit<Book, "id">>) => {
    setBooks((prev) =>
      prev.map((book) => (book.id === id ? { ...book, ...updates } : book))
    );
  };

  const updateProgress = (id: string, progress: number) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id
          ? { 
              ...book, 
              progress,
              isComplete: progress === 100 
            }
          : book
      )
    );
  };

  const searchBooks = (query: string) => {
    if (!query.trim()) return books;
    return books.filter((book) =>
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase())
    );
  };

  const filterByCategory = (category: BookCategory | "All") => {
    if (category === "All") return books;
    return books.filter((book) => book.category === category);
  };

  const getRecentBooks = (limit: number = 5) => {
    return [...books].reverse().slice(0, limit);
  };

  const getReadingStats = () => {
    const total = books.length;
    const completed = books.filter(b => b.isComplete).length;
    const inProgress = books.filter(b => !b.isComplete && (b.progress || 0) > 0).length;
    const notStarted = books.filter(b => !b.isComplete && (b.progress || 0) === 0).length;
    
    return { total, completed, inProgress, notStarted };
  };

  return {
    books,
    addBook,
    deleteBook,
    toggleComplete,
    updateBook,
    updateProgress,
    searchBooks,
    filterByCategory,
    getRecentBooks,
    getReadingStats,
  };
}
