import ProductCard from "@/components/ProductCard";
import prisma from "@/lib/db/prisma";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Image from 'next/legacy/image';
import Link from "next/link";
import Button from "@mui/material/Button";

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <Container>
      <Box>
        <Card style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', borderRadius: 8, marginBottom: 10 }}>
          <Container style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={600}
              objectFit='cover'
              style={{ borderRadius: '8px'}}
              priority
            />
          </Container>
          <CardContent>
            <Typography variant="h1" gutterBottom>
              {products[0].name}
            </Typography>
            <Typography variant="body1" paragraph>
              {products[0].description}
            </Typography>
            <Link href={"/products/" + products[0].id} className="btn-primary btn">
              <Button variant="contained" color="warning">Check it out</Button>
            </Link>
          </CardContent>
        </Card>

        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {products.slice(1).map((product) => (
            <Grid item xs={4} key={product.id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
