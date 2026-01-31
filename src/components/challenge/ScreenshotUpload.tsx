import { useState, useCallback } from "react";
import { Upload, Image, X, CheckCircle, AlertCircle, Loader2, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface UploadedFile {
  id: string;
  file: File;
  preview: string;
  status: "uploading" | "verifying" | "verified" | "rejected";
  extractedData?: {
    distance?: string;
    duration?: string;
    calories?: string;
    date?: string;
    source?: string;
  };
}

export function ScreenshotUpload() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const processFile = useCallback(async (file: File) => {
    const id = Math.random().toString(36).substring(7);
    const preview = URL.createObjectURL(file);

    const newFile: UploadedFile = {
      id,
      file,
      preview,
      status: "uploading",
    };

    setFiles((prev) => [...prev, newFile]);

    // Simulate upload
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFiles((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: "verifying" } : f))
    );

    // Simulate AI verification
    await new Promise((resolve) => setTimeout(resolve, 2000));
    const isValid = Math.random() > 0.2; // 80% success rate for demo

    setFiles((prev) =>
      prev.map((f) =>
        f.id === id
          ? {
              ...f,
              status: isValid ? "verified" : "rejected",
              extractedData: isValid
                ? {
                    distance: `${(Math.random() * 10 + 2).toFixed(2)} km`,
                    duration: `${Math.floor(Math.random() * 60 + 20)} min`,
                    calories: `${Math.floor(Math.random() * 500 + 200)}`,
                    date: new Date().toLocaleDateString(),
                    source: ["Strava", "Nike Run Club", "Apple Watch", "Garmin"][
                      Math.floor(Math.random() * 4)
                    ],
                  }
                : undefined,
            }
          : f
      )
    );
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
        file.type.startsWith("image/")
      );
      droppedFiles.forEach(processFile);
    },
    [processFile]
  );

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    selectedFiles.forEach(processFile);
    e.target.value = "";
  };

  const removeFile = (id: string) => {
    setFiles((prev) => {
      const file = prev.find((f) => f.id === id);
      if (file) URL.revokeObjectURL(file.preview);
      return prev.filter((f) => f.id !== id);
    });
  };

  return (
    <Card variant="glass" className="overflow-hidden">
      <CardHeader className="border-b border-border/50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <Image className="w-6 h-6 text-primary" />
          </div>
          <div>
            <CardTitle>Upload Screenshots</CardTitle>
            <CardDescription>
              Upload screenshots from your fitness apps for AI-powered verification
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Verification Badge */}
        <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/30 flex items-start gap-3">
          <Shield className="w-5 h-5 text-primary mt-0.5" />
          <div>
            <h4 className="font-semibold text-sm">AI-Powered Verification</h4>
            <p className="text-xs text-muted-foreground mt-1">
              Our AI analyzes your screenshots to extract activity data and verify authenticity.
              Only verified uploads count towards your challenges.
            </p>
          </div>
        </div>

        {/* Drop Zone */}
        <div
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          className={cn(
            "border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer",
            isDragOver
              ? "border-primary bg-primary/10"
              : "border-border hover:border-primary/50 hover:bg-secondary/30"
          )}
        >
          <input
            type="file"
            id="screenshot-upload"
            accept="image/*"
            multiple
            className="hidden"
            onChange={handleFileSelect}
          />
          <label htmlFor="screenshot-upload" className="cursor-pointer">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
              <Upload className={cn("w-8 h-8 text-muted-foreground", isDragOver && "text-primary animate-bounce")} />
            </div>
            <h4 className="font-semibold mb-1">Drop screenshots here</h4>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse from your device
            </p>
            <Button variant="outline" size="sm" asChild>
              <span>Select Files</span>
            </Button>
          </label>
        </div>

        {/* Uploaded Files */}
        {files.length > 0 && (
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold text-sm text-muted-foreground">
              Uploaded Screenshots ({files.length})
            </h4>
            {files.map((file) => (
              <div
                key={file.id}
                className={cn(
                  "flex gap-4 p-4 rounded-xl border transition-all",
                  file.status === "verified" && "border-success/50 bg-success/5",
                  file.status === "rejected" && "border-destructive/50 bg-destructive/5",
                  (file.status === "uploading" || file.status === "verifying") &&
                    "border-border bg-secondary/30"
                )}
              >
                {/* Preview */}
                <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                  <img
                    src={file.preview}
                    alt="Screenshot"
                    className="w-full h-full object-cover"
                  />
                  {(file.status === "uploading" || file.status === "verifying") && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium truncate">{file.file.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {(file.file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(file.id)}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Status */}
                  <div className="mt-2">
                    {file.status === "uploading" && (
                      <Badge variant="secondary" className="text-xs">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Uploading...
                      </Badge>
                    )}
                    {file.status === "verifying" && (
                      <Badge variant="secondary" className="text-xs">
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Verifying with AI...
                      </Badge>
                    )}
                    {file.status === "verified" && (
                      <Badge variant="outline" className="text-success border-success/50 text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified
                      </Badge>
                    )}
                    {file.status === "rejected" && (
                      <Badge variant="outline" className="text-destructive border-destructive/50 text-xs">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Could not verify
                      </Badge>
                    )}
                  </div>

                  {/* Extracted Data */}
                  {file.extractedData && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {file.extractedData.source && (
                        <span className="text-xs px-2 py-1 rounded-md bg-secondary">
                          {file.extractedData.source}
                        </span>
                      )}
                      {file.extractedData.distance && (
                        <span className="text-xs px-2 py-1 rounded-md bg-secondary">
                          📍 {file.extractedData.distance}
                        </span>
                      )}
                      {file.extractedData.duration && (
                        <span className="text-xs px-2 py-1 rounded-md bg-secondary">
                          ⏱️ {file.extractedData.duration}
                        </span>
                      )}
                      {file.extractedData.calories && (
                        <span className="text-xs px-2 py-1 rounded-md bg-secondary">
                          🔥 {file.extractedData.calories} cal
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
