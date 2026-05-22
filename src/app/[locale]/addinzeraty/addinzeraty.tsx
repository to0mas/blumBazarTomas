"use client";

import {
  Button,
  Container,
  Group,
  NumberInput,
  Paper,
  Stack,
  Switch,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";
import { pridatInzerat } from "./action";

const KATEGORIE = ["Nábytek", "Elektronika", "Oblečení", "Sport", "Knihy", "Jiné"];

function cisloUctuNaIban(cislo: string): string | null {
  const match = cislo.trim().match(/^(?:(\d{1,6})-)?(\d{1,10})\/(\d{4})$/);
  if (!match) return null;

  const predcisli = (match[1] ?? "").padStart(6, "0");
  const ucet = match[2].padStart(10, "0");
  const banka = match[3];
  const zaklad = `${banka}${predcisli}${ucet}`;
  const numericky = zaklad + "123500";

  let zbytek = "";
  for (const c of numericky) zbytek = String(Number(zbytek + c) % 97);
  const kontrolni = String(98 - Number(zbytek)).padStart(2, "0");

  return `CZ${kontrolni}${zaklad}`;
}

export function Addinzeraty() {
  const containerRef = useRef(null);
  const headingRef = useRef(null);
  const fieldsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(containerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
    });

    // Nadpis
    tl.from(
      headingRef.current,
      {
        opacity: 0,
        y: -12,
        duration: 0.4,
      },
      "-=0.3",
    );

    tl.from(
      fieldsRef.current.filter(Boolean),
      {
        opacity: 0,
        y: 18,
        duration: 0.4,
        stagger: 0.07,
      },
      "-=0.2",
    );

    return () => {
      tl.kill();
    };
  }, []);

  const form = useForm({
    initialValues: {
      nazev: "",
      popis: "",
      cena: null as number | null,
      zdarma: false,
      kategorie: "",
      fotka: null as File | null,
      kontakt: "",
      cisloUctu: "",
    },
    validate: {
      nazev: (v) => (v.trim().length < 3 ? "Název musí mít alespoň 3 znaky" : null),
      kategorie: (v) => (v === "" ? "Vyberte kategorii" : null),
      cisloUctu: (v) => {
        if (!v) return null;
        return cisloUctuNaIban(v) === null ? "Neplatný formát (např. 123456-7890123/0800)" : null;
      },
    },
  });

  const addRef = (i: number) => (el: HTMLDivElement | null) => {
    fieldsRef.current[i] = el;
  };

  return (
    <Container size="sm" my="xl" ref={containerRef}>
      <Paper shadow="md" radius="xl" p="xl" bg="white">
        <Stack gap="lg">
          <Stack gap={4} ref={headingRef}>
            <Title order={2} fw={900} tt="uppercase">
              <span style={{ color: "#FF6A00" }}>Přidej</span> nový inzerát
            </Title>
            <Text size="sm" c="dimmed">
              Vyplňte všechny údaje o vašem produktu
            </Text>
          </Stack>

          <div ref={addRef(0)}>
            <TextInput
              variant="filled"
              label="Váš kontakt"
              withAsterisk
              placeholder="email, jméno, přezdívka :)"
              radius="md"
              styles={{ input: { border: "1.5px solid #FF6A00" } }}
              {...form.getInputProps("kontakt")}
            />
          </div>

          <div ref={addRef(1)}>
            <TextInput
              variant="filled"
              label="Co nabízíte"
              withAsterisk
              placeholder="Oběd ze včera"
              radius="md"
              styles={{ input: { border: "1.5px solid #FF6A00" } }}
              {...form.getInputProps("nazev")}
            />
          </div>

          <div ref={addRef(2)}>
            <Textarea
              variant="filled"
              label="Popis"
              withAsterisk
              description="Popište stav, rozměry, důvod prodeje..."
              placeholder="Popis produktu"
              rows={4}
              radius="md"
              styles={{ input: { border: "1.5px solid #FF6A00" } }}
              {...form.getInputProps("popis")}
            />
          </div>

          <div ref={addRef(3)}>
            <Group align="flex-end" gap="md">
              <NumberInput
                variant="filled"
                label="Cena (Kč)"
                withAsterisk
                placeholder="500"
                min={0}
                radius="md"
                style={{ flex: 1 }}
                styles={{ input: { border: "1.5px solid #FF6A00" } }}
                disabled={form.values.zdarma}
                {...form.getInputProps("cena")}
              />
              <Switch
                color="#FF6A00"
                label="Zdarma"
                mb={6}
                checked={form.values.zdarma}
                onChange={(e) => {
                  form.setFieldValue("zdarma", e.currentTarget.checked);
                  if (e.currentTarget.checked) form.clearFieldError("cena");
                }}
              />
            </Group>
          </div>

          <div ref={addRef(4)}>
            <Stack gap={8}>
              <Text fw={600} size="sm">
                Kategorie
                {form.errors.kategorie && (
                  <Text component="span" c="red" size="xs" ml={8}>
                    {form.errors.kategorie}
                  </Text>
                )}
              </Text>
              <Group gap="sm">
                {KATEGORIE.map((k) => (
                  <Button
                    key={k}
                    variant={form.values.kategorie === k ? "filled" : "light"}
                    color="#FF6A00"
                    radius="xl"
                    size="xs"
                    onClick={() => form.setFieldValue("kategorie", k)}
                  >
                    {k}
                  </Button>
                ))}
              </Group>
            </Stack>
          </div>

          <div ref={addRef(5)}>
            <TextInput
              variant="filled"
              label="Fotka"
              type="file"
              accept="image/*"
              radius="md"
              styles={{ input: { border: "1.5px solid #FF6A00" } }}
              onChange={(e) => form.setFieldValue("fotka", e.currentTarget.files?.[0] ?? null)}
            />
          </div>

          <div ref={addRef(6)}>
            <TextInput
              variant="filled"
              label="Číslo účtu pro platbu"
              placeholder="123456-7890123/0800"
              radius="md"
              styles={{ input: { border: "1.5px solid #FF6A00" } }}
              {...form.getInputProps("cisloUctu")}
            />
          </div>

          <div ref={addRef(7)}>
            <Button
              color="#FF6A00"
              radius="xl"
              size="md"
              fullWidth
              mt="sm"
              onClick={() => {
                const result = form.validate();
                if (result.hasErrors) return;
                const iban = cisloUctuNaIban(form.values.cisloUctu) ?? "";
                pridatInzerat({ ...form.values, iban });
                window.location.reload();
              }}
            >
              Pošli to dál!
            </Button>
          </div>
        </Stack>
      </Paper>
    </Container>
  );
}
