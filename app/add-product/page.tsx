import FormSubmitButton from "@/components/formSubmitButton";
import prisma from "@/lib/db/prisma";
import { Container, Typography, TextField } from "@mui/material";
import { redirect } from "next/navigation";

export const metadata = {
    title: "Add Product - Flowmazon",
};

async function addProduct(formData: FormData) {
    "use server";

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const imageUrl = formData.get("imageUrl")?.toString();
    const price = Number(formData.get("price") || 0);

    if (!name || !description || !imageUrl || !price) {
        throw Error("Missing required fields");
    }

    await prisma.product.create({
        data: { name, description, imageUrl, price },
    });

    redirect("/");
}

export default function AddProductPage() {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Add Product
            </Typography>
            <form action={addProduct}>
                <TextField
                    required
                    name="name"
                    label="Name"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    required
                    name="description"
                    label="Description"
                    fullWidth
                    multiline
                    rows={4}
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    required
                    name="imageUrl"
                    label="Image URL"
                    type="url"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <TextField
                    required
                    name="price"
                    label="Price"
                    type="number"
                    fullWidth
                    margin="normal"
                    variant="outlined"
                />
                <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
            </form>
        </Container>
    );
}