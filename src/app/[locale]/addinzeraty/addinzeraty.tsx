"use client";

import { Button, Container, Group, NumberInput, Paper, Stack, Switch, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useState } from "react";

import { pridatInzerat } from "./action";

const KATEGORIE = ["Nábytek", "Elektronika", "Oblečení", "Sport", "Knihy", "Jiné"];

export function Addinzeraty() {
  const [aktivni, setAktivni] = useState<string | null>(null);
  const [zdarma, setZdarma] = useState(false);
  const [fotka, setFotka] = useState<File | null>(null);
  const [nazev, setNazev] = useState("");
  const [popis, setPopis] = useState("");
  const [cena, setCena] = useState<number | null>(null);



  return (
    <Container size="sm" my="xl">
      <Paper shadow="md" radius="xl" p="xl" bg="white">
        <Stack gap="lg">

          <Stack gap={4}>
            <Title order={2} fw={900} tt="uppercase">
              <span style={{ color: "#FF6A00" }}>Přidej</span> nový inzerát
            </Title>
            <Text size="sm" c="dimmed">
              Vyplňte všechny údaje o vašem produktu
            </Text>
          </Stack>

          <TextInput
            variant="filled"
            label="Co nabízíte"
            withAsterisk
            placeholder="Oběd ze včera"
            radius="md"
             onChange={(e) => setNazev(e.currentTarget.value)}
            styles={{ input: { border: "1.5px solid #FF6A00" } }}
          />

          <Textarea
            variant="filled"
            label="Popis"
            withAsterisk
            description="Popište stav, rozměry, důvod prodeje..."
            placeholder="Popis produktu"
            rows={4}
            onChange={(e) => setPopis(e.currentTarget.value)}
            radius="md"
            styles={{ input: { border: "1.5px solid #FF6A00" } }}
          />

          <Group align="flex-end" gap="md">
            <NumberInput
              variant="filled"
              label="Cena (Kč)"
              withAsterisk
              placeholder="500"
              min={0}
              onChange={(val) => setCena(val as number)}
              radius="md"
              disabled={zdarma}
              style={{ flex: 1 }}
              styles={{ input: { border: "1.5px solid #FF6A00" } }}
            />
            <Switch
              color="#FF6A00"
              label="Zdarma"
              checked={zdarma}
              onChange={(e) => setZdarma(e.currentTarget.checked)}
              mb={6}
            />
          </Group>

          <Stack gap={8}>
            <Text fw={600} size="sm">Kategorie</Text>
            <Group gap="sm">
              {KATEGORIE.map((k) => (
                <Button
                  key={k}
                  variant={aktivni === k ? "filled" : "light"}
                  color="#FF6A00"
                  radius="xl"
                  size="xs"
                  onClick={() => setAktivni(k)}
                >
                  {k}
                </Button>
              ))}
            </Group>
          </Stack>

            <TextInput
  variant="filled"
  label="Fotka"
  type="file"
  accept="image/*"
  radius="md"
  styles={{ input: { border: "1.5px solid #FF6A00" } }}
  onChange={(e) => setFotka(e.currentTarget.files?.[0] ?? null)}
/>

         <Button
  color="#FF6A00"
  radius="xl"
  size="md"
  fullWidth
  mt="sm"
  onClick={async () => {
    await pridatInzerat({
      nazev,
      popis,
      cena,
      zdarma,
      kategorie: aktivni ?? "",
      fotka,
    });
  }}
>
  Pošli to dál!
</Button>

        </Stack>
      </Paper>
    </Container>
  );
}
