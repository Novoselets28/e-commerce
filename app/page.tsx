import { Button, Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import prisma from '@/lib/db/prisma';

export default async function Home() {
  const products = await prisma.product.findMany({
    orderBy: { id: 'desc' },
  });

  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <Card>
            <CardMedia
              component="img"
              alt={products[0].name}
              height="400"
              image={products[0].imageUrl}
            />
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                {products[0].name}
              </Typography>
              <Typography variant="body1" paragraph>
                {products[0].description}
              </Typography>
              <Link href={`/products/${products[0].id}`} passHref>
                <Button variant="contained" color="primary">
                  Check it out
                </Button>
              </Link>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Grid container spacing={2}>
            {products.slice(1).map((product) => (
              <Grid item key={product.id} xs={12} md={6} lg={4}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
