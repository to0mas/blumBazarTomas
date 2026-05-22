"use client";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Button, Group, Stack, Title } from "@mantine/core";
import { Link } from "@/i18n/navigation";
import classes from "./hero.module.css";
import { gsap } from "gsap";
import { useRef } from "react";
import { useEffect } from "react";
import { FaStore } from "react-icons/fa";



export function Hero() {

const heroRef = useRef(null);
  useEffect(() => {
  gsap.from(heroRef.current, {
    opacity: 0,
    x: -50,
    duration: 1,
  });

}, []);
  return (
    <Group
    ref={heroRef}
      justify="space-between"
      align="center"
      wrap="nowrap"
      className={classes.herowrapper}
    >
      <Stack   className={classes.hero} gap="xl">
        <Title style={{ gap: "8px" }} className={classes.interniblogic}>
  <FaStore /> Interní Blogic Bazar
</Title>

        <div>
          <Title  className={classes.herotitle}>
            NABÍDNI. NAJDI.
          </Title>
          <Title  className={classes.herotitleorange}>
            PROPOJUJ.
          </Title>
        </div>

        <Title className={classes.heropar}>
          Nabídni věci kolegům, najdi co potřebuješ
          <br />
          Jednoduchý interní bazar pro všechny zaměstnance
        </Title>

        <Group>
          <Button
          className={classes.button}
            component={Link}
            href="/inzeraty"
            color="#FF6A00"
            size="md"
            radius="xl"

          >
            Zobrazit inzeráty
          </Button>

          <Button
            className={classes.button}
            component={Link}
            href="/addinzeraty"
            size="md"

            variant="outline"
            color="#FF6A00"
            radius="xl"
          >
            Přidat inzerát
            <FaPlus />
          </Button>
        </Group>
      </Stack>

      <Image
        className={classes.heroimg}
        src="/heroimg.png"
        alt="bazar"
        width={550}
        height={550}
      />
    </Group>
  );
}
