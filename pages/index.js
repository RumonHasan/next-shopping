import React,{useContext} from 'react';
import styles from '../styles/Home.module.css';
import Layout from '../components/Layout';
import { CardActionArea, Grid, Card, CardMedia, CardContent, Typography, CardActions, Button } from '@material-ui/core';
import NextLink from 'next/link';
import db from '../utils/db';
import Product from '../models/Product';
import { useRouter } from 'next/dist/client/router';
import { Store } from '../utils/store';
import axios from 'axios';

const Home = (props)=> {
  const {products} = props;
  const {state, dispatch} = useContext(Store);
  const router = useRouter();
  // adding to cart frmo index
  const addToCartHandler =  async(product)=>{
    const existItem = state.cart.cartItems.find(item => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const {data} = await axios.get(`/api/products/${product._id}`);
    if(data.countInStock < quantity){
      window.alert('Sorry, the product is out of stock');
      return;
    }
    dispatch({type:'CART_ADD_ITEM', payload:{...product, quantity:quantity}})
    router.push('/cart');  
  }
  return (
    <Layout>
    <div>
      <h1>Products</h1>
      <Grid container spacing={3}>
        {products.map((product)=>(
            <Grid item md={4} key={product.name}>
                <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                    <CardActionArea>
                        <CardMedia component='img' image={product.image} title={product.name}>
                        </CardMedia>
                        <CardContent>
                              <Typography>
                                {product.name}
                              </Typography>
                        </CardContent>
                    </CardActionArea>
                  </NextLink>
                  <CardActions>
                    <Typography>
                      ${product.price}
                    </Typography>
                    <Button size='small' color='primary' onClick={()=>addToCartHandler(product)}>
                      Add to cart
                    </Button>
                  </CardActions>
                </Card>
            </Grid>
          )
        )}
      </Grid>
    </div>
    </Layout>
  
  )
}

export default Home;

export const getServerSideProps = async ()=>{
  await db.connect();
  const products = await Product.find({}).lean();
  await db.disconnect();
  return{ // props returned as products
    props:{
      products: products.map(db.convertDocToObj)
    }
  }
}
