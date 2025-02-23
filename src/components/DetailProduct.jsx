import React from "react";
import { useParams } from "react-router-dom";
import itemsData from "../productos.json";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";

const DetailProduct = () => {
  const { id } = useParams(); // Obtiene el id de la URL
  const product = itemsData.find((item) => item.id.toString() === id); // Busca el producto por id

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className="flex justify-center mt-8">
      <Card sx={{ maxWidth: 345 }}>
        <CardMedia
          sx={{ height: 280 }}
          image={product.image}
          title={product.nombre}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {product.nombre}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {product.descripcion}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Compartir</Button>
          <Button size="small">Más Información</Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default DetailProduct;
