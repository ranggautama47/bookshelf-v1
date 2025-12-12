import { BookCategory } from "@/types/book";
import { 
  BookOpen, 
  Lightbulb, 
  Code, 
  User, 
  Atom, 
  Clock, 
  Briefcase, 
  MoreHorizontal 
} from "lucide-react";

interface CategoryCardProps {
  category: BookCategory;
  count: number;
  isActive: boolean;
  onClick: () => void;
}

// Map category ke icon
const getCategoryIcon = (category: BookCategory) => {
  const iconMap: Record<BookCategory, any> = {
    "Fiction": BookOpen,
    "Non-Fiction": BookOpen,
    "Technology": Code,
    "Self-Help": Lightbulb,
    "Biography": User,
    "Science": Atom,
    "History": Clock,
    "Business": Briefcase,
    "Other": MoreHorizontal,
  };
  
  return iconMap[category] || BookOpen;
};

// Map category ke emoji
const getCategoryEmoji = (category: BookCategory) => {
  const emojiMap: Record<BookCategory, string> = {
    "Fiction": "📖",
    "Non-Fiction": "📚",
    "Technology": "💻",
    "Self-Help": "💡",
    "Biography": "👤",
    "Science": "🔬",
    "History": "🏛️",
    "Business": "💼",
    "Other": "📋",
  };
  
  return emojiMap[category] || "📚";
};

export function CategoryCard({ category, count, isActive, onClick }: CategoryCardProps) {
  const Icon = getCategoryIcon(category);
  const emoji = getCategoryEmoji(category);
  
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left
        ${isActive 
          ? "bg-primary/10 border-primary/50 text-primary" 
          : "bg-card border-border hover:border-primary/30 text-foreground hover:text-primary"
        }
      `}
    >
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center text-lg
        ${isActive ? "bg-primary text-primary-foreground" : "bg-secondary"}
      `}>
        {emoji}
      </div>
      <span className="font-medium flex-1">{category}</span>
      <span className="text-sm text-muted-foreground">{count} books</span>
    </button>
  );
}