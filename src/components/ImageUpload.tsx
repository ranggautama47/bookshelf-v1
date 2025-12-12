import { useState, useRef, DragEvent } from "react";
import { Upload, Image, X } from "lucide-react";

interface ImageUploadProps {
  value?: string;
  onChange: (imageData: string | undefined) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      processFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    onChange(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative group">
          <div className="aspect-[3/4] w-full max-w-[180px] mx-auto rounded-2xl overflow-hidden border-2 border-primary/30 bg-card">
            <img 
              src={value} 
              alt="Book cover" 
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            relative cursor-pointer transition-all duration-300
            aspect-[3/4] w-full max-w-[180px] mx-auto rounded-2xl
            border-2 border-dashed flex flex-col items-center justify-center gap-3
            ${isDragging 
              ? "border-primary bg-primary/10 scale-105" 
              : "border-border hover:border-primary/50 hover:bg-card/50"
            }
          `}
        >
          <div className={`
            w-14 h-14 rounded-full flex items-center justify-center transition-all
            ${isDragging ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"}
          `}>
            {isDragging ? (
              <Image className="w-6 h-6" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>
          <div className="text-center px-4">
            <p className="text-sm font-medium text-foreground">
              {isDragging ? "Drop image here" : "Upload Cover"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Drag & drop or click
            </p>
          </div>
        </div>
      )}
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
}
