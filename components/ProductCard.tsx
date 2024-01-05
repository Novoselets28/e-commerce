import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { Product } from '@prisma/client';
import PriceTag from './PriceTag';

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const isNew =
        Date.now() - new Date(product.createdAt).getTime() <
        1000 * 60 * 60 * 24 * 7;

    return (
        <Link href={`/products/${product.id}`} passHref>
            <Box
                component="div"
                className="card w-full bg-base-100 transition-shadow hover:shadow-xl"
                sx={{ widows: 400, color: 'inherit' }}
            >
                <Box>
                    <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={800}
                        height={400}
                        objectFit='cover'
                    />
                </Box>
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
            </Box>
        </Link>
    );
};

export default ProductCard;
