import React from 'react';
import Link from 'next/link';
import Image from 'next/legacy/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Product } from '@prisma/client';
import PriceTag from './PriceTag';
import Card from '@mui/material/Card';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const isNew =
        Date.now() - new Date(product.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7;

    return (
        <Link href={`/products/${product.id}`} passHref>
            <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                borderRadius: 8,
                marginBottom: 10,
                width: '100%',
                height: '100%',
                maxWidth: '24rem',
            }}>
                <Image
                    src={product.imageUrl}
                    alt={product.name}
                    width={400}
                    height={400}
                    objectFit='cover'
                    style={{ borderRadius: '8px'}}
                    priority
                />
                <Box className="card-body" sx={{ padding: 2 }}>
                    <Typography variant="h6" paragraph>
                        {product.name}
                    </Typography>
                    {isNew && <Chip label="NEW" color="secondary" />}
                    <Typography variant="body2" paragraph>
                        {product.description}
                    </Typography>
                    <PriceTag price={product.price} />
                </Box>
            </Card>
        </Link>
    );
};

export default ProductCard;
