CREATE TABLE `inzerat` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`nazev` text NOT NULL,
	`popis` text NOT NULL,
	`cena` integer,
	`zdarma` integer DEFAULT false NOT NULL,
	`kategorie` text NOT NULL
);
