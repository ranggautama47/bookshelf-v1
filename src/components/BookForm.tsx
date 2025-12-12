import { useState, useEffect, FormEvent } from "react";
import { Book, BOOK_CATEGORIES, BookCategory } from "@/types/book";
import { Plus, Save, X, ChevronLeft } from "lucide-react";
import { ImageUpload } from "./ImageUpload";

interface BookFormProps {
  onSubmit: (book: Omit<Book, "id">) => void;
  editingBook: Book | null;
  onUpdate: (id: string, updates: Partial<Omit<Book, "id">>) => void;
  onCancelEdit: () => void;
  onBack?: () => void;
}

export function BookForm({
  onSubmit,
  editingBook,
  onUpdate,
  onCancelEdit,
  onBack,
}: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [coverImage, setCoverImage] = useState<string | undefined>();
  const [category, setCategory] = useState<BookCategory>("Fiction");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editingBook) {
      setTitle(editingBook.title);
      setAuthor(editingBook.author);
      setYear(editingBook.year.toString());
      setIsComplete(editingBook.isComplete);
      setCoverImage(editingBook.coverImage);
      setCategory(editingBook.category as BookCategory || "Fiction");
      setDescription(editingBook.description || "");
    }
  }, [editingBook]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const bookData = {
      title,
      author,
      year: parseInt(year),
      isComplete,
      coverImage,
      category,
      description,
      progress: isComplete ? 100 : 0,
    };

    if (editingBook) {
      onUpdate(editingBook.id, bookData);
      onCancelEdit();
    } else {
      onSubmit(bookData);
    }

    resetForm();
  };

  const resetForm = () => {
    setTitle("");
    setAuthor("");
    setYear("");
    setIsComplete(false);
    setCoverImage(undefined);
    setCategory("Fiction");
    setDescription("");
  };

  const handleCancel = () => {
    resetForm();
    onCancelEdit();
    onBack?.();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 glass-card border-b border-border px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button
            type="button"
            onClick={handleCancel}
            className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl font-bold text-foreground">
            {editingBook ? "Edit Buku" : "Tambah Buku Baru"}
          </h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 pb-32">
        <form
          id="bookForm"
          data-testid="bookForm"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* Cover Image Upload */}
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground block text-center">
              Cover Buku
            </label>
            <ImageUpload value={coverImage} onChange={setCoverImage} />
          </div>

          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="bookFormTitle"
              className="text-sm font-medium text-foreground"
            >
              Judul Buku
            </label>
            <input
              id="bookFormTitle"
              type="text"
              required
              data-testid="bookFormTitleInput"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Masukkan judul buku"
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Author */}
          <div className="space-y-2">
            <label
              htmlFor="bookFormAuthor"
              className="text-sm font-medium text-foreground"
            >
              Penulis
            </label>
            <input
              id="bookFormAuthor"
              type="text"
              required
              data-testid="bookFormAuthorInput"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Masukkan nama penulis"
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Year */}
          <div className="space-y-2">
            <label
              htmlFor="bookFormYear"
              className="text-sm font-medium text-foreground"
            >
              Tahun Terbit
            </label>
            <input
              id="bookFormYear"
              type="number"
              required
              data-testid="bookFormYearInput"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Masukkan tahun terbit"
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Kategori
            </label>
            <div className="grid grid-cols-2 gap-2">
              {BOOK_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`
                    px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                    ${category === cat
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-foreground hover:border-primary/50"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">
              Deskripsi (Opsional)
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tambahkan deskripsi buku..."
              rows={3}
              className="w-full rounded-xl border border-border bg-card px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none"
            />
          </div>

          {/* Is Complete Checkbox */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border">
            <input
              id="bookFormIsComplete"
              type="checkbox"
              data-testid="bookFormIsCompleteCheckbox"
              checked={isComplete}
              onChange={(e) => setIsComplete(e.target.checked)}
              className="h-5 w-5 rounded border-border bg-secondary accent-primary cursor-pointer"
            />
            <label
              htmlFor="bookFormIsComplete"
              className="text-sm font-medium text-foreground cursor-pointer flex-1"
            >
              Selesai dibaca
            </label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-3 pt-4">
            <button
              id="bookFormSubmit"
              type="submit"
              data-testid="bookFormSubmitButton"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 font-semibold text-primary-foreground transition-all hover:opacity-90 glow-primary"
            >
              {editingBook ? (
                <>
                  <Save className="h-5 w-5" />
                  Simpan Perubahan
                </>
              ) : (
                <>
                  <Plus className="h-5 w-5" />
                  Masukkan Buku ke rak{" "}
                  <span>{isComplete ? "Selesai dibaca" : "Belum selesai dibaca"}</span>
                </>
              )}
            </button>

            {editingBook && (
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center justify-center gap-2 rounded-xl bg-card border border-border px-6 py-4 font-semibold text-foreground transition-all hover:bg-secondary"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
