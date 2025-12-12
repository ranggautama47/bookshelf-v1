import { Book } from "@/types/book";
import { ProgressBar } from "./ProgressBar";
import { 
  ChevronLeft, 
  MoreVertical, 
  Star, 
  MessageSquare, 
  Share2,
  BookOpen,
  Play,
  RefreshCw
} from "lucide-react";

interface BookDetailProps {
  book: Book;
  onBack: () => void;
  onUpdateProgress: (id: string, progress: number) => void;
}

export function BookDetail({ book, onBack, onUpdateProgress }: BookDetailProps) {
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseInt(e.target.value);
    onUpdateProgress(book.id, newProgress);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          
          <button className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pb-24">
        {/* Book Cover */}
        <div className="py-8 flex flex-col items-center">
          <div className="w-48 aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border shadow-2xl shadow-primary/10">
            {book.coverImage ? (
              <img 
                src={book.coverImage} 
                alt={book.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                <BookOpen className="w-16 h-16 text-primary" />
              </div>
            )}
          </div>
          
          {/* Title & Author */}
          <h1 className="text-2xl font-bold text-foreground text-center mt-6">
            {book.title}
          </h1>
          <p className="text-muted-foreground mt-1">{book.author}</p>
          
          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-6">
            <button className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Star className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <MessageSquare className="w-5 h-5 text-muted-foreground" />
            </button>
            <button className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors">
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        {/* Description Section */}
        <div className="rounded-2xl bg-card border border-border p-5 mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">Description</h2>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Play className="w-4 h-4 text-primary" />
              </button>
              <button className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <RefreshCw className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground leading-relaxed">
            {book.description || `Buku "${book.title}" karya ${book.author}, diterbitkan tahun ${book.year}. Kategori: ${book.category || "Umum"}.`}
          </p>
        </div>

        {/* Reading Progress */}
        <div className="rounded-2xl bg-card border border-border p-5 mb-4">
          <h2 className="font-semibold text-foreground mb-4">Reading Progress</h2>
          
          <ProgressBar progress={book.progress || 0} size="lg" className="mb-4" />
          
          <input
            type="range"
            min="0"
            max="100"
            value={book.progress || 0}
            onChange={handleProgressChange}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>0%</span>
            <span>50%</span>
            <span>100%</span>
          </div>
        </div>

        {/* Book Details */}
        <div className="rounded-2xl bg-card border border-border p-5">
          <h2 className="font-semibold text-foreground mb-4">Details</h2>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tahun</span>
              <span className="text-foreground font-medium">{book.year}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Kategori</span>
              <span className="text-foreground font-medium">{book.category || "Umum"}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Status</span>
              <span className={`font-medium ${book.isComplete ? "text-success" : "text-warning"}`}>
                {book.isComplete ? "Selesai dibaca" : "Belum selesai"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
