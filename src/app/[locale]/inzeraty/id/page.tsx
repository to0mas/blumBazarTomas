import { db } from "@/db";
import { inzerat } from "@/db/schemas";
import { eq } from "drizzle-orm";
import { Container, Paper, Text } from "@mantine/core";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await db.select().from(inzerat).where(eq(inzerat.id, Number(id))).get();

  if (!item) return <div>Inzerát nenalezen</div>;

  return (
    <Container style={{ boxShadow: "0 4px 20px rgba(0, 0, 0, 0.41)" }} size="sm" my="xl">
      <Paper radius="xl" p="xl" shadow="sm" bg="white">
        {item.fotka && (
          <Image
            src={item.fotka}
            alt={item.nazev}
            width={600}
            height={400}
            style={{ width: "100%", height: "400px", objectFit: "cover", borderRadius: "12px" }}
          />
        )}
        <Text fw={700} size="xl" mt="md">{item.nazev}</Text>
        <Text size="sm" c="dimmed">{item.popis}</Text>
        <Text fw={600} c="#FF6A00" mt="xs">
          {item.zdarma ? "Zdarma" : `${item.cena} Kč`}
        </Text>
        <Text size="xs" c="dimmed">{item.kategorie}</Text>
      </Paper>
    </Container>
  );
}
