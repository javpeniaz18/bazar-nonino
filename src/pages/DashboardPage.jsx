import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

function DashboardPage() {
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
      <Typography variant="h4">Dashboard</Typography>
      <Typography>Bienvenido al panel de productos</Typography>
    </Box>
  );
}

export default DashboardPage;
