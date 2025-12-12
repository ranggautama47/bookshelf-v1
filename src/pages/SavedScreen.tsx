import { Book } from "@/types/book";
import { BookCard } from "@/components/BookCard";
import { BookOpen, BookCheck } from "lucide-react";

interface SavedScreenProps {
  books: Book[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
  onBookClick: (book: Book) => void;
}

export function SavedScreen({ 
  books, 
  onToggleComplete, 
  onDelete, 
  onEdit,
  onBookClick 
}: SavedScreenProps) {
  const incompleteBooks = books.filter((book) => !book.isComplete);
  const completeBooks = books.filter((book) => book.isComplete);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground">Koleksi Buku</h1>
          <p className="text-muted-foreground text-sm mt-1">
            {books.length} buku dalam koleksi
          </p>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Incomplete Books */}
        <section className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-warning" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">Belum Selesai Dibaca</h2>
              <p className="text-xs text-muted-foreground">{incompleteBooks.length} buku</p>
            </div>
          </div>
          
          <div 
            id="incompleteBookList" 
            data-testid="incompleteBookList"
            className="space-y-3"
          >
            {incompleteBooks.length > 0 ? (
              incompleteBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onClick={() => onBookClick(book)}
                />
              ))
            ) : (
              <div className="text-center py-8 rounded-2xl bg-card border border-dashed border-border">
                <p className="text-muted-foreground text-sm">
                  Belum ada buku yang belum selesai dibaca
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Complete Books */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
              <BookCheck className="w-5 h-5 text-success" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">Selesai Dibaca</h2>
              <p className="text-xs text-muted-foreground">{completeBooks.length} buku</p>
            </div>
          </div>
          
          <div 
            id="completeBookList" 
            data-testid="completeBookList"
            className="space-y-3"
          >
            {completeBooks.length > 0 ? (
              completeBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onToggleComplete={onToggleComplete}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  onClick={() => onBookClick(book)}
                />
              ))
            ) : (
              <div className="text-center py-8 rounded-2xl bg-card border border-dashed border-border">
                <p className="text-muted-foreground text-sm">
                  Belum ada buku yang selesai dibaca
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
