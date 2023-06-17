import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

export default function ImgMediaCard() {
  const navigate = useNavigate();
  

  const handleRegisterClick = (id) => {
    navigate(`/categories/${id}/products`);
  };

  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/category')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-5">
         
          <div style={{ display: 'flex', justifyContent: 'space-evenly', zIndex:"1"/* Lower z-index value */ }}>
            {data.map(item => (
              <Card key={item.id} sx={{ maxWidth: 345 }}>
                <CardMedia component="img" alt="category" height="220" image={item.image_url} />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.name}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button  onClick={() => handleRegisterClick(item.id)} size="large">
                    See More
                  </Button>
                </CardActions>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
