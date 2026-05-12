import { Container, Grid, GridCol, SimpleGrid, Skeleton } from "@mantine/core";

const PRIMARY_COL_HEIGHT = "300px";

export function Inzeraty() {
  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <Container my="md">

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
        <Skeleton height={PRIMARY_COL_HEIGHT} radius="md" animate={false} />
        <Grid gap="md">
          <GridCol>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </GridCol>
          <GridCol span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </GridCol>
          <GridCol span={6}>
            <Skeleton height={SECONDARY_COL_HEIGHT} radius="md" animate={false} />
          </GridCol>
        </Grid>
      </SimpleGrid>
    </Container>
  );
}
