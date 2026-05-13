"use client";

import { Burger, Container, Divider, Drawer, Group, ScrollArea, Stack, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import classes from "./header.module.css";
import { useRef } from "react";
import { gsap } from "gsap";
import { useEffect } from "react";

const links = [
  { link: "/cs/", label: "Domů", home: true },
  { link: "/cs/inzeraty", label: "Inzeráty", home: false },
  { link: "/cs/addinzeraty", label: "Přidat inzerát", home: false },
];

export function Header() {
  const [opened, { toggle, close }] = useDisclosure(false);
  const pathname = usePathname();

const headerRef = useRef(null);
  useEffect(() => {
  gsap.from(headerRef.current, {
    opacity: 0,
    x: 50,
    duration: 1,
  });
}, []);

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
    <header ref={headerRef} className={classes.header}>
      <Container size="md" className={classes.inner}>
        <Group justify="space-between" w="100%">
          <Image src="/k.png" alt="Blogic Bazar" width={120} height={50} />
          <Group gap={5} visibleFrom="xs">
            {items}
          </Group>
          <Burger

            color="#FF6A00"
            opened={opened}

            onClick={toggle}
            hiddenFrom="md"
            size="md"
            aria-label="Otevřít menu"
          />;
        </Group>
      </Container>

      <Drawer

        opened={opened}
        onClose={close}
        size="100%"
        padding="md"
        radius="5px"


        hiddenFrom="md"
        zIndex={1000000}
      >
        <ScrollArea h="calc(100vh - 80px)"  p="md" m="lg" mx="-md">
          <Divider

          my="md"

          />
<Stack align="center" gap="md">
  {items}
</Stack>

        </ScrollArea>
      </Drawer>
    </header>
  );
}
