"use client";

import { useRef, useState } from "react";
import { Dev } from "@/types";
import { ProfileSidebar } from "@/components/ProfileSidebar";
import { AvatarDisplay } from "@/components/AvatarDisplay";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { updateAvatar } from "@/lib/actions/user-actions";

interface AvatarClientPageProps {
  currentUser: Dev;
}
export default function AvatarClientPage({
  currentUser,
}: AvatarClientPageProps) {
  const [user, setUser] = useState<Dev>(currentUser);
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const result = await updateAvatar(formData);

      if (result.success && typeof result.data === "string") {
        const newImageUrl = result.data;
        setUser((prev) => ({
          ...prev,
          image: newImageUrl,
        }));

        toast.success(result.message);
      } else {
        toast.error(result.message || "Le format de l'image est invalide.");
      }
    } catch (error) {
      toast.error("Une erreur inattendue est survenue.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f18] pt-10 text-[#e2e8f0]">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-8 lg:flex-row">
          <ProfileSidebar user={user} />

          <div className="flex-1 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#64748b]">
                Avatar
              </p>
              <h1 className="text-3xl font-extrabold tracking-tight">
                Ma photo de profil
              </h1>
            </div>

            <Card className="border-[#1e1e2e] bg-[#111118]">
              <CardHeader>
                <CardTitle className="text-sm">Photo de profil</CardTitle>
                <CardDescription>
                  Clique pour modifier ton image.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-6 sm:flex-row">
                <button
                  onClick={() => inputRef.current?.click()}
                  className="relative rounded-full group"
                  disabled={uploading}
                >
                  <AvatarDisplay
                    src={user.image ?? null}
                    name={user.name}
                    size={96}
                  />
                </button>

                <div className="space-y-4">
                  <Button
                    onClick={() => inputRef.current?.click()}
                    disabled={uploading}
                    className="bg-emerald-500 text-black hover:bg-emerald-400"
                  >
                    {uploading ? "Chargement..." : "Changer l'avatar"}
                  </Button>
                  <div className="flex gap-2">
                    {["Max 2 MB", "PNG, JPG"].map((rule) => (
                      <Badge
                        key={rule}
                        variant="outline"
                        className="text-[10px] text-[#475569]"
                      >
                        {rule}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
