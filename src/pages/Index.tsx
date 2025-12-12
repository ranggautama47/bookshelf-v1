import { useState } from "react";
import { useBooks } from "@/hooks/useBooks";
import { Book } from "@/types/book";
import { BottomNav, NavTab } from "@/components/BottomNav";
import { BookForm } from "@/components/BookForm";
import { BookDetail } from "@/components/BookDetail";
import { HomeScreen } from "./HomeScreen";
import { ExploreScreen } from "./ExploreScreen";
import { SavedScreen } from "./SavedScreen";

const Index = () => {
  const { 
    books, 
    addBook, 
    deleteBook, 
    toggleComplete, 
    updateBook,
    updateProgress,
    searchBooks,
    getReadingStats,
  } = useBooks();
  
  const [activeTab, setActiveTab] = useState<NavTab>("home");
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  const stats = getReadingStats();

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setActiveTab("add");
  };

  const handleBookClick = (book: Book) => {
    setSelectedBook(book);
  };

  const handleBackFromDetail = () => {
    setSelectedBook(null);
  };

  const handleBackFromForm = () => {
    setActiveTab("home");
    setEditingBook(null);
  };

  const handleAddBook = (book: Omit<Book, "id">) => {
    addBook(book);
    setActiveTab("home");
  };

  // Book Detail View
  if (selectedBook) {
    // Get the latest version of the book from state
    const currentBook = books.find(b => b.id === selectedBook.id) || selectedBook;
    
    return (
      <BookDetail 
        book={currentBook}
        onBack={handleBackFromDetail}
        onUpdateProgress={updateProgress}
      />
    );
  }

  // Add/Edit Book View
  if (activeTab === "add") {
    return (
      <BookForm
        onSubmit={handleAddBook}
        editingBook={editingBook}
        onUpdate={updateBook}
        onCancelEdit={() => setEditingBook(null)}
        onBack={handleBackFromForm}
      />
    );
  }

  return (
    <>
      {activeTab === "home" && (
        <HomeScreen 
          books={books}
          stats={stats}
          onBookClick={handleBookClick}
        />
      )}
      
      {activeTab === "explore" && (
        <ExploreScreen
          books={books}
          onSearch={searchBooks}
          onBookClick={handleBookClick}
          onToggleComplete={toggleComplete}
          onDelete={deleteBook}
          onEdit={handleEdit}
        />
      )}
      
      {activeTab === "saved" && (
        <SavedScreen
          books={books}
          onToggleComplete={toggleComplete}
          onDelete={deleteBook}
          onEdit={handleEdit}
          onBookClick={handleBookClick}
        />
      )}
      
      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </>
  );
};

export default Index;
