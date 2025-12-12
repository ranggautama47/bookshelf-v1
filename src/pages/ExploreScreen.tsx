import { useState } from "react";
import { Book, BOOK_CATEGORIES, BookCategory } from "@/types/book";
import { CategoryCard } from "@/components/CategoryCard";
import { BookCard } from "@/components/BookCard";
import { ChevronLeft, MoreVertical, Search } from "lucide-react";

interface ExploreScreenProps {
  books: Book[];
  onSearch: (query: string) => Book[];
  onBookClick: (book: Book) => void;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
}

export function ExploreScreen({ 
  books, 
  onBookClick,
  onToggleComplete,
  onDelete,
  onEdit,
}: ExploreScreenProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<BookCategory | "All">("All");
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Form sudah otomatis filter lewat filteredBooks
  };

  // Filter berdasarkan search query dan category
  const filteredBooks = (() => {
    let result = books; // Mulai dari semua buku
    
    // Filter berdasarkan search query
    if (searchQuery.trim()) {
      result = result.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter berdasarkan kategori
    if (selectedCategory !== "All") {
      result = result.filter(book => book.category === selectedCategory);
    }
    
    return result;
  })();

  const categoryCounts = BOOK_CATEGORIES.reduce((acc, cat) => {
    acc[cat] = books.filter(b => b.category === cat).length;
    return acc;
  }, {} as Record<BookCategory, number>);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-foreground mb-6">Browse Books</h1>

        {/* Search */}
        <form 
          id="searchBook" 
          data-testid="searchBookForm" 
          onSubmit={handleSearch}
          className="relative mb-6"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              id="searchBookTitle"
              type="text"
              data-testid="searchBookFormTitleInput"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for Books..."
              className="w-full rounded-xl border border-border bg-card pl-12 pr-24 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <button 
              type="submit"
              id="searchSubmit"
              data-testid="searchBookFormSubmitButton"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              Cari
            </button>
          </div>
          
          {/* Popular Tags */}
          <div className="flex flex-wrap gap-2 mt-3">
            <span className="text-xs text-muted-foreground">Popular:</span>
            {["Fiction", "Technology", "Self-Help"].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedCategory(tag as BookCategory)}
                className="text-xs text-primary hover:underline"
              >
                {tag}
              </button>
            ))}
          </div>
        </form>

        {/* Categories */}
        <section className="mb-8">
          <h2 className="text-lg font-semibold text-foreground mb-4">Categories</h2>
          
          <div className="space-y-2">
            <button
              onClick={() => setSelectedCategory("All")}
              className={`
                w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left
                ${selectedCategory === "All" 
                  ? "bg-primary/10 border-primary/50 text-primary" 
                  : "bg-card border-border hover:border-primary/30 text-foreground hover:text-primary"
                }
              `}
            >
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center
                ${selectedCategory === "All" ? "bg-primary text-primary-foreground" : "bg-secondary"}
              `}>
                <Search className="w-5 h-5" />
              </div>
              <span className="font-medium flex-1">Semua Buku</span>
              <span className="text-sm text-muted-foreground">{books.length} books</span>
            </button>
            
            {BOOK_CATEGORIES.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                count={categoryCounts[category]}
                isActive={selectedCategory === category}
                onClick={() => setSelectedCategory(category)}
              />
            ))}
          </div>
        </section>

        {/* Filtered Books */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">
              {searchQuery 
                ? "Search Results" 
                : selectedCategory === "All" 
                  ? "All Books" 
                  : selectedCategory
              }
            </h2>
            <span className="text-sm text-muted-foreground">
              {filteredBooks.length} books
            </span>
          </div>
          
          {/* Belum Selesai Dibaca */}
          {filteredBooks.filter(b => !b.isComplete).length > 0 && (
            <>
              <h3 className="text-md font-semibold text-foreground mb-3 mt-6">
                Belum Selesai Dibaca
              </h3>
              <div 
                id="incompleteBookList" 
                data-testid="incompleteBookList"
                className="space-y-3"
              >
                {filteredBooks.filter(b => !b.isComplete).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onClick={() => onBookClick(book)}
                  />
                ))}
              </div>
            </>
          )}
          
          {/* Selesai Dibaca */}
          {filteredBooks.filter(b => b.isComplete).length > 0 && (
            <>
              <h3 className="text-md font-semibold text-foreground mb-3 mt-6">
                Selesai Dibaca
              </h3>
              <div 
                id="completeBookList" 
                data-testid="completeBookList"
                className="space-y-3"
              >
                {filteredBooks.filter(b => b.isComplete).map((book) => (
                  <BookCard
                    key={book.id}
                    book={book}
                    onToggleComplete={onToggleComplete}
                    onDelete={onDelete}
                    onEdit={onEdit}
                    onClick={() => onBookClick(book)}
                  />
                ))}
              </div>
            </>
          )}

          {filteredBooks.length === 0 && (
            <div className="text-center py-12 rounded-2xl bg-card border border-dashed border-border">
              <p className="text-muted-foreground">
                {searchQuery 
                  ? `Tidak ada buku ditemukan untuk "${searchQuery}"` 
                  : "Tidak ada buku dalam kategori ini"
                }
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}