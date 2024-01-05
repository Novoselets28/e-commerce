import PriceTag from "@/components/PriceTag";
import prisma from "@/lib/db/prisma";
import { Box, Typography } from "@mui/material";
import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { cache } from "react";
import AddToCartButton from "./AddToCartButton";
import { incrementProductQuantity } from "./actions";

interface ProductPageProps {
    params: {
        id: string;
    };
}

const getProduct = cache(async (id: string) => {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) notFound();
    return product;
});

export async function generateMetadata({
    params: { id },
}: ProductPageProps): Promise<Metadata> {
    const product = await getProduct(id);

    return {
        title: product.name + " - Flowmazon",
        description: product.description,
        openGraph: {
            images: [{ url: product.imageUrl }],
        },
    };
}

export default async function ProductPage({
    params: { id },
}: ProductPageProps) {
    const product = await getProduct(id);

    return (
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column' }, padding: "10px", justifyContent: 'flex-start' }}>
            <Image
                src={product.imageUrl}
                alt={product.name}
                width={500}
                height={500}
                style={{ borderRadius: '20px'}}
                priority
            />

            <Box sx={{ padding: "10px"}}>
                <Typography variant="h3" component="h1">
                    {product.name}
                </Typography>
                <PriceTag price={product.price} />
                <Typography variant="body1">
                    {product.description}
                </Typography>
            </Box>
            <AddToCartButton productId={product.id} incrementProductQuantity={incrementProductQuantity} />
        </Box>
    );
}