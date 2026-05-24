"use client";

import { useState } from "react";
import { Dev } from "@/types";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";

interface ProfileFormProps {
  user: Dev;
  onSave?: (updated: Partial<Dev>) => void;
}

export function ProfileForm({ user, onSave }: ProfileFormProps) {
  const [form, setForm] = useState({
    ...user,
    firstName: user?.name?.split(" ")[0] ?? "",
    lastName: user?.name?.split(" ").slice(1).join(" ") ?? "",
  });

  function handleAvailable(checked: boolean) {
    setForm({ ...form, available: checked });
  }

  function handleForm(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(form)
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-[#1e1e2e] bg-[#111118] p-6"
    >
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-[#94a3b8]">
            Prénom
          </Label>
          <Input
            value={form.firstName}
            onChange={handleForm}
            name="firstname"
            placeholder="Ton prénom"
            className="border-[#1e1e2e] bg-[#111118] text-[#e2e8f0] placeholder:text-[#64748b] focus-visible:ring-emerald-300/30 focus-visible:border-emerald-300"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-[#94a3b8]">Nom</Label>
          <Input
            value={form.lastName}
            onChange={handleForm}
            name="lastname"
            placeholder="Ton nom"
            className="border-[#1e1e2e] bg-[#111118] text-[#e2e8f0] placeholder:text-[#64748b] focus-visible:ring-emerald-300/30 focus-visible:border-emerald-300"
          />
        </div>
      </div>
      <div className="mb-5 space-y-1.5">
        <Label className="text-[12px] font-medium text-[#94a3b8]">
          Titre / Rôle
        </Label>
        <Input
          value={form.role ?? ""}
          name="role"
          onChange={handleForm}
          placeholder="Ex: Frontend Engineer"
          className="border-[#1e1e2e] bg-[#111118] text-[#e2e8f0] placeholder:text-[#64748b] focus-visible:ring-emerald-300/30 focus-visible:border-emerald-300"
        />
        <p className="text-[12px] text-[#64748b]">
          Affiché sous ton nom sur ton profil public.
        </p>
      </div>
      <div className="mb-5 space-y-1.5">
        <Label className="text-[12px] font-medium text-[#94a3b8]">Bio</Label>
        <Textarea
          name="bio"
          value={form.bio ?? ""}
          onChange={handleForm}
          placeholder="Décris-toi en quelques phrases..."
          rows={4}
          className="resize-y border-[#1e1e2e] bg-[#111118] text-[#e2e8f0] placeholder:text-[#64748b] focus-visible:ring-emerald-300/30 focus-visible:border-emerald-300"
        />
      </div>
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-[#94a3b8]">
            Localisation
          </Label>
          <Input
            value={form.location ?? ""}
            onChange={handleForm}
            name="location"
            placeholder="Ville, Pays"
            className="border-[#1e1e2e] bg-[#111118] text-[#e2e8f0] placeholder:text-[#64748b] focus-visible:ring-emerald-300/30 focus-visible:border-emerald-300"
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-[12px] font-medium text-[#94a3b8]">
            Username
          </Label>
          <Input
            value={form.username}
            onChange={handleForm}
            name="username"
            placeholder="monusername"
            className="border-[#1e1e2e] bg-[#111118] text-[#e2e8f0] placeholder:text-[#64748b] focus-visible:ring-emerald-300/30 focus-visible:border-emerald-300"
          />
          <p className="text-[12px] text-[#64748b]">
            devlinks.app/{form.username || "monusername"}
          </p>
        </div>
      </div>

      <hr className="mb-5 border-[#1e1e2e]" />
      <div className="mb-5 flex items-center justify-between">
        <span className="text-[13px] text-[#64748b]">
          Disponible pour missions
        </span>
        <Switch
          checked={form.available}
          onCheckedChange={handleAvailable}
          className="data-[state=checked]:bg-emerald-500 data-[state=unchecked]:bg-gray-600"
        />
      </div>

      <hr className="mb-5 border-[#1e1e2e]" />

      <div className="flex justify-end gap-2.5">
        <Button
          variant="ghost"
          // onClick={handleCancel}
          className="text-[#94a3b8] hover:bg-[#16161f] hover:text-[#e2e8f0]"
        >
          Annuler
        </Button>
        <Button
          type="submit"
          className="bg-emerald-300 text-[#0a0a0f] font-semibold hover:bg-emerald-200 hover:shadow-[0_4px_20px_rgba(110,231,183,0.3)]"
        >
          Sauvegarder
        </Button>
      </div>
    </form>
  );
}
