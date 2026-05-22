"use client";

import { Button, Group, Modal, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import QRCode from "qrcode";
import { useEffect, useRef } from "react";

function generateSpayd(iban: string, castka: number, zprava: string) {
  return `SPD*1.0*ACC:${iban}*AM:${castka.toFixed(2)}*CC:CZK*MSG:${zprava}`;
}

export function QrPlatba({ castka, nazev }: { castka: number; nazev: string }) {
  const [opened, { open, close }] = useDisclosure(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const IBAN = "CZ6508000000192000145399";

  useEffect(() => {
    if (!opened) return;

    const timeout = setTimeout(() => {
      if (canvasRef.current) {
        const spayd = generateSpayd(IBAN, castka, nazev);
        QRCode.toCanvas(canvasRef.current, spayd, { width: 250, margin: 2 }, (err) => {
          if (err) console.error("QR error:", err);
        });
      }
    }, 100);

    return () => clearTimeout(timeout);
  }, [opened, castka, nazev]);

  return (
    <>
      <Group align="center" gap="md">
        <Text size="sm" c="dimmed">
          Naskenujte přes svojí banku
        </Text>

        <Button variant="light" color="#FF6A00" radius="xl" size="md" onClick={open}>
          Zaplatit QR kódem
        </Button>
      </Group>

      <Modal opened={opened} onClose={close} title="QR platba" centered radius="lg">
        <Stack align="center" gap="md">
          <canvas color="#FF6A00" ref={canvasRef} style={{ borderRadius: "12px" }} />
          <Text fw={700} size="xl" c="#FF6A00">
            {castka} Kč
          </Text>
          <Text size="xs" c="dimmed">
            {nazev}
          </Text>
        </Stack>
      </Modal>
    </>
  );
}
