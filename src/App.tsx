import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Book } from "@/types/book";
import { ExploreScreen } from "./components/ExploreScreen";
import {
  loadBooksFromStorage,
  saveBooksToStorage,
  searchBooks,
} from "./utils/bookshelfUtils";

const queryClient = new QueryClient();

const App = () => {
  // ✅ TAMBAHKAN STATE DI SINI
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  // Load books saat pertama kali component mount
  useEffect(() => {
    const loadedBooks = loadBooksFromStorage();
    setBooks(loadedBooks);
    console.log("✅ Books loaded:", loadedBooks.length);
  }, []);

  // Save books setiap kali ada perubahan
  useEffect(() => {
    if (books.length > 0) {
      saveBooksToStorage(books);
    }
  }, [books]);

  // Handler untuk search
  const handleSearch = (query: string): Book[] => {
    return searchBooks(books, query);
  };

  // Handler untuk toggle complete status
  const handleToggleComplete = (id: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === id ? { ...book, isComplete: !book.isComplete } : book
      )
    );
  };

  // Handler untuk delete book
  const handleDelete = (id: string) => {
    if (confirm("Apakah Anda yakin ingin menghapus buku ini?")) {
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    }
  };

  // Handler untuk edit book
  const handleEdit = (updatedBook: Book) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) => (book.id === updatedBook.id ? updatedBook : book))
    );
  };

  // Handler untuk klik book card
  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
    console.log("📖 Selected book:", book);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Route untuk ExploreScreen */}
            <Route
              path="/explore"
              element={
                <ExploreScreen
                  books={books}
                  onSearch={handleSearch}
                  onBookClick={handleBookClick}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              }
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>

        {/* Tampilkan detail book jika ada yang dipilih */}
        {selectedBook && (
          <div className="book-detail-modal">
            {/* Your book detail component here */}
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-md">
                <h2 className="text-xl font-bold mb-4">{selectedBook.title}</h2>
                <p className="mb-2">Author: {selectedBook.author}</p>
                <p className="mb-4">Year: {selectedBook.year}</p>
                <button
                  onClick={() => setSelectedBook(null)}
                  className="px-4 py-2 bg-primary text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
