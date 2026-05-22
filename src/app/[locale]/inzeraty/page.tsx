export const revalidate = 0;

import { db } from "@/db";
import { inzerat } from "@/db/schemas";
import { Container, Paper, SimpleGrid, Text, Badge, Button, Group } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

const DOSTUPNOST_MAP = {
  dostupne: { label: "Dostupné", color: "green" },
  rezervovano: { label: "Rezervováno", color: "yellow" },
  prodano: { label: "Prodáno / předáno", color: "red" },
} as const;

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const inzeraty = await db.select().from(inzerat);

  return (
    <Container size="xl" my="xl">
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {inzeraty.filter((i) => i.nazev).map((i) => {
          const dostupnost = DOSTUPNOST_MAP[i.dostupnost as keyof typeof DOSTUPNOST_MAP] ?? { label: "Dostupné", color: "green" };

          return (



            <Paper key={i.id} radius="xl" p="xl" shadow="sm" bg="white">
              <Text size="xs"  style={{ background: "#FF6A00", display: "inline", borderRadius: "999px", margin: "10px", padding: "2px 8px" }} c="white">
                {i.kategorie}
              </Text>

              {i.fotka && (
                <Image

                  src={i.fotka}
                  alt={i.nazev}
                  width={200}
                  height={200}
                  style={{ width: "100%", height: "200px", objectFit: "cover",marginTop:"10px", borderRadius: "12px" }}
                />
              )}

              <Group gap="lg" justify="space-between" align="center">
                <Text fw={700} mt="md">{i.nazev}</Text>
                <Badge color={dostupnost.color} radius="xl" mt="xs">
                  {dostupnost.label}
                </Badge>
              </Group>

              <Text size="sm" c="dimmed">{i.popis}</Text>
              <Text  fw={600} size="xl" c="#FF6A00" mt="xs">
                {i.zdarma ?  "Zdarma" : `${i.cena} Kč`}
              </Text>

              <Link href={`/${locale}/inzeraty/${i.id}`}>
                <Button color="#FF6A00" radius="xl" size="xs" mt="md" fullWidth>
                  Zobrazit detail
                </Button>
              </Link>
            </Paper>
          );
        })}
      </SimpleGrid>
    </Container>
  );
}
