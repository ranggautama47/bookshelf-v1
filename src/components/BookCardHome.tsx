import { Book } from "@/types/book";
import { ProgressBar } from "./ProgressBar";
import { BookOpen, Bookmark } from "lucide-react";

interface BookCardHomeProps {
  book: Book;
  onClick?: () => void;
  variant?: "default" | "compact";
}

export function BookCardHome({ book, onClick, variant = "default" }: BookCardHomeProps) {
  if (variant === "compact") {
    return (
      <div 
        onClick={onClick}
        className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 transition-all cursor-pointer group"
      >
        <div className="w-14 h-20 rounded-xl overflow-hidden bg-secondary flex-shrink-0">
          {book.coverImage ? (
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground truncate group-hover:text-primary transition-colors">
            {book.title}
          </h4>
          <p className="text-sm text-muted-foreground truncate">
            {book.author}
          </p>
          <ProgressBar progress={book.progress || 0} size="sm" className="mt-2" />
        </div>
      </div>
    );
  }

  return (
    <div 
      onClick={onClick}
      className="group relative flex-shrink-0 w-[160px] cursor-pointer"
    >
      {/* Book Cover */}
      <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-card border border-border group-hover:border-primary/50 transition-all shadow-lg group-hover:shadow-primary/10">
        {book.coverImage ? (
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
            <BookOpen className="w-12 h-12 text-primary" />
          </div>
        )}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Bookmark icon */}
        <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Bookmark className="w-4 h-4 text-primary" />
        </div>
      </div>
      
      {/* Book Info */}
      <div className="mt-3 px-1">
        <h4 className="font-semibold text-sm text-foreground truncate group-hover:text-primary transition-colors">
          {book.title}
        </h4>
        <p className="text-xs text-muted-foreground truncate mt-0.5">
          {book.author}
        </p>
      </div>
    </div>
  );
}
