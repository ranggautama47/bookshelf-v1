import { Book } from "@/types/book";
import { BookOpen, Check, Undo2, Trash2, Pencil } from "lucide-react";
import { ProgressBar } from "./ProgressBar";

interface BookCardProps {
  book: Book;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (book: Book) => void;
  onClick?: () => void;
}

export function BookCard({
  book,
  onToggleComplete,
  onDelete,
  onEdit,
  onClick,
}: BookCardProps) {
  return (
    <div
      data-bookid={book.id}
      data-testid="bookItem"
      className="group relative overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5 animate-scale-in"
    >
      <div className="flex gap-4 p-4">
        {/* Book Cover */}
        <div 
          onClick={onClick}
          className="w-20 h-28 rounded-xl overflow-hidden bg-secondary flex-shrink-0 cursor-pointer"
        >
          {book.coverImage ? (
            <img 
              src={book.coverImage} 
              alt={book.title}
              className="w-full h-full object-cover transition-transform group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
          )}
        </div>
        
        {/* Book Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3
              data-testid="bookItemTitle"
              className="font-semibold text-foreground line-clamp-2 cursor-pointer hover:text-primary transition-colors"
              onClick={onClick}
            >
              {book.title}
            </h3>
            <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-muted-foreground flex-shrink-0">
              {book.year}
            </span>
          </div>
          
          <p
            data-testid="bookItemAuthor"
            className="text-sm text-muted-foreground mt-1"
          >
            Penulis: {book.author}
          </p>
          
          <p
            data-testid="bookItemYear"
            className="text-sm text-muted-foreground hidden"
          >
            Tahun: {book.year}
          </p>

          {/* Progress Bar */}
          <div className="mt-3">
            <ProgressBar progress={book.progress || (book.isComplete ? 100 : 0)} size="sm" />
          </div>

          {/* Actions */}
          <div className="flex gap-2 mt-3">
            <button
              data-testid="bookItemIsCompleteButton"
              onClick={() => onToggleComplete(book.id)}
              className="flex items-center justify-center gap-1.5 rounded-lg bg-success/10 px-3 py-2 text-xs font-medium text-success transition-all hover:bg-success hover:text-success-foreground"
            >
              {book.isComplete ? (
                <>
                  <Undo2 className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Belum Selesai</span>
                </>
              ) : (
                <>
                  <Check className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Selesai</span>
                </>
              )}
            </button>
            
            <button
              data-testid="bookItemEditButton"
              onClick={() => onEdit(book)}
              className="flex items-center justify-center rounded-lg bg-warning/10 px-3 py-2 text-xs font-medium text-warning transition-all hover:bg-warning hover:text-warning-foreground"
            >
              <Pencil className="h-3.5 w-3.5" />
            </button>
            
            <button
              data-testid="bookItemDeleteButton"
              onClick={() => onDelete(book.id)}
              className="flex items-center justify-center rounded-lg bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive transition-all hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
