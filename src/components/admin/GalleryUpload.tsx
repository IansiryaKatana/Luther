import React, { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Loader2 } from 'lucide-react';

interface GalleryUploadProps {
  images: { id: string; image_url: string; display_order: number }[];
  onUpload: (file: File) => Promise<string | null>;
  onAdd: (image_url: string) => Promise<unknown>;
  onRemove: (id: string) => Promise<unknown>;
  uploading?: boolean;
  disabled?: boolean;
}

export const GalleryUpload: React.FC<GalleryUploadProps> = ({
  images,
  onUpload,
  onAdd,
  onRemove,
  uploading = false,
  disabled = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [urlInput, setUrlInput] = React.useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files?.length) return;
    for (let i = 0; i < files.length; i++) {
      const url = await onUpload(files[i]);
      if (url) await onAdd(url);
    }
    if (inputRef.current) inputRef.current.value = '';
  };

  const handleAddUrl = async () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    await onAdd(trimmed);
    setUrlInput('');
  };

  return (
    <div className="space-y-3">
      <Label>Gallery images (detail page)</Label>
      <p className="text-xs text-muted-foreground">
        Upload or add URLs. First image is used as the default on the project detail page. Order is used for thumbnails.
      </p>
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => inputRef.current?.click()}
          disabled={uploading || disabled}
        >
          {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          <span className="ml-2">Upload</span>
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="flex gap-2 flex-1 min-w-0">
          <Input
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder="Or paste image URL"
            className="flex-1 min-w-0"
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddUrl())}
          />
          <Button type="button" variant="secondary" size="sm" onClick={handleAddUrl} disabled={!urlInput.trim() || disabled}>
            Add
          </Button>
        </div>
      </div>
      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {images.map((img) => (
            <div key={img.id} className="relative group rounded-lg overflow-hidden border border-border aspect-square">
              <img
                src={img.image_url}
                alt=""
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-7 w-7 opacity-90"
                onClick={() => onRemove(img.id)}
                disabled={disabled}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
