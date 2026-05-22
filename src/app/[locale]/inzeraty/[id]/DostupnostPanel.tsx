"use client";

import { Button, Group, Select, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { upravitDostupnost, smazatInzerat } from "@/app/[locale]/addinzeraty/action";

const MOZNOSTI = [
  { value: "dostupne", label: "Dostupné" },
  { value: "rezervovano", label: "Rezervováno" },
  { value: "prodano", label: "Prodáno / předáno" },
];

export function DostupnostPanel({ id, aktualniDostupnost }: { id: number; aktualniDostupnost: string }) {
  const router = useRouter();
  const [dostupnost, setDostupnost] = useState(aktualniDostupnost ?? "dostupne");
  const [loading, setLoading] = useState(false);

  return (
    <Stack gap="sm">
      <Text fw={600} size="sm">Správa inzerátu</Text>

      <Group align="flex-end" gap="sm">
        <Select
          label="Dostupnost"
          data={MOZNOSTI}
          value={dostupnost}
          onChange={(val) => setDostupnost(val ?? "dostupne")}
          radius="md"
          style={{ flex: 1 }}
          styles={{ input: { border: "1.5px solid #FF6A00" } }}
        />
        <Button
          color="#FF6A00"
          radius="xl"
          loading={loading}
          onClick={async () => {
            setLoading(true);
            await upravitDostupnost(id, dostupnost as "dostupne"  | "rezervovano" | "prodano");
            setLoading(false);
            router.refresh();
          }}
        >
          Uložit
        </Button>
      </Group>

      <Button
        color="red"
        variant="light"
        radius="xl"
        loading={loading}
        onClick={async () => {
          if (!confirm("Opravdu chceš smazat tento inzerát?")) return;
          setLoading(true);
          await smazatInzerat(id);
          router.push("../inzeraty");
        }}
      >
        Smazat inzerát
      </Button>
    </Stack>
  );
}
