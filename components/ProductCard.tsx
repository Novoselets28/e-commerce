import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import Link from 'next/link';
import PriceTag from './PriceTag';
import { Product } from '@prisma/client';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const isNew =
    Date.now() - new Date(product.createdAt).getTime() <
    1000 * 60 * 60 * 24 * 7;

  return (
    <Card>
      <Link href={`/products/${product.id}`} passHref>
        <CardMedia
          component="img"
          alt={product.name}
          image={product.imageUrl}
          style={{ width: 400, height: 400, objectFit: 'cover' }}
        />
      </Link>
      <CardContent>
        <Typography variant="h6" component="div">
          {product.name}
        </Typography>
        {isNew && (
          <Typography variant="body2" color="secondary">
            NEW
          </Typography>
        )}
        <Typography variant="body1" paragraph>
          {product.description}
        </Typography>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <PriceTag price={product.price} />
          </Grid>
          <Grid item>
            <Link href={`/products/${product.id}`} passHref>
              <Button variant="contained" color="primary">
                Check it out
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
