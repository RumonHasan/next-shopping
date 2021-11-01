import { Link,Grid, List, ListItem, Typography, Card , Button} from '@material-ui/core';
import React,{useContext} from 'react'
import Layout from '../../components/Layout';
import NextLink from 'next/link';
import useStyles from '../../utils/styles';
import Image from 'next/image';
// mongo db stuff
import db from '../../utils/db';
import Product from '../../models/Product';
import axios from 'axios';
// store from context
import { Store } from '../../utils/store';
import { useRouter } from 'next/dist/client/router';


const ProductScreen = (props) => {
    const router = useRouter();
    const classes = useStyles();
    const {state, dispatch} = useContext(Store); // context from Store
    const {product} = props;
    if(!product){
        return <div>Product Not Found</div>
    }
    // clicking the cart 
    const addToClickHandler = async ()=>{
        const { data } = await axios.get(`/api/products/${product._id}`);
        if(data.countInStock <= 0){ // checking whether the produc is in stock or not
            window.alert('Product not in stock');
            return;
        }
        const existItem = state.cart.cartItems.find(item => item._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        dispatch({type: 'CART_ADD_ITEM', payload:{...product, quantity: quantity}});
        router.push('/cart');
    }
    return (
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href='/' passHref>
                    <Link>Back to Product</Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <Image
                    src={product.image}
                    alt={product.image}
                    width={600}
                    height={600}
                    layout='responsive'>
                    </Image>
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem>
                            <Typography component='h1' variant='h1'>{product.name}</Typography>
                        </ListItem>
                        <ListItem>
                            Category: {product.category}
                        </ListItem>
                        <ListItem>Brand: {product.brand}</ListItem>
                        <ListItem>Rating: {product.rating} stars ({product.numReviews} reviews) </ListItem>
                        <ListItem>description: <Typography>{product.description}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Price</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.price}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}>
                                        <Typography>Status</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography>${product.countInStock > 0 ? 'In stock': 'Unavailable'}</Typography>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant='contained' color='primary' onClick={addToClickHandler}>
                                    Add to cart
                                </Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}
export default ProductScreen;

export const getServerSideProps = async (context)=>{
    const {params} = context;
    const {slug} = params;
    await db.connect();
    const product = await Product.findOne({slug}).lean();
    await db.disconnect();
    return{ // props returned as products
      props:{
        product: db.convertDocToObj(product)
      }
    }
  }
  