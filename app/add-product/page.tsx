import prisma from '@/lib/db/prisma';
import { Container, Typography, TextField, TextareaAutosize, Button } from '@mui/material';
import { redirect } from 'next/navigation';

export const metadata = {
    title: "Add Product - Flowmazon"
}

async function addProduct(formData: FormData) {
    "use server"

    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageUrl = formData.get('imageUrl')?.toString();
    const price = Number(formData.get('price') || 0);

    if(!name || !description || !imageUrl || !price){
        throw Error('Missing required fields')
    }

    await prisma.product.create({
        data: {name, description, imageUrl, price},
    })

    redirect("/")
}

export default function AddProductPage() {
  return (
    <Container maxWidth="sm">
      <Typography variant="h1" align="center" gutterBottom>
        Add Product
      </Typography>
      <form action={addProduct}>
        <TextField
          fullWidth
          required
          name="name"
          label="Name"
          variant="outlined"
          margin="normal"
        />
        <TextareaAutosize
          minRows={3}
          style={{ width: '100%', resize: 'vertical'}}
          placeholder="Description"
        />
        <TextField
          fullWidth
          required
          name="imageUrl"
          label="Image URL"
          variant="outlined"
          margin="normal"
          type="url"
        />
        <TextField
          fullWidth
          required
          name="price"
          label="Price"
          variant="outlined"
          margin="normal"
          type="number"
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginTop: '16px' }}
        >
          Add Product
        </Button>
      </form>
    </Container>
  );
}
