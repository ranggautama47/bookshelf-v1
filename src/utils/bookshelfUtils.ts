import { Book } from "@/types/book";

const STORAGE_KEY = "bookshelf_books";

/**
 * Load books from localStorage
 */
export function loadBooksFromStorage(): Book[] {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      console.log("📚 No books found in localStorage");
      return [];
    }
    
    const books = JSON.parse(data);
    console.log("📚 Loaded books from localStorage:", books.length, "books");
    return Array.isArray(books) ? books : [];
  } catch (error) {
    console.error("❌ Error loading books from localStorage:", error);
    return [];
  }
}

/**
 * Save books to localStorage
 */
export function saveBooksToStorage(books: Book[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
    console.log("💾 Saved books to localStorage:", books.length, "books");
  } catch (error) {
    console.error("❌ Error saving books to localStorage:", error);
  }
}

/**
 * Search books by title or author
 */
export function searchBooks(books: Book[], query: string): Book[] {
  if (!query.trim()) return books;
  
  const searchTerm = query.toLowerCase().trim();
  
  const results = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm) ||
    book.author.toLowerCase().includes(searchTerm)
  );
  
  console.log(`🔍 Search for "${query}": found ${results.length} books`);
  return results;
}

/**
 * Filter books by category
 */
export function filterBooksByCategory(books: Book[], category: string): Book[] {
  if (category === "All") return books;
  return books.filter(book => book.category === category);
}

/**
 * Get books by completion status
 */
export function getBooksByStatus(books: Book[], isComplete: boolean): Book[] {
  return books.filter(book => book.isComplete === isComplete);
}

/**
 * Generate unique book ID
 */
export function generateBookId(): string {
  return Date.now().toString();
}

/**
 * Add a new book
 */
export function addBook(books: Book[], newBook: Omit<Book, "id">): Book[] {
  const bookWithId: Book = {
    ...newBook,
    id: generateBookId(),
  };
  
  const updatedBooks = [...books, bookWithId];
  saveBooksToStorage(updatedBooks);
  
  console.log("➕ Added new book:", bookWithId.title);
  return updatedBooks;
}

/**
 * Update an existing book
 */
export function updateBook(books: Book[], updatedBook: Book): Book[] {
  const updatedBooks = books.map(book =>
    book.id === updatedBook.id ? updatedBook : book
  );
  
  saveBooksToStorage(updatedBooks);
  console.log("✏️ Updated book:", updatedBook.title);
  
  return updatedBooks;
}

/**
 * Delete a book
 */
export function deleteBook(books: Book[], bookId: string): Book[] {
  const updatedBooks = books.filter(book => book.id !== bookId);
  saveBooksToStorage(updatedBooks);
  
  console.log("🗑️ Deleted book with ID:", bookId);
  return updatedBooks;
}

/**
 * Toggle book completion status
 */
export function toggleBookComplete(books: Book[], bookId: string): Book[] {
  const updatedBooks = books.map(book =>
    book.id === bookId
      ? { ...book, isComplete: !book.isComplete }
      : book
  );
  
  saveBooksToStorage(updatedBooks);
  console.log("✅ Toggled completion for book ID:", bookId);
  
  return updatedBooks;
}

/**
 * Clear all books from localStorage (for testing/debugging)
 */
export function clearAllBooks(): void {
  localStorage.removeItem(STORAGE_KEY);
  console.log("🗑️ All books cleared from localStorage");
}

/**
 * Get storage key (useful for debugging)
 */
export function getStorageKey(): string {
  return STORAGE_KEY;
}