"use server";

import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import { inzerat } from "@/db/schemas";

export async function pridatInzerat(data: {
  nazev: string;
  popis: string;
  cena: number | null;
  zdarma: boolean;
  kategorie: string;
  fotka: File | null;
  kontakt: string;
  iban: string;
}) {
  let fotkaPath: string | null = null;

  if (data.fotka) {
    const bytes = await data.fotka.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filename = `${Date.now()}-${data.fotka.name}`;
    const uploadsDir = join(process.cwd(), "public/uploads");
    await mkdir(uploadsDir, { recursive: true });
    const path = join(uploadsDir, filename);
    await writeFile(path, buffer);
    fotkaPath = `/uploads/${filename}`;
  }

  await db.insert(inzerat).values({
    nazev: data.nazev,
    popis: data.popis,
    cena: data.cena,
    zdarma: data.zdarma,
    kategorie: data.kategorie,
    fotka: fotkaPath,
    kontakt: data.kontakt,
    iban: data.iban,
  });
}

export async function upravitDostupnost(id: number, dostupnost: "dostupne" | "rezervovano" | "prodano") {
  await db.update(inzerat).set({ dostupnost }).where(eq(inzerat.id, id));
}

export async function smazatInzerat(id: number) {
  await db.delete(inzerat).where(eq(inzerat.id, id));
}
