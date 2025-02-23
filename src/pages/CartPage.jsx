import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function CartPage() {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4">Carrito</Typography>
      <Typography>Aquí está tu carrito de compras</Typography>
    </Box>
  );
}

export default CartPage;
