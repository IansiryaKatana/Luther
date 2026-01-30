import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Loader2, Save, Video, Image as ImageIcon, Upload } from "lucide-react";
import { toast } from "sonner";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useHeroSettings, useUpdateHeroSettings, useCreateHeroSettings } from "@/hooks/useHeroSettings";

const HERO_MEDIA_BUCKET = "hero-media";

export default function AdminHero() {
  const { data: heroSettings, isLoading } = useHeroSettings();
  const updateHero = useUpdateHeroSettings();
  const createHero = useCreateHeroSettings();
  const { uploadImage, uploading: isUploading } = useImageUpload(HERO_MEDIA_BUCKET);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    background_type: "video" as "video" | "image",
    video_url: "",
    image_url: "",
    poster_url: "",
    tagline: "",
    title: "",
    button_text: "",
    services: "",
  });

  useEffect(() => {
    if (heroSettings) {
      setFormData({
        background_type: heroSettings.background_type,
        video_url: heroSettings.video_url || "",
        image_url: heroSettings.image_url || "",
        poster_url: heroSettings.poster_url || "",
        tagline: heroSettings.tagline || "",
        title: heroSettings.title || "",
        button_text: heroSettings.button_text || "",
        services: heroSettings.services?.join("\n") || "",
      });
    }
  }, [heroSettings]);

  const handlePosterUpload = async (file: File): Promise<string | null> => {
    const url = await uploadImage(file);
    if (url) {
      setFormData((prev) => ({ ...prev, poster_url: url }));
    }
    return url;
  };

  const handleBackgroundImageUpload = async (file: File): Promise<string | null> => {
    const url = await uploadImage(file);
    if (url) {
      setFormData((prev) => ({ ...prev, image_url: url }));
    }
    return url;
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (url) {
      setFormData((prev) => ({ ...prev, video_url: url }));
      toast.success("Video uploaded. Click Save Changes to use it on the homepage.");
    }
    e.target.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const servicesArray = formData.services.split("\n").filter((s) => s.trim());

    try {
      if (heroSettings?.id) {
        await updateHero.mutateAsync({
          id: heroSettings.id,
          background_type: formData.background_type,
          video_url: formData.video_url || null,
          image_url: formData.image_url || null,
          poster_url: formData.poster_url || null,
          tagline: formData.tagline || null,
          title: formData.title || null,
          button_text: formData.button_text || null,
          services: servicesArray,
        });
        toast.success("Hero settings updated successfully");
      } else {
        await createHero.mutateAsync({
          background_type: formData.background_type,
          video_url: formData.video_url || null,
          image_url: formData.image_url || null,
          poster_url: formData.poster_url || null,
          tagline: formData.tagline || null,
          title: formData.title || null,
          button_text: formData.button_text || null,
          services: servicesArray,
        });
        toast.success("Hero settings created successfully");
      }
    } catch (err) {
      console.error("Hero save error:", err);
      toast.error(err instanceof Error ? err.message : "Failed to save hero settings");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Hero Section</h1>
        <p className="text-muted-foreground mt-2">
          Manage the hero section background and content
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Background Type */}
        <Card>
          <CardHeader>
            <CardTitle>Background Type</CardTitle>
            <CardDescription>Choose between video or image background</CardDescription>
          </CardHeader>
          <CardContent>
            <RadioGroup
              value={formData.background_type}
              onValueChange={(value: "video" | "image") =>
                setFormData({ ...formData, background_type: value })
              }
              className="flex gap-6"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="video" id="video" />
                <Label htmlFor="video" className="flex items-center gap-2 cursor-pointer">
                  <Video className="h-4 w-4" />
                  Video
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="image" id="image" />
                <Label htmlFor="image" className="flex items-center gap-2 cursor-pointer">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Background Media */}
        <Card>
          <CardHeader>
            <CardTitle>Background Media</CardTitle>
            <CardDescription>
              {formData.background_type === "video"
                ? "Provide a video URL and optional poster image"
                : "Upload or provide an image URL"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {formData.background_type === "video" ? (
              <>
                <div className="space-y-2">
                  <Label>Video URL or upload</Label>
                  <div className="flex gap-2 flex-wrap">
                    <Input
                      value={formData.video_url}
                      onChange={(e) => setFormData({ ...formData, video_url: e.target.value })}
                      placeholder="Paste URL or upload video"
                      className="flex-1 min-w-[200px]"
                    />
                    <input
                      ref={videoInputRef}
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => videoInputRef.current?.click()}
                      disabled={isUploading}
                    >
                      {isUploading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Upload className="h-4 w-4 mr-2" />
                          Upload video
                        </>
                      )}
                    </Button>
                  </div>
                  {formData.video_url && (
                    <video
                      src={formData.video_url}
                      className="w-full max-w-md rounded-lg mt-2"
                      controls
                      muted
                    />
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Poster Image (fallback while video loads)</Label>
                  <ImageUpload
                    value={formData.poster_url}
                    onChange={(url) => setFormData({ ...formData, poster_url: url })}
                    onUpload={handlePosterUpload}
                    uploading={isUploading}
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label>Background Image</Label>
                <ImageUpload
                  value={formData.image_url}
                  onChange={(url) => setFormData({ ...formData, image_url: url })}
                  onUpload={handleBackgroundImageUpload}
                  uploading={isUploading}
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Content */}
        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Hero section text content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Tagline</Label>
                <Input
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="International marketing"
                />
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Luther"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Button Text</Label>
              <Input
                value={formData.button_text}
                onChange={(e) => setFormData({ ...formData, button_text: e.target.value })}
                placeholder="Start your project"
              />
            </div>
            <div className="space-y-2">
              <Label>Services (one per line)</Label>
              <Textarea
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: e.target.value })}
                placeholder="Branding and identity&#10;Social media strategy&#10;Events & marketing"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
              {formData.background_type === "video" && formData.video_url ? (
                <video
                  src={formData.video_url}
                  poster={formData.poster_url}
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              ) : formData.image_url ? (
                <img
                  src={formData.image_url}
                  alt="Hero background"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  No background set
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white">
                  <p className="text-sm opacity-80">{formData.tagline}</p>
                  <h1 className="text-4xl font-bold mt-2">{formData.title}</h1>
                  {formData.button_text && (
                    <button className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-full">
                      {formData.button_text}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={updateHero.isPending || createHero.isPending || isUploading}
            size="lg"
          >
            {(updateHero.isPending || createHero.isPending) && (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            )}
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
