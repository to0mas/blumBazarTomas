import { db } from "@/db";
import { inzerat } from "@/db/schemas";
import { Container, Paper, SimpleGrid, Text, Badge, Button, Group, Flex } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
  const inzeraty = await db.select().from(inzerat);
  const kategorie = [...new Set(inzeraty.map((i) => i.kategorie))];

  return (
    <Container size="xl" my="xl">




      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
        {inzeraty.filter((i) => i.nazev).map((i) => (
          <Paper key={i.id} radius="xl" p="xl" shadow="sm" bg="white">
              <Text size="xs"  style={{ background: "#FF6A00",display:"inline", borderRadius: "999px",margin:"10px", padding: "2px 8px" }} c="white">
  {i.kategorie}
</Text>

            {i.fotka && (
              <Image

                src={i.fotka}
                alt={i.nazev}
                width={200}
                height={200}
                style={{ width: "100%", height: "200px", objectFit: "cover", borderRadius: "12px" }}
              />
            )}

          <Group gap="lg" justify="space-between" align="center">
  <Text fw={700}  mt="md">{i.nazev}</Text>
  <Badge
    color={i.dostupnost === "prodane" ? "red" : "green"}
    radius="xl"
    mt="xs"
  >
    {i.dostupnost === "prodane" ? "Prodané" : "Dostupné"}
  </Badge>
</Group>


            <Text size="sm" c="dimmed">{i.popis}</Text>
            <Text fw={600} size="xl" c="#FF6A00" mt="xs">
              {i.zdarma ? "Zdarma" : `${i.cena} Kč`}
            </Text>

              <Link href={`/inzeraty/${i.id}`}>
  <Button color="#FF6A00" radius="xl" size="xs" mt="md" fullWidth>
    Zobrazit detail
  </Button>
</Link>




          </Paper>
        ))}
      </SimpleGrid>
    </Container>
  );
}
