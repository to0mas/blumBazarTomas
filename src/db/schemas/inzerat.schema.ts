import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const inzerat = sqliteTable("inzerat", {
  id: int().primaryKey({ autoIncrement: true }),
  nazev: text().notNull(),
  popis: text().notNull(),
  cena: int(),
  zdarma: int({ mode: "boolean" }).notNull().default(false),
  kategorie: text().notNull(),
  fotka: text(),
  dostupnost: text(),
  kontakt: text(),
  iban: text(),
});

export type Inzerat = typeof inzerat.$inferSelect;
export type NewInzerat = typeof inzerat.$inferInsert;
