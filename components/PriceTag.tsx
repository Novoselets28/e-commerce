import { formatPrice } from "@/lib/format";
import Chip from "@mui/material/Chip";

interface PriceTagProps {
  price: number;
  className?: string;
}

export default function PriceTag({ price, className }: PriceTagProps) {
  return <Chip label={formatPrice(price)} color="primary" variant="outlined" />;
}
