import { Book } from "@/types/book";
import { BookCardHome } from "@/components/BookCardHome";
import { ProgressBar } from "@/components/ProgressBar";
import { Settings, User } from "lucide-react";

interface HomeScreenProps {
  books: Book[];
  stats: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
  onBookClick: (book: Book) => void;
}

export function HomeScreen({ books, stats, onBookClick }: HomeScreenProps) {
  const recentBooks = [...books].reverse().slice(0, 5);
  const currentlyReading = books.filter(b => !b.isComplete && (b.progress || 0) > 0);
  
  const completionRate = stats.total > 0 
    ? Math.round((stats.completed / stats.total) * 100) 
    : 0;
  
  const inProgressRate = stats.total > 0 
    ? Math.round((stats.inProgress / stats.total) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="px-4 py-6">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center border-2 border-primary/30">
            <User className="w-6 h-6 text-primary-foreground" />
          </div>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4">
        {/* Title */}
        <div className="mb-8">
          <p className="text-muted-foreground text-sm uppercase tracking-wider">YOUR</p>
          <h1 className="text-4xl font-bold text-foreground">BOOKSHELF</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl bg-card border border-border p-4">
            <ProgressBar progress={completionRate} showLabel={false} size="md" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Selesai</span>
              <span className="text-sm font-medium text-primary">{completionRate}%</span>
            </div>
          </div>
          <div className="rounded-2xl bg-card border border-border p-4">
            <ProgressBar progress={inProgressRate} showLabel={false} size="md" />
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-muted-foreground">Sedang Dibaca</span>
              <span className="text-sm font-medium text-primary">{inProgressRate}%</span>
            </div>
          </div>
        </div>

        {/* Currently Reading / All Books Carousel */}
        {books.length > 0 && (
          <section className="mb-8">
            <h2 className="text-lg font-semibold text-foreground mb-4">
              {currentlyReading.length > 0 ? "Sedang Dibaca" : "Koleksi Buku"}
            </h2>
            
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
              {(currentlyReading.length > 0 ? currentlyReading : books).slice(0, 6).map((book) => (
                <BookCardHome 
                  key={book.id} 
                  book={book} 
                  onClick={() => onBookClick(book)}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Books */}
        {recentBooks.length > 0 && (
          <section>
            <h2 className="text-lg font-semibold text-foreground mb-4">Buku Terbaru</h2>
            
            <div className="space-y-3">
              {recentBooks.map((book) => (
                <BookCardHome 
                  key={book.id} 
                  book={book} 
                  variant="compact"
                  onClick={() => onBookClick(book)}
                />
              ))}
            </div>
          </section>
        )}

        {books.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-card border border-border mx-auto flex items-center justify-center mb-4">
              <Settings className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Belum Ada Buku</h3>
            <p className="text-muted-foreground text-sm">
              Tap tombol + untuk menambahkan buku pertama Anda
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
