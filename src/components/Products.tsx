import React from 'react'
import { connect } from 'react-redux'
import { ProductState } from '../redux/products/products.reducer'
import { Box, Card, CardMedia, CardContent, Typography, Button } from '@mui/material'
import classes from './Products.module.scss'

interface IProductsProps {
    products: ProductState[]
};

const Products: React.FC<IProductsProps> = ({ products }) => {
  return products.length ? (
    <Box className={classes.container}>
        {products.map((product, index) => (
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt="green iguana"
                />
                <CardContent className={classes.cardContent}>
                    <div className={classes.cardLeftContent}>
                        <Typography gutterBottom variant="h5" component="div" noWrap>
                            {product.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" noWrap>
                            {product.description || '_'}
                        </Typography>
                    </div>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {product.price ?  '₹' + product.price : '_'}
                    </Typography>
                </CardContent>
            </Card>
        ))}
    </Box>
  ) : (
    <Typography className={classes.notFound} variant="h5" color="text.secondary" noWrap>No Products Found</Typography>
  )
}

const mapStateToProps = (state: any) => {
    return {
        products: state.products.productList,
    };
};


export default connect(mapStateToProps)(Products)