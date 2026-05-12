"use client";

import { Burger, Container, Divider, Drawer, Group, ScrollArea } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./header.module.css";

const links = [
  { link: "/cs/", label: "Domů", home: true },
  { link: "/cs/inzeraty", label: "Inzeráty", home: false },
  { link: "/cs/inzeraty/novy", label: "Přidat inzerát", home: false },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

  const items = links.map((link) => (
    <Link
      key={link.label}
      href={link.link}
      className={link.home ? classes.linkHome : classes.link}
      data-active={pathname === link.link || undefined}
      onClick={close}
    >
      {link.label}
    </Link>
  ));

  return (
    <header className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify="space-between" w="100%">
          <Image src="/blogic-logo.png" alt="Blogic Bazar" width={115} height={46} />
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="xs"
            size="sm"
            aria-label="Otevřít menu"
          />
        </Group>
      </Container>

      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        title="Menu"
        hiddenFrom="xs"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)" mx="-md">
          <Divider my="sm" />
          {items}
        </ScrollArea>
      </Drawer>
    </header>
  );
}
