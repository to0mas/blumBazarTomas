import { Badge, Container, Divider, Group, Paper, Stack, Text, Title } from "@mantine/core";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { db } from "@/db";
import { inzerat } from "@/db/schemas";
import { DostupnostPanel } from "./DostupnostPanel";
import { QrPlatba } from "./QrPlatba";

const DOSTUPNOST_MAP = {
  dostupne: { label: "Dostupné", color: "green" },
  rezervovano: { label: "Rezervováno", color: "yellow" },
  prodano: { label: "Prodáno / předáno", color: "red" },
} as const;

export default async function Page({ params }: { params: Promise<{ locale: string; id: string }> }) {
  const { id } = await params;
  const item = await db
    .select()
    .from(inzerat)
    .where(eq(inzerat.id, Number(id)))
    .get();

  if (!item) return <div>Inzerát nenalezen</div>;

  const dostupnost = DOSTUPNOST_MAP[item.dostupnost as keyof typeof DOSTUPNOST_MAP] ?? {
    label: item.dostupnost,
    color: "gray",
  };

  return (
    <Container size="md" my="xl">
      <Paper radius="xl" p="xl" shadow="sm" bg="white">
        <Stack gap="md">
          {item.fotka && (
            <Image
              src={item.fotka}
              alt={item.nazev}
              width={800}
              height={300}
              style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "12px" }}
            />
          )}

          <Group justify="space-between" align="flex-start" mt="xs">
            <Stack gap={4}>
              <Title order={2} fw={800}>
                {item.nazev}
              </Title>
              <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                {item.kategorie}
              </Text>
              <Text c="#FF6A00" size="xs" tt="uppercase" fw={600}>
                {item.kontakt}
              </Text>
            </Stack>
            <Text color={dostupnost.color} c="#FF6A00" size="xs" tt="uppercase" fw={600}>
              {" "}
              {dostupnost.label}
            </Text>
          </Group>

          <Divider />

          <Text size="sm" c="dimmed" style={{ lineHeight: 1.7 }}>
            {item.popis}
          </Text>

          <Group justify="space-between" align="center">
            <Text fw={800} c="#FF6A00" style={{ fontSize: "1.8rem" }}>
              {item.zdarma ? "Zdarma" : `${item.cena} Kč`}
            </Text>
            {!item.zdarma && item.cena && <QrPlatba castka={item.cena} nazev={item.nazev} />}
          </Group>

          <Divider />

          <DostupnostPanel id={item.id} aktualniDostupnost={item.dostupnost ?? "dostupne"} />
        </Stack>
      </Paper>
    </Container>
  );
}
