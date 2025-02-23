import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function OrdersPage() {
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
      <Typography variant="h4">Órdenes</Typography>
      <Typography>Aquí puedes ver los pedidos realizados</Typography>
    </Box>
  );
}

export default OrdersPage;
