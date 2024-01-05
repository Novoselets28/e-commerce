"use client"

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import { useState, useTransition } from "react";

interface AddToCartButtonProps {
    productId: string;
    incrementProductQuantity: (productId: string) => Promise<void>
}

export default function AddToCartButton({ productId, incrementProductQuantity }: AddToCartButtonProps) {
    const [isPending, startTransition] = useTransition();
    const [success, setSuccess] = useState(false);
    return (
        <Container sx={{display: 'flex', justifyContent: 'flex-start' , padding: "0px"}}>
            <Button
                variant="contained"
                color="success"
                onClick={() => {
                    setSuccess(false);
                    startTransition(async () => {
                        await incrementProductQuantity(productId);
                        setSuccess(true);
                    })
                }}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: "#4CAF50",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#45a049",
                    },
                    width: '200px'
                }}
            >
                Add to cart
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1rem"
                    height="1rem"
                    fill="none"
                    viewBox="0 0 25 25"
                    stroke="currentColor"
                    style={{ marginLeft: "8px" }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                </svg>
            </Button>
            {isPending && <CircularProgress size={20} />}
            {!isPending && success && (
                <Alert severity="success">Added to Cart.</Alert>
            )}
        </Container>
    );
}
