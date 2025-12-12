import { Home, Compass, Bookmark, Plus } from "lucide-react";

export type NavTab = "home" | "explore" | "saved" | "add";

interface BottomNavProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const navItems: { id: NavTab; icon: React.ElementType; label: string }[] = [
    { id: "home", icon: Home, label: "Home" },
    { id: "explore", icon: Compass, label: "Explore" },
    { id: "saved", icon: Bookmark, label: "Saved" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50">
      <div className="max-w-lg mx-auto px-4 pb-4">
        <div className="glass-card rounded-2xl px-4 py-3 flex items-center justify-around relative">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all
                ${activeTab === item.id 
                  ? "text-primary" 
                  : "text-muted-foreground hover:text-foreground"
                }
              `}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
          
          {/* Floating Add Button */}
          <button
            onClick={() => onTabChange("add")}
            className={`
              absolute -top-4 right-4 w-14 h-14 rounded-full flex items-center justify-center
              transition-all shadow-lg
              ${activeTab === "add"
                ? "bg-primary text-primary-foreground glow-primary"
                : "bg-primary text-primary-foreground hover:scale-105"
              }
            `}
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>
    </nav>
  );
}
