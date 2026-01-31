import { useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Loader2, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const AdminMediaUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newUrls: string[] = [];

    for (const file of Array.from(files)) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `uploads/${fileName}`;

      const { error } = await supabase.storage
        .from("media")
        .upload(filePath, file);

      if (error) {
        toast({
          title: "Upload failed",
          description: `Failed to upload ${file.name}: ${error.message}`,
          variant: "destructive",
        });
        continue;
      }

      const { data: urlData } = supabase.storage
        .from("media")
        .getPublicUrl(filePath);

      newUrls.push(urlData.publicUrl);
    }

    setUploadedUrls((prev) => [...newUrls, ...prev]);
    setIsUploading(false);

    if (newUrls.length > 0) {
      toast({
        title: "Upload complete",
        description: `${newUrls.length} file(s) uploaded successfully`,
      });
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const copyToClipboard = async (url: string, index: number) => {
    await navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
    toast({ title: "Copied!", description: "URL copied to clipboard" });
  };

  return (
    <AdminLayout
      title="Media Upload"
      description="Upload images and files for use across the site"
    >
      <div className="max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Upload Files</CardTitle>
            <CardDescription>
              Upload images, audio files, or documents. The URL will be provided for use in promo slides, artists, releases, etc.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div
              className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              {isUploading ? (
                <Loader2 className="h-10 w-10 mx-auto text-muted-foreground animate-spin" />
              ) : (
                <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
              )}
              <p className="text-muted-foreground mb-2">
                {isUploading ? "Uploading..." : "Click to upload or drag and drop"}
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, GIF, MP3, PDF up to 50MB
              </p>
              <Input
                ref={fileInputRef}
                type="file"
                className="hidden"
                multiple
                accept="image/*,audio/*,.pdf"
                onChange={handleFileSelect}
              />
            </div>
          </CardContent>
        </Card>

        {uploadedUrls.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Uploaded Files</CardTitle>
              <CardDescription>
                Click to copy the URL for use in other sections
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {uploadedUrls.map((url, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 bg-muted rounded-lg"
                >
                  {url.match(/\.(jpg|jpeg|png|gif|webp)$/i) && (
                    <img
                      src={url}
                      alt=""
                      className="h-12 w-12 object-cover rounded"
                    />
                  )}
                  <Input
                    value={url}
                    readOnly
                    className="flex-1 text-xs"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => copyToClipboard(url, index)}
                  >
                    {copiedIndex === index ? (
                      <Check className="h-4 w-4 text-primary" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminMediaUpload;
