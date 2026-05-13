"use client";

import { AppShell, Container } from "@mantine/core";
import type { PropsWithChildren } from "react";
import { Header } from "@/components/header";

const HEADER_HEIGHT = 90;
const BODY_MAX_WIDTH = 1280;

export function PageLayout({ children }: PropsWithChildren) {
  return (
    <div style={{ background: "linear-gradient(4deg, rgba(255, 106, 0, 0.53) 0%, rgba(255, 255, 255, 1) 100%)", minHeight: "100vh" }}>
      <AppShell header={{ height: HEADER_HEIGHT }} padding="md" withBorder={false} style={{ background: "transparent" }}>
        <AppShell.Header
          px="md"
          style={{
height: "80px",
padding: "8px 20px",
  margin: "15px 40px",
maxWidth: "1280px",
background: "rgba(255, 255, 255, 0.411)",
borderRadius: "16px",
boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
backdropFilter: "blur(9.7px)",
WebkitBackdropFilter: "blur(9.7px)",
border: "1px solid rgba(255, 255, 255, 0.27)",
          }}
        >
          <Container size={BODY_MAX_WIDTH} h="100%">
            <Header />
          </Container>
        </AppShell.Header>

        <AppShell.Main style={{ background: "transparent" }}>
          <Container size={BODY_MAX_WIDTH} px="md">
            {children}
          </Container>
        </AppShell.Main>
      </AppShell>
    </div>
  );
}
