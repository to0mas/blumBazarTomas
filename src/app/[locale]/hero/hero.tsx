"use client";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";
import { Button, Group, Stack, Title } from "@mantine/core";
import { Link } from "@/i18n/navigation";
import classes from "./hero.module.css";

export function Hero() {
  return (
    <Group
      justify="space-between"
      align="center"
      wrap="nowrap"
      className={classes.herowrapper}
    >
      <Stack className={classes.hero} gap="xl">
        <Title className={classes.interniblogic}>
          🔖 Interní Blogic Bazar
        </Title>

        <div>
          <Title className={classes.herotitle}>
            NABÍDNI. NAJDI.
          </Title>
          <Title className={classes.herotitleorange}>
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
            component={Link}
            href="/inzeraty"
            color="#FF6A00"
            size="md"
            radius="xl"

          >
            Zobrazit inzeráty
          </Button>

          <Button
            className={classes.buttonplus}
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
